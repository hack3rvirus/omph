/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Vatican-inspired base colors
        vatican: {
          gold: '#FFD700',
          white: '#FFFFFF'
        },
        // Our Mother of Perpetual Help theme
        church: {
          primary: 'var(--primary-color, #581C87)', // Deep purple
          secondary: 'var(--secondary-color, #B91C1C)', // Red
          accent: 'var(--accent-color, #FFD700)', // Gold
          background: 'var(--background-primary, #FFFFFF)',
          text: 'var(--text-primary, #1F2937)',
          patron: 'var(--church-patron-color, #581C87)'
        },
        // Semantic colors
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#2563EB'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 30px #FFD700' }
        }
      }
    },
  },
  plugins: [],
};