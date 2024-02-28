/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        104: '26rem',
        128: '32rem',
        176: '44rem',
        192: '48rem',
        208: '52rem',
        224: '56rem',
        256: '64rem',
      },
      transitionDuration: {
        '1800': '1800ms',
      },
      animation: {
        'slide': 'slide 40s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0) ' },
          '100%': { transform: 'translateX(-100%)' }  /* Cambia el porcentaje según la cantidad de imágenes */
        }
      },
      scale: {
        '102': '1.02',
      }
    }
  },
  plugins: [],
}


