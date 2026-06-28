/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#080808',
        surface: '#0f0f0f',
        'surface-2': '#161616',
        'surface-3': '#1e1e1e',
        border: '#262626',
        'border-subtle': '#1a1a1a',
        'text-primary': '#f5f5f5',
        'text-secondary': '#a3a3a3',
        'text-muted': '#525252',
        accent: '#7c6af7',
        'accent-2': '#a78bfa',
        'accent-glow': 'rgba(124, 106, 247, 0.15)',
        'accent-light': 'rgba(124, 106, 247, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,106,247,0.15), transparent)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'counter': 'counter 2s ease-out forwards',
        'typing': 'typing 3s steps(30) 1s forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(124, 106, 247, 0.15)',
        'glow-sm': '0 0 20px rgba(124, 106, 247, 0.1)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 -1px 0 rgba(0,0,0,0.4) inset',
        'elevated': '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}
