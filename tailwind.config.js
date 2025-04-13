// tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        glow: 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))',
          },
        },
      },
    },
  },
};
