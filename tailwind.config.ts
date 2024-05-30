import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
import colors from "tailwindcss/colors";
import {
  createVariableColors,
  variableColorsPlugin,
} from "tailwindcss-variable-colors";
import { mylog } from "./lib/utils";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    lineHeight: {
      11: "2.75rem",
      12: "3rem",
      13: "3.25rem",
      14: "3.5rem",
    },
    debugScreens: {
      position: ['bottom', 'right'],
      ignore: ['dark'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      minWidth: {
        '2xl': '42rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-right": {
          "0%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        'intro-scroll': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
          '20%': {
            transform: 'translateY(2px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(8px)',
            opacity: '0',
          },
        },
        'cursor-blink': {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {

        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-right": "bounce-right 1s ease-in-out infinite",
        // 光标闪烁动画
        'cursor-blink': 'cursor-blink 0.6s step-end infinite alternate',
        'intro-scroll': 'intro-scroll 3s ease infinite',
      },

      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },

  },
  plugins: [
    // 开发模式下加载显示屏幕大小的插件
    process.env.NODE_ENV === 'development' &&
    require('tailwindcss-debug-screens'),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    variableColorsPlugin(colors),
  ],
} satisfies Config;

export default config;