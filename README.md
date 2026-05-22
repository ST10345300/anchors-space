# Anchors Space

A 3D interactive site for a student coffee & work studio.
Built with **React + Vite + React Three Fiber + Tailwind + Framer Motion**.

The palette is pulled straight from the brand avatar:
- `anchor-void` / `anchor-coal` — the deep charcoal background
- `anchor-ember` — the warm orange of the avatar's skin (accent)
- `anchor-paper` / `anchor-cream` — sneaker-sole off-white text

## Run

```bash
cd anchors-space
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## What's inside

- 5 pages with smooth Framer Motion route transitions: Home, About, Menu, Workspace, Contact
- Auto smooth-scroll-to-top on every route change (`<ScrollToTop />` in `App.jsx`)
- 3D models built procedurally in `src/models/`:
  - `Avatar.jsx` — the brand character (hoodie, ember skin, curly hair, sneakers)
  - `CoffeeCup.jsx` — paper cup with black lid + ember brand dot
  - `MacBook.jsx` — laptop with glowing ember screen mark
- Shared `Scene.jsx` wrapper gives every canvas the same ember-tinted lighting
  so 3D objects feel native to the dark page
- Grain overlay, custom scrollbar, ember selection — all in `index.css`

## Add the brand avatar PNGs (required for hero/gallery/about/workspace/contact)

Save the 5 avatar images into `public/avatars/` with these exact filenames:

```
public/avatars/sitting-laptop.png   ← sitting on plinth with MacBook
public/avatars/cross-legged.png     ← cross-legged with MacBook on lap
public/avatars/standing-cup.png     ← standing with takeaway cup (hero)
public/avatars/drinking.png         ← sipping the cup, leg crossed
public/avatars/phone.png            ← standing on phone with AirPods
```

The page background and the avatar studio background are the same charcoal,
so they blend automatically. The `AvatarImage` component adds:
- a soft ember radial glow behind each pose
- a floor-blur shadow under the feet
- a vertical fade from the feet into the page so there's no hard edge
- parallax tilt that follows the mouse
- a gentle floating bob (6s loop)

If a filename is missing you'll just see the glow + shadow with a broken img —
drop the PNG in and reload.
