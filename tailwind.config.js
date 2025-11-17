/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFFF',
        'neon-magenta': '#FF00FF',
        'neon-gold': '#FFD700',
        'neon-green': '#00FF00',
        'neon-purple': '#9D00FF',
        'dark-base': '#0a0e27',
        'dark-secondary': '#1a1a2e',
        'dark-card': '#14172b',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff',
        'neon-magenta': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
        'neon-gold': '0 0 10px #ffd700, 0 0 20px #ffd700',
      },
      animation: {
        'neon-flicker': 'neon-flicker 2s infinite',
        'scan': 'scan 4s linear infinite',
        'glitch': 'glitch 0.3s infinite',
      },
      keyframes: {
        'neon-flicker': {
          '0%, 100%': {
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #ff00ff, 0 0 40px #ff00ff',
          },
          '50%': {
            textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #ff00ff',
          },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        glitch: {
          '0%': {
            textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff',
          },
          '50%': {
            textShadow: '2px 0 #ff00ff, -2px 0 #00ffff',
          },
          '100%': {
            textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff',
          },
        },
      },
    },
  },
  plugins: [],
}
