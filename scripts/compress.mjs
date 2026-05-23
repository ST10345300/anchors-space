import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');

// folders → [quality, maxWidth]
const TARGETS = [
  { dir: 'avatars',  quality: 82, width: 900 },
  { dir: 'merch',    quality: 82, width: 900 },
  { dir: 'pods',     quality: 80, width: 1400 },
  { dir: 'hallway',  quality: 80, width: 1600 },
];

async function convertDir({ dir, quality, width }) {
  const src = path.join(PUBLIC, dir);
  const files = (await readdir(src)).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  let saved = 0;
  for (const file of files) {
    const inPath  = path.join(src, file);
    const outName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outPath = path.join(src, outName);

    if (existsSync(outPath)) { console.log(`  skip ${outName} (exists)`); continue; }

    const info = await sharp(inPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

    const orig = (await import('fs')).statSync(inPath).size;
    const reduction = Math.round((1 - info.size / orig) * 100);
    console.log(`  ✓ ${outName}  ${(orig/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB  (-${reduction}%)`);
    saved += orig - info.size;
  }
  return saved;
}

console.log('🗜  Compressing images to WebP…\n');
let total = 0;
for (const t of TARGETS) {
  console.log(`📁 ${t.dir}/`);
  total += await convertDir(t);
}
console.log(`\n✅ Done. Total saved: ${(total / 1024 / 1024).toFixed(1)} MB`);
