import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './content/**/*.{md,json}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif']
      },
      colors: {
        brand: {
          DEFAULT: '#d97706',
          dark: '#92400e'
        }
      }
    }
  },
  plugins: [typography]
};
