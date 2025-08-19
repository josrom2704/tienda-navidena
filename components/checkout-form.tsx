"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "./cart-provider";
import { OrderSummary } from "./order-summary";
import { WompiButton } from "./wompi-button";
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone } from "lucide-react";

interface CheckoutFormProps {
  onSuccess: (orderNumber: string) => void;
  onBack: () => void;
}

export function CheckoutForm({ onSuccess, onBack }: CheckoutFormProps) {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "El Salvador",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    setIsProcessing(true);
    
    try {
      // Generar número de orden
      const orderNumber = `ORD-${Date.now()}`;
      
      // Simular envío de email de confirmación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar carrito y mostrar confirmación
      clearCart();
      onSuccess(orderNumber);
      
    } catch (error) {
      console.error('Error en confirmación:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Error en pago:', error);
    // El usuario puede intentar nuevamente
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.postalCode.trim() !== ""
    );
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-white">
            <User className="w-4 h-4 inline mr-2" />
            Nombre
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-white">
            <User className="w-4 h-4 inline mr-2" />
            Apellido
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            placeholder="Tu apellido"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-white">
          <Mail className="w-4 h-4 inline mr-2" />
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-white">
          <Phone className="w-4 h-4 inline mr-2" />
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          placeholder="+503 7123 4567"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={nextStep}
          disabled={!isFormValid()}
          className="luxury-button"
        >
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="address" className="text-white">
          <MapPin className="w-4 h-4 inline mr-2" />
          Dirección
        </Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          placeholder="Dirección completa"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-white">Ciudad</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            placeholder="San Salvador"
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode" className="text-white">Código Postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            placeholder="01001"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country" className="text-white">País</Label>
        <Input
          id="country"
          name="country"
          value={formData.country}
          disabled
          className="bg-gray-700 border-gray-600 text-gray-400"
        />
      </div>

      <div>
        <Label htmlFor="notes" className="text-white">Notas Adicionales</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          placeholder="Instrucciones especiales para la entrega..."
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="border-2 border-gray-600 text-white hover:bg-gray-800 hover:text-white"
        >
          Atrás
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          className="luxury-button"
        >
          Continuar al Pago
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          Resumen del Pedido
        </h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-300 mb-2">
            <span className="font-medium">Cliente:</span> {formData.firstName} {formData.lastName}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-medium">Total:</span> ${total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-center">
        <WompiButton
          amount={total}
          orderNumber={`ORD-${Date.now()}`}
          customerEmail={formData.email}
          customerName={`${formData.firstName} ${formData.lastName}`}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="border-2 border-gray-600 text-white hover:bg-gray-800 hover:text-white"
        >
          Atrás
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:text-green-400 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Carrito
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Formulario de Checkout */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-2 border-green-400/30 luxury-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair font-bold text-white text-center">
                  {currentStep === 1 && "Información Personal"}
                  {currentStep === 2 && "Dirección de Envío"}
                  {currentStep === 3 && "Pago Seguro"}
                </CardTitle>
                
                {/* Indicador de pasos */}
                <div className="flex justify-center space-x-2 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-green-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <OrderSummary giftWrap={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
