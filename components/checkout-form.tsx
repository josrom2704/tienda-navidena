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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento del pedido
    setTimeout(() => {
      const orderNumber = `ORD-${Date.now()}`;
      clearCart();
      onSuccess(orderNumber);
      setIsProcessing(false);
    }, 2000);
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de Checkout */}
          <div>
            <Card className="bg-gray-900 border-2 border-green-400/30 luxury-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair font-bold text-white text-center">
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="bg-gray-800 border-gray-600 text-white"
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
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

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
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white">
                        Ciudad
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-white">
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-white">
                        País
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white">
                      Notas Adicionales
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 text-white"
                      rows={3}
                      placeholder="Instrucciones especiales para la entrega..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid() || isProcessing}
                    className="w-full luxury-button py-4 text-lg font-medium tracking-wide"
                    size="lg"
                  >
                    {isProcessing ? (
                      "Procesando..."
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Completar Pedido
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <div>
            <OrderSummary giftWrap={false} />
            
            {/* Botón de Wompi */}
            <div className="mt-6">
              <WompiButton
                amount={total}
                orderNumber={`ORD-${Date.now()}`}
                customerEmail={formData.email}
                customerName={`${formData.firstName} ${formData.lastName}`}
                onPaymentSuccess={(transactionId) => {
                  const orderNumber = `ORD-${Date.now()}`;
                  clearCart();
                  onSuccess(orderNumber);
                }}
                onPaymentError={(error) => {
                  console.error("Error en Wompi:", error);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
