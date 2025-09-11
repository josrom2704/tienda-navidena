"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Crown, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b border-yellow-200 shadow-sm sticky top-0 z-50">
      {/* Mensajito promocional */}
      <div className="bg-yellow-500 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">
              ¡Envío GRATIS en compras superiores a $250! 🚚✨
            </span>
            
          </div>
        </div>
      </div>

      {/* Top bar con estrellas */}
      <div className="bg-yellow-50">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-2 h-2 text-white" />
            </div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-2 h-2 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-patrick-hand font-bold text-black group-hover:text-yellow-600 transition-colors duration-300">
                Canastas Navideñas
              </h1>
              <p className="text-sm text-gray-600 font-medium">REGALOS NAVIDEÑOS</p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8 font-cinzel">
            <Link 
              href="/" 
              className="text-black hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link 
              href="/catalogo" 
              className="text-black hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Catálogo
            </Link>
            <Link 
              href="/quienes-somos" 
              className="text-black hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/contacto" 
              className="text-black hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Contacto
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative text-black hover:text-yellow-600 hover:bg-yellow-50">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Botón de menú móvil */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-black hover:text-yellow-600 hover:bg-yellow-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-yellow-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-4 font-cinzel">
            <Link 
              href="/" 
              className="block text-black hover:text-yellow-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/catalogo" 
              className="block text-black hover:text-yellow-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link 
              href="/quienes-somos" 
              className="block text-black hover:text-yellow-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/contacto" 
              className="block text-black hover:text-yellow-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
