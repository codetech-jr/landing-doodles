// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Creamos utilidades para usar nuestras fuentes
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-lato)"],
      },
      // Aquí puedes extender la paleta de colores del diseño Hi-Fi
      colors: {
        'brand-cream': '#FFF7E8',
        'brand-brown': '#4B3F36',
        'brand-gold': '#D4AF37', // Un dorado de ejemplo
      }
    },
  },
  plugins: [],
};
export default config;