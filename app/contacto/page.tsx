"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Envíanos un Mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+503 7065-3259"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="asunto">Asunto</Label>
                <Input
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Cuéntanos más detalles sobre tu consulta..."
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg">
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+503 7014-3259</p>
                  <p className="text-sm text-gray-500">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Correo Electrónico</h3>
                  <p className="text-gray-600">contacto@tiendaderegaloselsalvador.com</p>
                  <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">123 Calle Principal</p>
                  <p className="text-gray-600">Ciudad, Estado 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horarios de Atención</h3>
                  <p className="text-gray-600">Lunes - Viernes: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sábados: 8:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Domingos: 8:00 AM - 12:00 PM</p>
                </div>

              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
              </div>
              <p className="text-gray-600 mb-4">
                ¿Necesitas ayuda inmediata? Contáctanos por WhatsApp para una respuesta rápida.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chatear en WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">¿Hacen entregas el mismo día?</h4>
                  <p className="text-sm text-gray-600">Sí, para pedidos realizados antes de las 2:00 PM.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">¿Puedo personalizar mi canasta?</h4>
                  <p className="text-sm text-gray-600">¡Por supuesto! Contáctanos para opciones personalizadas.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">¿Qué métodos de pago aceptan?</h4>
                  <p className="text-sm text-gray-600">Efectivo, tarjetas de crédito/débito y transferencias.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
