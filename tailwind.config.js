export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-5px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
      },
      colors: {
        'auth-bg': '#f5f5f5',
      },
      fontSize: {
        '13': '13px',
        '15': '15px',
      },
      borderRadius: {
        'auth': '8px',
      },
      maxWidth: {
        'auth': '420px',
      },
      boxShadow: {
        'focus-error': '0 0 0 3px rgba(255, 62, 62, 0.1)',
        'focus-default': '0 0 0 3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
