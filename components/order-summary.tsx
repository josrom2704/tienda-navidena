"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { Package, Truck, Shield, Crown } from "lucide-react";

interface OrderSummaryProps {
  giftWrap: boolean;
  giftWrapPrice?: number;
}

export function OrderSummary({ giftWrap, giftWrapPrice = 50 }: OrderSummaryProps) {
  const { items, total } = useCart();

  const subtotal = total;
  const giftWrapCost = giftWrap ? giftWrapPrice : 0;
  const shippingCost = total >= 250 ? 0 : 3; // Envío gratuito si supera $250, sino $3
  const finalTotal = subtotal + giftWrapCost + shippingCost;

  return (
    <div className="space-y-6">
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="text-2xl title-elegant text-elegant-black text-center">
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {/* Productos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-elegant-black text-lg">Productos</h3>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gold-400/30"
                  />
                  <div>
                    <p className="text-elegant-black font-medium">{item.name}</p>
                    <p className="text-elegant-gray text-sm">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-elegant-black font-semibold">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Opciones adicionales */}
          {giftWrap && (
            <div className="flex items-center justify-between py-3 border-t border-gold-200">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-gold-500" />
                <span className="text-elegant-black">Empaque de regalo</span>
              </div>
              <span className="text-elegant-black font-semibold">${giftWrapPrice}</span>
            </div>
          )}

          {/* Subtotal */}
          <div className="flex justify-between text-elegant-gray border-t border-gold-200 pt-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold">${subtotal.toLocaleString()}</span>
          </div>

          {/* Envío */}
          <div className="flex justify-between text-elegant-gray">
            <span className="font-medium">Envío:</span>
            <span className={`font-bold ${shippingCost === 0 ? 'text-gold-500' : 'text-elegant-black'}`}>
              {shippingCost === 0 ? 'Gratuito' : `$${shippingCost}`}
            </span>
          </div>

          {/* Total */}
          <div className="border-t border-gold-400/30 pt-6">
            <div className="flex justify-between text-2xl title-elegant font-bold">
              <span className="text-elegant-black">Total:</span>
              <span className="text-gold-500">${finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de envío */}
      <Card className="bg-gradient-to-br from-gold-400/15 to-gold-600/15 border-2 border-gold-400/30">
        <CardContent className="p-6 text-center">
          <Truck className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h3 className="title-elegant font-semibold mb-3 text-elegant-black text-lg">
            Envío Premium
          </h3>
          <p className="text-elegant-gray font-medium leading-relaxed">
            {total >= 250 ? (
              <>Envío <span className="text-gold-500 font-bold">GRATUITO</span> en 24-48 horas</>
            ) : (
              <>Envío por <span className="text-gold-500 font-bold">$3</span> en 24-48 horas</>
            )}
            . Empaque de lujo incluido con tarjeta personalizada.
          </p>
          {total < 250 && (
            <p className="text-gold-500 text-sm font-medium mt-2">
              ¡Agrega ${(250 - total).toFixed(2)} más para envío gratuito!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card className="bg-gradient-to-br from-blue-400/15 to-blue-600/15 border-2 border-blue-400/30">
        <CardContent className="p-6 text-center">
          <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="title-elegant font-semibold mb-3 text-elegant-black text-lg">
            Compra Segura
          </h3>
          <p className="text-elegant-gray font-medium leading-relaxed">
            Tu información está protegida con encriptación de nivel bancario. 
            Garantía de satisfacción 100%.
          </p>
        </CardContent>
      </Card>

      {/* Garantía */}
      <Card className="bg-gradient-to-br from-green-400/15 to-green-600/15 border-2 border-green-400/30">
        <CardContent className="p-6 text-center">
          <Crown className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="title-elegant font-semibold mb-3 text-elegant-black text-lg">
            Garantía Premium
          </h3>
          <p className="text-elegant-gray font-medium leading-relaxed">
            Productos de la más alta calidad con garantía de 30 días. 
            Devolución gratuita si no estás satisfecho.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
