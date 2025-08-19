"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WompiService, { WompiPaymentRequest } from "@/lib/wompi-service";
import { getWompiConfig } from "@/lib/wompi-config";
import { CreditCard, Loader2, CheckCircle, XCircle } from "lucide-react";

interface WompiButtonProps {
  amount: number;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

export function WompiButton({ 
  amount, 
  orderNumber, 
  customerEmail, 
  customerName, 
  onPaymentSuccess, 
  onPaymentError 
}: WompiButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const wompiService = WompiService.getInstance();

  const handleWompiPayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Convertir el monto a centavos (Wompi requiere centavos)
      const amountInCents = Math.round(amount * 100);
      
      // Crear la solicitud de pago
      const paymentRequest: WompiPaymentRequest = {
        amount_in_cents: amountInCents,
        currency: 'USD', // Wompi SV usa USD
        reference: orderNumber,
        public_key: 'wompi_api', // Para Wompi SV
        acceptance_token: 'acceptance_token_placeholder', // Necesitarás obtener este token
        customer_email: customerEmail,
        payment_method: {
          type: 'CARD',
          installments: 1
        }
      };

      toast({
        title: "Procesando pago",
        description: "Conectando con Wompi para procesar tu pago...",
      });

      // Crear enlace de pago (más seguro para e-commerce)
      const paymentResponse = await wompiService.createPaymentLink(paymentRequest);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || 'Error al crear el enlace de pago');
      }

      // Redirigir al usuario al enlace de pago de Wompi
      if (paymentResponse.payment_url) {
        toast({
          title: "Redirigiendo a Wompi",
          description: "Serás redirigido a Wompi para completar tu pago.",
        });

        // Redirigir al usuario a la pasarela de pago de Wompi
        console.log('🔗 Redirigiendo a Wompi:', paymentResponse.payment_url);
        
        // Redirección real a Wompi
        window.location.href = paymentResponse.payment_url;
        
      } else {
        throw new Error('No se pudo generar el enlace de pago');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el pago';
      setPaymentStatus('error');
      
      toast({
        title: "Error en el pago",
        description: errorMessage,
        variant: "destructive",
      });

      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Procesando...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            ¡Pago Exitoso!
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
            Error en Pago
          </>
        );
      default:
        return (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar con Wompi
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (paymentStatus) {
      case 'success':
        return 'default' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleWompiPayment}
        disabled={isProcessing || paymentStatus === 'success'}
        variant={getButtonVariant()}
        className="w-full luxury-button py-4 text-lg font-medium tracking-wide"
        size="lg"
      >
        {getButtonContent()}
      </Button>
      
      {paymentStatus === 'success' && (
        <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm">
            ✅ Pago procesado exitosamente. Redirigiendo...
          </p>
        </div>
      )}
      
      {paymentStatus === 'error' && (
        <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">
            ❌ Hubo un error en el pago. Intenta nuevamente.
          </p>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-400 text-xs">
          🔒 Pagos procesados de forma segura por Wompi
        </p>
        <p className="text-gray-400 text-xs mt-1">
          💳 Aceptamos todas las tarjetas principales
        </p>
      </div>
    </div>
  );
}
