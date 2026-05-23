/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        anchor: {
          // matte black system
          void:  '#0F0F10',
          coal:  '#141416',
          ash:   '#1a1a1c',
          stone: '#222225',
          smoke: '#2B2B2D',     // muted gray
          mist:  '#8a8a92',
          paper: '#F5EFE6',     // cream (body)
          cream: '#E7D3B1',     // icon cream (from icon pack)
          gold:  '#C6A87D',     // soft gold accent
          wood:  '#6F4E37',     // warm wood
          // legacy aliases so existing classes still work
          ember: '#C6A87D',
          ember2: '#6F4E37'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }
      });
    }
  ]
};
