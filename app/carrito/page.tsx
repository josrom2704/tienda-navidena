"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowRight, Package, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CarritoPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <ShoppingBag className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-black mb-6">Tu carrito está vacío</h1>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              Parece que aún no has agregado productos a tu carrito. ¡Explora nuestro catálogo y encuentra los regalos perfectos!
            </p>
            <Link href="/catalogo">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 text-lg font-medium tracking-wide">
                Explorar Catálogo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
          Tu Carrito de Compras
        </h1>
        <p className="text-gray-600 text-xl mb-12">Revisa tus productos antes de finalizar la compra</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="bg-white border-2 border-yellow-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-yellow-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-semibold text-black mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <label className="text-gray-700 font-medium">Cantidad:</label>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="border border-yellow-300 rounded-md px-3 py-1 text-black bg-white"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-serif font-bold text-yellow-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-gray-500">${item.price.toFixed(2)} c/u</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-2 border-yellow-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-black">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-black">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-medium text-black">Gratis</span>
                  </div>
                  <div className="border-t border-yellow-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-xl font-semibold text-black">Total:</span>
                      <span className={`text-2xl font-bold ${total >= 250 ? 'text-yellow-600' : 'text-black'}`}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {total >= 250 && (
                      <p className="text-yellow-600 text-sm mt-1">¡Envío gratuito incluido!</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 text-lg font-medium tracking-wide">
                      Proceder al Pago
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 bg-transparent font-medium"
                  >
                    Continuar Comprando
                  </Button>
                </div>

                {/* Información adicional */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">Envío en 24-48 horas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">Entrega premium incluida</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">Garantía de satisfacción</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
