/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tk-blue':    '#003B73',
        'tk-blue2':   '#0077C8',
        'tk-green':   '#00B140',
        'tk-navy':    '#001F3F',
        'tk-grey':    '#4A4A4A',
        'tk-grey-lt': '#F5F7FA',
        'tk-border':  '#E0E4E8',
      },
      fontFamily: {
        'telkom': ['Telkom123', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'tk-gradient': 'linear-gradient(135deg, #003B73 0%, #0077C8 60%, #00B140 100%)',
        'tk-gradient-v': 'linear-gradient(180deg, #003B73 0%, #001F3F 100%)',
        'tk-diagonal': 'linear-gradient(135deg, #003B73 50%, #00B140 50%)',
      },
      boxShadow: {
        'tk-sm':  '0 2px 8px rgba(0, 59, 115, 0.12)',
        'tk-md':  '0 4px 16px rgba(0, 59, 115, 0.16)',
        'tk-lg':  '0 8px 32px rgba(0, 59, 115, 0.2)',
        'tk-green': '0 4px 16px rgba(0, 177, 64, 0.25)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        'slide-in':   'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress':   'progress 2.5s ease-out forwards',
        'spin-slow':  'spin 2s linear infinite',
        'count-up':   'countUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:  { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        progress: { from: { width: '0%' }, to: { width: '100%' } },
        countUp:  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
