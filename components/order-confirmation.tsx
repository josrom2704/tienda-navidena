"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Package, Truck, Crown, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface OrderConfirmationProps {
  orderNumber: string;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ orderNumber, onContinueShopping }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 luxury-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
            ¡Pedido <span className="text-green-400">Confirmado</span>!
          </h1>
          <p className="text-light font-medium text-lg">
            Tu pedido ha sido procesado exitosamente
          </p>
        </div>

        <Card className="bg-gray-900 border-2 border-green-400/30 luxury-glow mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-white mb-2">
                  Número de Orden
                </h2>
                <p className="text-3xl font-mono font-bold text-green-400 bg-gray-800 px-6 py-3 rounded-lg">
                  {orderNumber}
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-4">¿Qué sigue?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Email de confirmación</p>
                      <p className="text-gray-300 text-sm">
                        Recibirás un email con todos los detalles de tu pedido
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Preparación del pedido</p>
                      <p className="text-gray-300 text-sm">
                        Tu pedido será preparado con cuidado en las próximas 24 horas
                      </p>
                    </div>
                  </div>
                  
                                     <div className="flex items-start space-x-3">
                     <Truck className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                     <div>
                       <p className="text-white font-medium">Envío premium</p>
                       <p className="text-gray-300 text-sm">
                         Entrega en 24-48 horas con seguimiento en tiempo real
                       </p>
                     </div>
                   </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold-400/20 to-gold-600/20 p-6 rounded-lg border border-gold-400/30">
                <Crown className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">¡Gracias por elegirnos!</h3>
                <p className="text-gray-300 text-sm">
                  Has seleccionado productos de la más alta calidad para hacer de esta Navidad 
                  una experiencia inolvidable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onContinueShopping}
            className="luxury-button px-8 py-4 text-lg font-medium tracking-wide"
            size="lg"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Seguir Comprando
          </Button>
          
          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            ¿Tienes alguna pregunta? Contáctanos en{" "}
            <a href="mailto:soporte@tiendanavidena.com" className="text-gold-400 hover:underline">
              soporte@tiendanavidena.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
