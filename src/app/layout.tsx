// app/layout.tsx

import type { Metadata } from "next";
// Importamos las fuentes desde next/font
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Configuración de la fuente para los títulos (Serif)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Pesos que vamos a usar
  variable: "--font-playfair", // Nombre de la variable CSS
});

// Configuración de la fuente para el cuerpo (Sans-serif)
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato", // Nombre de la variable CSS
});

export const metadata: Metadata = {
  title: "Doodle Spa - Luxury Mobile Grooming for Golden Doodles",
  description: "The exclusive mobile spa dedicated to the perfect grooming of your Golden Doodle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Aplicamos las variables de las fuentes al body */}
      <body className={`${playfair.variable} ${lato.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}