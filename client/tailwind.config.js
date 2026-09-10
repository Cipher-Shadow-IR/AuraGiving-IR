/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Primary Action / Security & Institution (Sapphire)
        primary: {
          light: '#1E40AF',
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
        },
        // Progress & Social Growth (Emerald)
        progress: {
          light: '#059669',
          DEFAULT: '#34D399',
          track: 'rgba(255, 255, 255, 0.06)',
        },
        // Attention & Badges (Amber)
        badge: {
          light: '#F59E0B',
          DEFAULT: '#FBBF24',
          subtle: 'rgba(251, 191, 36, 0.12)',
        },
        // Structural Card Contours & Backings
        surface: {
          base: '#0A0D14',
          pure: '#000000',
          card: '#161B26',
          cardHover: '#1C2331',
          input: '#0F131C',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
        },
        // Data Hierarchy & Subdued Wallet/Gas tint
        data: {
          light: '#475569',
          DEFAULT: '#94A3B8',
          subtle: '#64748B',
        },
      },
      animation: {
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
