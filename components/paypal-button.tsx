"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PayPalService, { PaymentDetails } from "@/lib/paypal-service";
import { CreditCard, Loader2 } from "lucide-react";

interface PayPalButtonProps {
  amount: number;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

export function PayPalButton({ 
  amount, 
  orderNumber, 
  customerEmail, 
  customerName, 
  onPaymentSuccess, 
  onPaymentError 
}: PayPalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const paypalService = PayPalService.getInstance();

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // Crear orden de pago
      const paymentDetails: PaymentDetails = {
        amount,
        currency: 'USD',
        description: `Pedido ${orderNumber} - Tienda Navideña`,
        orderNumber,
        customerEmail,
        customerName,
      };

      const paymentResponse = await paypalService.createPaymentOrder(paymentDetails);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || 'Error al crear la orden de pago');
      }

      // En producción, aquí se redirigiría al usuario a PayPal
      // Por ahora simulamos el proceso completo
      toast({
        title: "Redirigiendo a PayPal",
        description: "Serás redirigido a PayPal para completar tu pago.",
      });

      // Simular redirección a PayPal
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular captura del pago
      const captureResponse = await paypalService.capturePayment(paymentResponse.paymentId!);

      if (!captureResponse.success) {
        throw new Error('Error al procesar el pago');
      }

      // Verificar estado del pago
      const isPaymentSuccessful = await paypalService.verifyPaymentStatus(paymentResponse.paymentId!);

      if (!isPaymentSuccessful) {
        throw new Error('El pago no pudo ser verificado');
      }

      toast({
        title: "¡Pago exitoso!",
        description: `Tu pago ha sido procesado. ID de transacción: ${captureResponse.transactionId}`,
      });

      onPaymentSuccess(captureResponse.transactionId!);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el pago';
      
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

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayPalPayment}
        disabled={isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium tracking-wide"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Procesando con PayPal...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar con PayPal
          </>
        )}
      </Button>

      <div className="text-center text-sm text-gray-400">
        <p>🔒 Pago seguro procesado por PayPal</p>
        <p>💳 Acepta tarjetas de crédito, débito y cuentas PayPal</p>
      </div>

      {/* Información de la cuenta bancaria */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
        <h4 className="font-semibold text-white mb-2">🏦 Información de Pago</h4>
        <div className="text-sm text-gray-300 space-y-1">
          <p>El dinero será depositado en nuestra cuenta bancaria:</p>
          <p><strong>Banco:</strong> {paypalService.getBankAccountInfo().bankName}</p>
          <p><strong>Moneda:</strong> USD (Dólares Americanos)</p>
          <p><strong>País:</strong> {paypalService.getBankAccountInfo().country}</p>
        </div>
      </div>
    </div>
  );
}

