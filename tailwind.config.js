/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: 'rgb(var(--bg-dark) / <alpha-value>)',
        bgPanel: 'rgb(var(--bg-panel) / <alpha-value>)',
        bgPanel2: 'rgb(var(--bg-panel-2) / <alpha-value>)',
        bgPanelHover: 'rgb(var(--bg-panel-hover) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        lineSoft: 'rgb(var(--line-soft) / <alpha-value>)',
        cyanNeon: 'rgb(var(--cyan) / <alpha-value>)',
        cyanDim: 'rgb(var(--cyan-dim) / <alpha-value>)',
        greenNeon: 'rgb(var(--green) / <alpha-value>)',
        greenDim: 'rgb(var(--green-dim) / <alpha-value>)',
        amberWarn: 'rgb(var(--amber) / <alpha-value>)',
        amberDim: 'rgb(var(--amber-dim) / <alpha-value>)',
        textMain: 'rgb(var(--text-main) / <alpha-value>)',
        textDim: 'rgb(var(--text-dim) / <alpha-value>)',
        textFaint: 'rgb(var(--text-faint) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(var(--cyan), 0.25)',
        'glow-cyan-lg': '0 0 40px rgba(var(--cyan), 0.4)',
        'glow-green': '0 0 20px rgba(var(--green), 0.25)',
        'glow-amber': '0 0 20px rgba(var(--amber), 0.25)',
        'inner-chip': 'inset 0 0 30px rgba(var(--cyan), 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
