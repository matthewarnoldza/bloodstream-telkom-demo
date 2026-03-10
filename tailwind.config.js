/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tk-blue':    '#0099FF',  // Primary Blue (Bloodstream/Telkom logo blue)
        'tk-blue2':   '#0077CC',  // Darker blue for hover
        'tk-green':   '#91E200',  // Lime green (Telkom logo green)
        'tk-navy':    '#0B1A2E',  // Deep dark navy (hero backgrounds)
        'tk-grey':    '#5F7089',  // Body text secondary
        'tk-grey-lt': '#F3F5F8',  // Page background
        'tk-border':  '#E2E8F0',  // Border colour
      },
      fontFamily: {
        'telkom': ['Telkom123', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'tk-hero-glow': 'radial-gradient(ellipse at 10% 50%, rgba(0,153,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 90% 50%, rgba(145,226,0,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'tk-sm':  '0 1px 3px rgba(11,26,46,0.06)',
        'tk-md':  '0 4px 12px rgba(11,26,46,0.08)',
        'tk-lg':  '0 8px 30px rgba(11,26,46,0.1)',
        'vml-sm': '0 2px 8px rgba(0, 153, 255, 0.15)',
        'vml-md': '0 4px 16px rgba(0, 153, 255, 0.2)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'fade-up':    'fadeUp 0.5s ease-out backwards',
        'slide-in':   'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 2s linear infinite',
        'hero-reveal':'heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s backwards',
        'progress':   'progress 2.5s ease-out forwards',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:    { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        heroReveal: { from: { opacity: '0', transform: 'translateY(24px) scale(0.96)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        progress:   { from: { width: '0%' }, to: { width: '100%' } },
      },
    },
  },
  plugins: [],
}
