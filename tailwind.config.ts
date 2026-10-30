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
        // 设计 Token —— 雾蓝灰 × 玫瑰金（浅色温柔高级主题）
        'bg-primary': '#F3F5F8',
        'bg-secondary': '#EAEEF4',
        'bg-card': '#FFFFFF',
        'text-primary': '#2B313B',
        'text-secondary': '#5B6472',
        accent: '#B76E79',
        'accent-purple': '#D9A0A8',
        success: '#4C9F7E',
        border: 'rgba(43, 49, 59, 0.08)',
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
        sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Noto Serif SC', 'Songti SC', 'STSong', 'serif'],
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
          '0%, 100%': { boxShadow: '0 0 10px rgba(183, 110, 121, 0.08)' },
          '50%': { boxShadow: '0 0 20px rgba(183, 110, 121, 0.22)' },
        },
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(43, 49, 59, 0.05)',
        'card-hover': '0 12px 24px -8px rgba(43, 49, 59, 0.12)',
        navbar: '0 1px 3px rgba(43, 49, 59, 0.05)',
        glow: '0 0 18px rgba(183, 110, 121, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
