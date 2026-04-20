import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0D0D14',
          2: '#1A1A28',
          3: '#252538',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F5EDD6',
          dark: '#8B6A1F',
          muted: '#D4B06A',
        },
        surface: {
          DEFAULT: '#FAFAF8',
          2: '#F2F1ED',
          3: '#E8E7E0',
        },
        ink: {
          DEFAULT: '#0D0D14',
          2: '#3A3A4A',
          3: '#7A7A8A',
          4: '#A8A8B8',
        },
        action: '#3A7BD5',
        success: '#1DB87A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        snug: '-0.02em',
        wide: '0.08em',
        wider: '0.1em',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        pill: '999px',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        1: '1px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'count-up': 'countUp 1.5s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
