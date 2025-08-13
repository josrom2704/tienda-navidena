"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, Crown, Shield, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const router = useRouter()



  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full flex items-center justify-center mx-auto mb-8 luxury-glow">
              <ShoppingBag className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-4xl font-playfair font-bold text-white mb-6">Tu carrito está vacío</h1>
            <p className="text-light mb-8 font-medium text-lg leading-relaxed">
              Descubre nuestra exclusiva colección de regalos navideños de lujo
            </p>
            <Link href="/catalogo">
              <Button size="lg" className="luxury-button px-10 py-4 text-lg font-medium tracking-wide">
                <Crown className="w-5 h-5 mr-2" />
                Explorar Colección
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
            Carrito de <span className="text-gold-300">Compras</span>
          </h1>
          <p className="text-light font-medium text-lg">Revisa tus productos seleccionados</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="bg-white luxury-border">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg luxury-border"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-gray-900">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border-2 border-gold-400 text-gold-400 hover:bg-gold-50"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-16 text-center font-bold text-lg">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-2 border-gold-400 text-gold-400 hover:bg-gold-50"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-playfair font-bold text-gray-900 mb-2">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card className="bg-black border-2 border-gold-400 luxury-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-gold-300 text-center">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="flex justify-between text-light">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-light">
                  <span className="font-medium">Envío:</span>
                  <span className={`font-bold ${total >= 250 ? 'text-gold-300' : 'text-white'}`}>
                    {total >= 250 ? 'Gratuito' : '$3'}
                  </span>
                </div>
                <div className="border-t border-gold-400/30 pt-6">
                  <div className="flex justify-between text-2xl font-playfair font-bold">
                    <span className="text-light">Total:</span>
                    <span className="text-gold-300">${(total + (total >= 250 ? 0 : 3)).toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full luxury-button py-4 text-lg font-medium tracking-wide" 
                  size="lg"
                  onClick={() => router.push("/checkout")}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Proceder al Pago
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-600 text-light hover:bg-gray-900 hover:text-white bg-transparent font-medium"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gold-400/15 to-gold-600/15 border-2 border-gold-400/30">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-gold-300 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold mb-3 text-light text-lg">Compra Segura</h3>
                <p className="text-medium font-medium leading-relaxed">
                  Tu información está protegida con encriptación de nivel bancario. Garantía de satisfacción 100%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-400/15 to-green-600/15 border-2 border-green-400/30">
              <CardContent className="p-8 text-center">
                <Truck className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold mb-3 text-light text-lg">Envío Premium</h3>
                <p className="text-medium font-medium leading-relaxed">
                  {total >= 250 ? (
                    <>Envío <span className="text-green-400 font-bold">GRATUITO</span> en 24-48 horas</>
                  ) : (
                    <>Envío por <span className="text-green-400 font-bold">$3</span> en 24-48 horas</>
                  )}
                  . Empaque de lujo incluido con tarjeta personalizada.
                </p>
                {total < 250 && (
                  <p className="text-green-400 text-sm font-medium mt-2">
                    ¡Agrega ${(250 - total).toFixed(2)} más para envío gratuito!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
