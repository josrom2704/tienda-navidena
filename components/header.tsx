"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X, Phone, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const categories = [
    { name: "Canastas con Vino", href: "/catalogo/canastas-vino" },
    { name: "Canastas con Whisky", href: "/catalogo/canastas-whisky" },
    { name: "Canastas sin Licor", href: "/catalogo/canastas-sin-licor" },
    { name: "Regalos Navideños", href: "/catalogo/regalos-navidenos" },
    { name: "Detalles Pequeños", href: "/catalogo/detalles-pequenos" },
    { name: "Canastas Frutales", href: "/catalogo/canastas-frutales" },
    { name: "Flores", href: "/catalogo/flores" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gold-400/30 backdrop-blur-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gold-400/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6 text-gold-300">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +503 7014-3259
              </span>
              <span className="hidden md:block text-light">Envío gratuito en compras mayores a $250</span>
            </div>
            <div className="text-gold-300 font-medium">✨ Temporada Navideña  2025 ✨</div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full flex items-center justify-center luxury-glow">
                <span className="text-black font-bold text-xl">✦</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gold-300 tracking-wide">Canastas Navideñas</h1>
              <p className="text-sm text-light font-medium tracking-widest uppercase">Regalos Navideños</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-light hover:text-gold-300 font-medium transition-all duration-300 elegant-underline"
            >
              Inicio
            </Link>
            <div className="relative group">
              <Link
                href="/catalogo"
                className="text-light hover:text-gold-300 font-medium transition-all duration-300 elegant-underline"
              >
                Catálogo
              </Link>
              <div className="absolute top-full left-0 mt-4 w-72 bg-black border border-gold-400/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 luxury-glow">
                <div className="p-6 space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-3 text-medium hover:text-gold-300 hover:bg-gray-900/70 rounded transition-all duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/quienes-somos"
              className="text-light hover:text-gold-300 font-medium transition-all duration-300 elegant-underline"
            >
              Quiénes Somos
            </Link>
            <Link
              href="/contacto"
              className="text-light hover:text-gold-300 font-medium transition-all duration-300 elegant-underline"
            >
              Contacto
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-light hover:text-gold-300 hover:bg-gray-900/70"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-light hover:text-gold-300 hover:bg-gray-900/70"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Nuevo botón de cotización */}
            <Link href="#cotizacion">
              <Button className="hidden lg:flex luxury-button px-6 py-2.5 text-sm font-medium tracking-wide">
                ✨ Cotiza tu Arreglo
              </Button>
            </Link>

            <Link href="/carrito">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-light hover:text-gold-300 hover:bg-gray-900/70"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-gold-400 text-black text-xs font-bold">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-light hover:text-gold-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gold-400/30">
            <nav className="space-y-4 pt-6">
              <Link href="/" className="block text-light hover:text-gold-300 font-medium py-2">
                Inicio
              </Link>
              <div className="space-y-2">
                <span className="block text-gold-300 font-medium py-2">Catálogo</span>
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block text-sm text-medium hover:text-gold-300 py-1.5"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/quienes-somos" className="block text-light hover:text-gold-300 font-medium py-2">
                Quiénes Somos
              </Link>
              <Link href="/contacto" className="block text-light hover:text-gold-300 font-medium py-2">
                Contacto
              </Link>
              <Link href="#cotizacion" className="block text-gold-300 hover:text-gold-200 font-medium py-2">
                ✨ Cotiza tu Arreglo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
