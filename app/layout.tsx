import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Cormorant_Garamond, Libre_Baskerville, Patrick_Hand, Cinzel } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { Preloader } from "@/components/preloader"
import { Snowfall } from "@/components/snowfall"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
})

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrick-hand",
  display: "swap",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Canastas Navideñas Premium | Regalos Especiales",
  description:
    "Tienda especializada en canastas navideñas, arreglos florales y regalos premium. Regala momentos inolvidables esta Navidad.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${libreBaskerville.variable} ${patrickHand.variable} ${cinzel.variable} font-sans bg-elegant-white text-elegant-black`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Preloader />
          <Snowfall />
        </CartProvider>
      </body>
    </html>
  )
}
