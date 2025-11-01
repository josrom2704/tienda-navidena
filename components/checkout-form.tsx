"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const handleSelectChange = (name: string, value: string) => {
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
      
      // Guardar el pedido antes de redirigir a Wompi
      const orderData = {
        orderNumber,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        total: total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.country, // Usando country como state por ahora
          zipCode: formData.postalCode,
          country: formData.country,
        },
        customerInfo: {
          email: formData.email,
          phone: formData.phone,
        },
        specialInstructions: formData.notes || '',
        giftWrap: false, // TODO: Agregar opción de gift wrap si la tienes
        giftMessage: '',
        status: 'pending',
      };

      // Guardar pedido en el backend/localStorage
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          console.log('✅ Pedido guardado exitosamente');
          
          // Guardar también en localStorage como backup
          localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData));
          
          // Guardar orderNumber para recuperar en la página de éxito
          localStorage.setItem('lastOrderNumber', orderNumber);
        }
      } catch (error) {
        console.error('Error guardando pedido:', error);
        // Guardar en localStorage como fallback
        localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData));
        localStorage.setItem('lastOrderNumber', orderNumber);
      }
      
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
    if (currentStep === 1) {
      // Solo validar campos del paso 1 (información personal)
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== ""
      );
    } else if (currentStep === 2) {
      // Validar campos del paso 2 (dirección)
      return (
        formData.address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.postalCode.trim() !== ""
      );
    }
    return true; // Paso 3 no requiere validación
  };

  const nextStep = () => {
    console.log('🔄 Intentando avanzar al siguiente paso...');
    console.log('📝 Paso actual:', currentStep);
    console.log('✅ Formulario válido:', isFormValid());
    console.log('📋 Datos del formulario:', formData);
    
    if (currentStep === 1 && isFormValid()) {
      console.log('✅ Avanzando del paso 1 al 2');
      setCurrentStep(2);
    } else if (currentStep === 2 && isFormValid()) {
      console.log('✅ Avanzando del paso 2 al 3');
      setCurrentStep(3);
    } else {
      console.log('❌ No se puede avanzar - formulario inválido');
      console.log('🔍 Campos faltantes:', {
        firstName: formData.firstName.trim() === "",
        lastName: formData.lastName.trim() === "",
        email: formData.email.trim() === "",
        phone: formData.phone.trim() === "",
        address: formData.address.trim() === "",
        city: formData.city.trim() === "",
        postalCode: formData.postalCode.trim() === ""
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-elegant-black font-medium">
            <User className="w-4 h-4 inline mr-2 text-gold-500" />
            Nombre
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-elegant-black font-medium">
            <User className="w-4 h-4 inline mr-2 text-gold-500" />
            Apellido
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Tu apellido"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-elegant-black font-medium">
          <Mail className="w-4 h-4 inline mr-2 text-gold-500" />
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-elegant-black font-medium">
          <Phone className="w-4 h-4 inline mr-2 text-gold-500" />
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="form-input"
          placeholder="+503 7123 4567"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={nextStep}
          disabled={!isFormValid()}
          className="gold-button"
        >
          {isFormValid() ? 'Continuar' : 'Completa los campos requeridos'}
        </Button>
        
        {/* Indicador de campos faltantes */}
        {!isFormValid() && currentStep === 1 && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {formData.firstName.trim() === "" && "• Nombre requerido "}
            {formData.lastName.trim() === "" && "• Apellido requerido "}
            {formData.email.trim() === "" && "• Email requerido "}
            {formData.phone.trim() === "" && "• Teléfono requerido"}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="address" className="text-elegant-black font-medium">
          <MapPin className="w-4 h-4 inline mr-2 text-gold-500" />
          Dirección
        </Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Dirección completa"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-elegant-black font-medium">Ciudad</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-input"
            placeholder="San Salvador"
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode" className="text-elegant-black font-medium">Código Postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="form-input"
            placeholder="01001"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country" className="text-elegant-black font-medium">País</Label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleSelectChange("country", value)}
        >
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Selecciona tu país" />
          </SelectTrigger>
          <SelectContent className="bg-elegant-white border-gold-400">
            <SelectItem value="El Salvador">El Salvador</SelectItem>
            <SelectItem value="Guatemala">Guatemala</SelectItem>
            <SelectItem value="Honduras">Honduras</SelectItem>
            <SelectItem value="Nicaragua">Nicaragua</SelectItem>
            <SelectItem value="Costa Rica">Costa Rica</SelectItem>
            <SelectItem value="Panamá">Panamá</SelectItem>
            <SelectItem value="México">México</SelectItem>
            <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
            <SelectItem value="Canadá">Canadá</SelectItem>
            <SelectItem value="España">España</SelectItem>
            <SelectItem value="Argentina">Argentina</SelectItem>
            <SelectItem value="Chile">Chile</SelectItem>
            <SelectItem value="Colombia">Colombia</SelectItem>
            <SelectItem value="Perú">Perú</SelectItem>
            <SelectItem value="Venezuela">Venezuela</SelectItem>
            <SelectItem value="Ecuador">Ecuador</SelectItem>
            <SelectItem value="Uruguay">Uruguay</SelectItem>
            <SelectItem value="Paraguay">Paraguay</SelectItem>
            <SelectItem value="Bolivia">Bolivia</SelectItem>
            <SelectItem value="Brasil">Brasil</SelectItem>
            <SelectItem value="Otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes" className="text-elegant-black font-medium">Notas Adicionales</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Instrucciones especiales para la entrega..."
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="elegant-button"
        >
          Atrás
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          className="gold-button"
        >
          {isFormValid() ? 'Continuar al Pago' : 'Completa los campos requeridos'}
        </Button>
      </div>
      
      {/* Indicador de campos faltantes */}
      {!isFormValid() && currentStep === 2 && (
        <div className="text-red-500 text-sm mt-2 text-center">
          {formData.address.trim() === "" && "• Dirección requerida "}
          {formData.city.trim() === "" && "• Ciudad requerida "}
          {formData.postalCode.trim() === "" && "• Código postal requerido"}
        </div>
      )}
    </div>
  );

const renderStep3 = () => {
  // Generar orderNumber una sola vez
  const orderNumber = `ORD-${Date.now()}`;
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-elegant-black mb-4 title-elegant">
          Resumen del Pedido
        </h3>
        <div className="bg-cream-100 p-4 rounded-lg border border-gold-200">
          <p className="text-elegant-gray mb-2">
            <span className="font-medium text-elegant-black">Cliente:</span> {formData.firstName} {formData.lastName}
          </p>
          <p className="text-elegant-gray mb-2">
            <span className="font-medium text-elegant-black">Email:</span> {formData.email}
          </p>
          <p className="text-elegant-gray mb-2">
            <span className="font-medium text-elegant-black">Total:</span> ${(total + (total >= 250 ? 0 : 3)).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-center">
        <WompiButton
          amount={total + (total >= 250 ? 0 : 3)} // ← CORREGIDO: Incluir envío
          orderNumber={orderNumber}
          customerEmail={formData.email}
          customerName={`${formData.firstName} ${formData.lastName}`}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          onBeforeRedirect={async () => {
            // Guardar el pedido ANTES de redirigir a Wompi
            const orderData = {
            orderNumber,
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })),
            total: total,
            shippingAddress: {
              name: `${formData.firstName} ${formData.lastName}`,
              address: formData.address,
              city: formData.city,
              state: formData.country,
              zipCode: formData.postalCode,
              country: formData.country,
            },
            customerInfo: {
              email: formData.email,
              phone: formData.phone,
            },
            specialInstructions: formData.notes || '',
            giftWrap: false,
            giftMessage: '',
            status: 'pending',
          };

          // Guardar pedido
          try {
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData),
            });
            
            // Guardar también en localStorage como backup
            localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData));
            localStorage.setItem('lastOrderNumber', orderNumber);
            
            console.log('✅ Pedido guardado antes de redirigir a Wompi');
          } catch (error) {
            console.error('Error guardando pedido:', error);
            // Guardar en localStorage como fallback
            localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData));
            localStorage.setItem('lastOrderNumber', orderNumber);
            }
          }
        }}
      />
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="elegant-button"
        >
          Atrás
        </Button>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-cream-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-elegant-black hover:text-gold-500 hover:bg-cream-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Carrito
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Formulario de Checkout */}
          <div className="lg:col-span-2">
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-2xl title-elegant text-elegant-black text-center">
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
                        step <= currentStep ? 'bg-gold-500' : 'bg-cream-300'
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
