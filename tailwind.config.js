/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Treevolution Professional Tree Services – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep forest green – the panel behind the Treevolution logo
        forest: {
          950: '#05200F',
          900: '#0A2E17',
          800: '#063A1B',
          700: '#0E4A24',
          600: '#1C5A2B',
        },
        // Livery green – the Defender and tipper bodywork
        leaf: {
          700: '#23662D',
          600: '#2E7D3A',
          500: '#3F8B48',
          400: '#6FAE5E',
          300: '#A9CB8B',
          200: '#C9DEB0',
          100: '#DDEACB',
          50: '#EFF5E6',
        },
        // Orange – "TREE" in the logo and the stripe down the vehicles
        ember: {
          700: '#B34C08',
          600: '#D55E0E',
          500: '#EC6E17',
          400: '#F58A3A',
          100: '#FDE9D8',
        },
        // Pinstripe yellow under the orange stripe on the vehicles
        amber: '#F5B335',
        // Bark and woodchip – logs section, lanes and trunks
        bark: {
          800: '#3F2D1F',
          700: '#5E4430',
          500: '#8B6A4A',
          300: '#CDBF9F',
          200: '#E7DFCC',
          100: '#F4EEE2',
        },
        // Warm off-white page background
        paper: '#F8F6EF',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,46,23,.06), 0 10px 30px -12px rgba(10,46,23,.18)',
        lift: '0 2px 4px rgba(10,46,23,.06), 0 24px 48px -18px rgba(10,46,23,.32)',
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
};
