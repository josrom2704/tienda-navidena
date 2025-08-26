"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, CreditCard, Shield, Lock } from "lucide-react";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (paymentDetails: any) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export function PayPalButton({ amount, onSuccess, onError, disabled = false }: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      // Simular proceso de pago con PayPal
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular éxito del pago
      const paymentDetails = {
        id: `paypal_${Date.now()}`,
        amount: amount,
        currency: 'USD',
        status: 'completed',
        method: 'paypal',
        timestamp: new Date().toISOString()
      };

      setPaymentStatus('success');
      onSuccess(paymentDetails);
    } catch (error) {
      setPaymentStatus('error');
      onError('Error en el procesamiento del pago');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Procesando Pago...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Pago Exitoso
          </>
          );
      case 'error':
        return (
          <>
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
            Error en el Pago
          </>
        );
      default:
        return (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar con PayPal
          </>
        );
    }
  };

  const getButtonClasses = () => {
    if (paymentStatus === 'success') {
      return 'bg-green-600 hover:bg-green-700 text-white cursor-default';
    }
    if (paymentStatus === 'error') {
      return 'bg-red-600 hover:bg-red-700 text-white';
    }
    if (isLoading || disabled) {
      return 'bg-gray-400 cursor-not-allowed text-white';
    }
    return 'w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium tracking-wide';
  };

  return (
    <div className="space-y-6">
      {/* Botón principal de PayPal */}
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading || paymentStatus === 'success'}
        className={getButtonClasses()}
        size="lg"
      >
        {getButtonContent()}
      </Button>

      {/* Información de seguridad */}
      <div className="bg-white/50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-black mb-2">🏦 Información de Pago</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Pago seguro con encriptación SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Tus datos están protegidos</span>
          </div>
          <div className="text-center text-sm text-gray-500">
            Al continuar, serás redirigido a PayPal para completar tu pago de forma segura.
          </div>
        </div>
      </div>

      {/* Estado del pago */}
      {paymentStatus !== 'idle' && (
        <div className={`p-4 rounded-lg border ${
          paymentStatus === 'success' 
            ? 'bg-green-50 border-green-200' 
            : paymentStatus === 'error'
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="text-center">
            {paymentStatus === 'processing' && (
              <div className="flex items-center justify-center gap-2 text-yellow-700">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Procesando tu pago...</span>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>¡Pago procesado exitosamente!</span>
              </div>
            )}
            {paymentStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span>Error en el procesamiento del pago</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

