/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: '#E8DED1', // Deeper, dirtier parchment base
        charcoal: '#2A2522', // Darker, warmer vintage ink
        gold: {
          muted: '#B08D57',
          light: '#C7A877',
          dark: '#8E6E3C'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'parchment': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.15%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
