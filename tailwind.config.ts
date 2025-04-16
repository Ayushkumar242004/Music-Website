import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(280 80% 95%)',
          100: 'hsl(280 80% 90%)',
          200: 'hsl(280 80% 80%)',
          300: 'hsl(280 80% 70%)',
          400: 'hsl(280 80% 60%)',
          500: 'hsl(280 80% 50%)',
          600: 'hsl(280 80% 40%)',
          700: 'hsl(280 80% 30%)',
          800: 'hsl(280 80% 20%)',
          900: 'hsl(280 80% 10%)',
          950: 'hsl(280 80% 5%)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: 'hsl(190 80% 95%)',
          100: 'hsl(190 80% 90%)',
          200: 'hsl(190 80% 80%)',
          300: 'hsl(190 80% 70%)',
          400: 'hsl(190 80% 60%)',
          500: 'hsl(190 80% 50%)',
          600: 'hsl(190 80% 40%)',
          700: 'hsl(190 80% 30%)',
          800: 'hsl(190 80% 20%)',
          900: 'hsl(190 80% 10%)',
          950: 'hsl(190 80% 5%)'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: 'hsl(330 80% 95%)',
          100: 'hsl(330 80% 90%)',
          200: 'hsl(330 80% 80%)',
          300: 'hsl(330 80% 70%)',
          400: 'hsl(330 80% 60%)',
          500: 'hsl(330 80% 50%)',
          600: 'hsl(330 80% 40%)',
          700: 'hsl(330 80% 30%)',
          800: 'hsl(330 80% 20%)',
          900: 'hsl(330 80% 10%)',
          950: 'hsl(330 80% 5%)'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Additional cyberpunk neon colors
        neon: {
          purple: 'hsl(280 100% 70%)',
          cyan: 'hsl(190 100% 60%)',
          pink: 'hsl(330 100% 70%)',
          yellow: 'hsl(50 100% 70%)',
          blue: 'hsl(220 100% 70%)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        // Cyberpunk animation
        'cyberpunk-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7', textShadow: '0 0 10px hsl(280 100% 70%)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'cyberpunk-pulse': 'cyberpunk-pulse 2s ease-in-out infinite'
      },
      // Cyberpunk glow utilities
      boxShadow: {
        'neon-purple': '0 0 5px hsl(280 100% 70%), 0 0 10px hsl(280 100% 70%)',
        'neon-cyan': '0 0 5px hsl(190 100% 60%), 0 0 10px hsl(190 100% 60%)',
        'neon-pink': '0 0 5px hsl(330 100% 70%), 0 0 10px hsl(330 100% 70%)'
      },
      textShadow: {
        'neon-purple': '0 0 5px hsl(280 100% 70%), 0 0 10px hsl(280 100% 70%)',
        'neon-cyan': '0 0 5px hsl(190 100% 60%), 0 0 10px hsl(190 100% 60%)',
        'neon-pink': '0 0 5px hsl(330 100% 70%), 0 0 10px hsl(330 100% 70%)'
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    // For text shadow support (install: npm install tailwindcss-textshadow)
    require('tailwindcss-textshadow')
  ],
};

export default config;