"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Package, Truck, XCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener parámetros de la URL de Wompi
    const transactionId = searchParams.get('transaction_id');
    const status = searchParams.get('status');
    const reference = searchParams.get('reference');

    if (transactionId && status === 'APPROVED') {
      // Pago exitoso
      setOrderDetails({
        transactionId,
        reference,
        status: 'APPROVED'
      });
    } else if (status === 'DECLINED') {
      // Pago rechazado
      setOrderDetails({
        status: 'DECLINED',
        reference
      });
    } else {
      // Estado desconocido
      setOrderDetails({
        status: 'UNKNOWN',
        reference
      });
    }

    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === 'APPROVED') {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gray-900 border-2 border-green-400/30 luxury-glow">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-playfair font-bold text-white">
                ¡Pago Exitoso!
              </CardTitle>
              <p className="text-gray-300 text-lg mt-2">
                Tu pedido ha sido procesado correctamente
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Detalles del pedido */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Detalles del Pedido</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Número de Orden:</span>
                    <span className="text-white font-medium">{orderDetails.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">ID de Transacción:</span>
                    <span className="text-white font-medium">{orderDetails.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Estado:</span>
                    <span className="text-green-400 font-bold">APROBADO</span>
                  </div>
                </div>
              </div>

              {/* Próximos pasos */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white text-center">Próximos Pasos</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Preparación</h4>
                    <p className="text-gray-300 text-sm">
                      Tu pedido será preparado en las próximas 2-4 horas
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Envío</h4>
                    <p className="text-gray-300 text-sm">
                      Envío en 24-48 horas con seguimiento en tiempo real
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-gold-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Entrega</h4>
                    <p className="text-gray-300 text-sm">
                      Entrega en la dirección especificada
                    </p>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-3">📧 Confirmación por Email</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Hemos enviado un email de confirmación con todos los detalles de tu pedido. 
                  También recibirás actualizaciones sobre el estado de tu envío.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="luxury-button px-8 py-3">
                    <Home className="w-5 h-5 mr-2" />
                    Volver al Inicio
                  </Button>
                </Link>
                
                <Link href="/catalogo">
                  <Button variant="outline" className="border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-3">
                    <Package className="w-5 h-5 mr-2" />
                    Ver Más Productos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === 'DECLINED') {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gray-900 border-2 border-red-400/30 luxury-glow">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12 text-red-400" />
              </div>
              <CardTitle className="text-3xl font-playfair font-bold text-white">
                Pago Rechazado
              </CardTitle>
              <p className="text-gray-300 text-lg mt-2">
                Tu pago no pudo ser procesado
              </p>
            </CardHeader>
            <CardContent className="space-y-8 text-center">
              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-3">❌ Pago No Procesado</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Tu pago fue rechazado por el banco o hubo un problema con la transacción. 
                  Por favor, verifica que tu tarjeta tenga fondos suficientes y que los datos sean correctos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/checkout">
                  <Button className="luxury-button px-8 py-3">
                    Intentar Nuevamente
                  </Button>
                </Link>
                
                <Link href="/carrito">
                  <Button variant="outline" className="border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-3">
                    Volver al Carrito
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Estado desconocido
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gray-900 border-2 border-yellow-400/30 luxury-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair font-bold text-white">
              Estado del Pago Desconocido
            </CardTitle>
            <p className="text-gray-300 text-lg mt-2">
              No pudimos determinar el estado de tu pago
            </p>
          </CardHeader>
          <CardContent className="space-y-8 text-center">
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-3">⚠️ Estado No Confirmado</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                El estado de tu pago no está claro. Te recomendamos verificar con tu banco 
                o contactarnos para confirmar el estado de tu transacción.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button className="luxury-button px-8 py-3">
                  Contactar Soporte
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-3">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
