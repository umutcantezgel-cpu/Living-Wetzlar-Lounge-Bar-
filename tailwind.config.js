/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a0e27',
        'navy-light': '#1a1a2e',
        maroon: '#FF00FF',
        copper: '#00FFFF',
        gold: '#FFD700',
        cream: '#ffffff',
        'neon-pink': '#FF00FF',
        'neon-cyan': '#00FFFF',
        'neon-green': '#00FF00',
        'neon-purple': '#9D00FF',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'neon-flicker': 'neon-flicker 2s infinite',
        'glitch': 'glitch 0.3s infinite',
        'scan': 'scan 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'neon-flicker': {
          '0%, 100%': {
            textShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-pink), 0 0 40px var(--neon-pink)',
          },
          '50%': {
            textShadow: '0 0 5px var(--neon-cyan), 0 0 10px var(--neon-cyan), 0 0 15px var(--neon-pink)',
          },
        },
        glitch: {
          '0%': { textShadow: '-2px 0 var(--neon-pink), 2px 0 var(--neon-cyan)' },
          '50%': { textShadow: '2px 0 var(--neon-pink), -2px 0 var(--neon-cyan)' },
          '100%': { textShadow: '-2px 0 var(--neon-pink), 2px 0 var(--neon-cyan)' },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
      },
    },
  },
  plugins: [],
}
