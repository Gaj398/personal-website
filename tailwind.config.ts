import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        // 设计 Token —— 颜色体系
        'bg-primary': '#080F1A',
        'bg-secondary': '#0D1321',
        'bg-card': '#111827',
        'text-primary': '#E6EAF2',
        'text-secondary': '#94A3B8',
        accent: '#38BDF8',
        'accent-purple': '#818CF8',
        success: '#34D399',
        border: 'rgba(230, 234, 242, 0.08)',
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        modal: '20px',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        twinkle: 'twinkle 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(56, 189, 248, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)' },
        },
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        navbar: '0 1px 3px rgba(0, 0, 0, 0.2)',
        glow: '0 0 20px rgba(56, 189, 248, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
