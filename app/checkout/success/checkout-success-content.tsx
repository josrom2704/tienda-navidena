"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Mail, Package, Truck, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderDetails {
  reference: string;
  transactionId: string;
  amount: number;
  status: string;
  customerName: string;
  customerEmail: string;
}

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular obtención de detalles del pedido
    const reference = searchParams.get("reference");
    const transactionId = searchParams.get("transaction_id");
    
    if (reference && transactionId) {
      // Simular delay de carga
      setTimeout(() => {
        setOrderDetails({
          reference,
          transactionId,
          amount: 299.99,
          status: "approved",
          customerName: "Cliente Ejemplo",
          customerEmail: "cliente@ejemplo.com"
        });
        setLoading(false);
      }, 2000);
    } else {
      setError("No se encontraron los parámetros de la transacción");
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
          <p className="text-black mt-4 text-lg">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-black mb-4">Error en la Transacción</h1>
            <p className="text-gray-600 text-xl mb-8">{error}</p>
            <Link href="/checkout">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                Intentar de Nuevo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === "approved") {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header de éxito */}
            <div className="text-center mb-16 fade-in-up">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-serif font-bold text-black">
                ¡Pago Exitoso!
              </CardTitle>
              <p className="text-xl text-gray-600 mt-4">
                Tu pedido ha sido procesado correctamente
              </p>
            </div>

            {/* Detalles del pedido */}
            <Card className="bg-white border-2 border-green-200 shadow-lg mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold text-black mb-4">Detalles del Pedido</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-2">Referencia:</p>
                    <span className="text-black font-medium">{orderDetails.reference}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">ID de Transacción:</p>
                    <span className="text-black font-medium">{orderDetails.transactionId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Próximos pasos */}
            <Card className="bg-white border-2 border-blue-200 shadow-lg mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold text-black text-center">Próximos Pasos</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="text-black font-semibold mb-2">Preparación</h4>
                      <p className="text-gray-600 text-sm">Tu pedido será preparado en las próximas 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Truck className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="text-black font-semibold mb-2">Envío</h4>
                      <p className="text-gray-600 text-sm">Envío en 24-48 horas con seguimiento en tiempo real</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="text-black font-semibold mb-2">Entrega</h4>
                      <p className="text-gray-600 text-sm">Recibirás notificaciones de cada paso del proceso</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="text-center space-y-4">
              <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                  <Home className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              
              <Link href="/contacto">
                <Button variant="outline" className="border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 px-8 py-3">
                  <Mail className="w-5 h-5 mr-2" />
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === "pending") {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-black">
              Pago en Proceso
            </CardTitle>
            <p className="text-gray-600 text-xl mt-4 mb-8">
              Tu pago está siendo procesado. Esto puede tomar unos minutos.
            </p>
            
            <Link href="/checkout">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === "rejected") {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-black">
              Pago Rechazado
            </CardTitle>
            <p className="text-gray-600 text-xl mt-4 mb-8">
              Tu pago no pudo ser procesado. Por favor, intenta de nuevo.
            </p>
            
            <Link href="/checkout">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                Intentar de Nuevo
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
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Clock className="w-12 h-12 text-gray-600" />
          </div>
          <p className="text-black mt-4 text-lg">Cargando...</p>
        </div>
      </div>
    </div>
  );
}
