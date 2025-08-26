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
    <header className="sticky top-0 z-50 bg-elegant-white border-b border-gold-200 backdrop-blur-sm shadow-elegant">
      {/* Top bar */}
      <div className="bg-elegant-black border-b border-gold-400/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6 text-gold-300">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +503 7014-3259
              </span>
              <span className="hidden md:block text-elegant-light">Envío gratuito en compras mayores a $250</span>
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
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center elegant-glow">
                <span className="text-elegant-white font-bold text-xl">✦</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl title-elegant text-elegant-black tracking-wide">Canastas Navideñas</h1>
              <p className="text-sm text-elegant-gray font-medium tracking-widest uppercase">Regalos Navideños</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-elegant-black hover:text-gold-500 font-medium transition-all duration-300 elegant-underline"
            >
              Inicio
            </Link>
            <div className="relative group">
              <Link
                href="/catalogo"
                className="text-elegant-black hover:text-gold-500 font-medium transition-all duration-300 elegant-underline"
              >
                Catálogo
              </Link>
              <div className="absolute top-full left-0 mt-4 w-72 bg-elegant-white border border-gold-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-elegant">
                <div className="p-6 space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-3 text-elegant-gray hover:text-gold-500 hover:bg-cream-100 rounded transition-all duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/quienes-somos"
              className="text-elegant-black hover:text-gold-500 font-medium transition-all duration-300 elegant-underline"
            >
              Quiénes Somos
            </Link>
            <Link
              href="/contacto"
              className="text-elegant-black hover:text-gold-500 font-medium transition-all duration-300 elegant-underline"
            >
              Contacto
            </Link>
          </nav>

          {/* Right side - Cart and Search */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-elegant-black hover:text-gold-500 hover:bg-cream-100">
              <Search className="w-4 h-4" />
            </Button>
            
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative text-elegant-black hover:text-gold-500 hover:bg-cream-100">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gold-500 text-elegant-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-elegant-black hover:text-gold-500 hover:bg-cream-100"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-elegant-white border-t border-gold-200 shadow-elegant">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              <Link
                href="/"
                className="block py-2 text-elegant-black hover:text-gold-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <div className="space-y-2">
                <div className="font-medium text-elegant-black mb-2">Catálogo</div>
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="block py-2 pl-4 text-elegant-gray hover:text-gold-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/quienes-somos"
                className="block py-2 text-elegant-black hover:text-gold-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiénes Somos
              </Link>
              <Link
                href="/contacto"
                className="block py-2 text-elegant-black hover:text-gold-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
