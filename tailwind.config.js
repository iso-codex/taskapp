/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(240, 20%, 99%)',
        foreground: 'hsl(240, 10%, 4%)',
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(240, 10%, 4%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(240, 10%, 4%)',
        },
        primary: {
          DEFAULT: 'hsl(221, 83%, 53%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(240, 5%, 96%)',
          foreground: 'hsl(240, 6%, 10%)',
        },
        muted: {
          DEFAULT: 'hsl(240, 5%, 96%)',
          foreground: 'hsl(240, 4%, 46%)',
        },
        accent: {
          DEFAULT: 'hsl(240, 5%, 96%)',
          foreground: 'hsl(240, 6%, 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        border: 'hsl(240, 6%, 90%)',
        input: 'hsl(240, 6%, 90%)',
        ring: 'hsl(221, 83%, 53%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
