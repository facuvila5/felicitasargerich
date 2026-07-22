import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Felicitas Argerich | Artista Plástica",
  description:
    "Sitio oficial de Felicitas Argerich, artista plástica. Obra, exposiciones y contacto.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
