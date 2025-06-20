import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";


const config: Omit<Config, "content"> = {
  darkMode: 'class',
  theme: {
    extend: {
      
      screens: {
        lmd: '860px',
      },
      keyframes: {
        "infinite-scroll": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 20px))' },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 5s linear infinite',
        'infinite-scroll2': 'infinite-scroll 9s linear infinite',
        "caret-blink": "caret-blink 1.25s ease-out infinite",

      },
    },
  },
  plugins: [scrollbarHide],
};
export default config;
