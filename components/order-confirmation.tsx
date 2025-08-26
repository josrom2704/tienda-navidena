"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Package, Truck, Home, Clock, Shield } from "lucide-react";
import Link from "next/link";

export function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header de confirmación */}
          <div className="text-center mb-16 fade-in-up">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación en breve.
            </p>
          </div>

          {/* Información del pedido */}
          <Card className="bg-white border-2 border-green-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif font-bold text-black text-center">
                Detalles del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-black mb-4">¿Qué sigue?</h3>
                  
                  <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <p className="text-black font-medium">Email de confirmación</p>
                      <p className="text-gray-600 text-sm">Recibirás un email con todos los detalles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="text-black font-medium">Preparación del pedido</p>
                      <p className="text-gray-600 text-sm">Nuestro equipo prepara tu pedido con cuidado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <p className="text-black font-medium">Envío premium</p>
                      <p className="text-gray-600 text-sm">Envío en 24-48 horas con seguimiento</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-black mb-4">Información importante</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-gray-700">Tiempo de entrega: 24-48 horas</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Garantía de satisfacción 100%</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Empaque premium incluido</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-black mb-2">¡Gracias por elegirnos!</h3>
            <p className="text-gray-600 mb-6">
              Si tienes alguna pregunta, no dudes en contactarnos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-medium tracking-wide">
                  <Home className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              
              <Link href="/contacto">
                <Button variant="outline" className="border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 px-8 py-4 text-lg font-medium">
                  <Mail className="w-5 h-5 mr-2" />
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
