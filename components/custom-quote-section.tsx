"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Sparkles, Calendar, User, Phone } from "lucide-react"

const WHATSAPP_NUMBER = "+50370143259" // Configurable

export function CustomQuoteSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    descripcion: "",
    fechaEntrega: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Construir el mensaje de WhatsApp
    const mensaje = `🎄 *COTIZACIÓN ARREGLO PERSONALIZADO* 🎄

👤 *Nombre:* ${formData.nombre}
📱 *WhatsApp:* ${formData.whatsapp}
📅 *Fecha de entrega deseada:* ${formData.fechaEntrega}

🎁 *Descripción del arreglo:*
${formData.descripcion}

---
Enviado desde Canastas Navideñas -
✨ Regalos Navideños`

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form después de un delay
    setTimeout(() => {
      setFormData({
        nombre: "",
        whatsapp: "",
        descripcion: "",
        fechaEntrega: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid = formData.nombre && formData.whatsapp && formData.descripcion && formData.fechaEntrega

  return (
    <section
      id="cotizacion"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-gold-400/20 rounded-full animate-pulse bg-elegant-dark/50"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-gold-400/30 rounded-full animate-pulse delay-1000 bg-elegant-dark/50"></div>
      <div className="absolute top-1/2 left-20 w-2 h-2 bg-gold-400/40 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-32 w-1 h-1 bg-gold-400/60 rounded-full animate-ping delay-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-3 bg-gold-400/15 border border-gold-400/30 text-gold-300 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Servicio Personalizado
          </div>
          <h2 className="text-4xl lg:text-5xl title-elegant text-elegant-black mb-6">
            ¿Buscas algo <span className="text-gold-300">especial?</span>
          </h2>
          <p className="text-xl text-elegant-light max-w-3xl mx-auto font-light leading-relaxed">
            Cuéntanos qué deseas y lo creamos para ti. Nuestros especialistas diseñarán el arreglo perfecto según tus
            necesidades y presupuesto.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-8 fade-in-up">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-400/15 border border-gold-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xl title-elegant text-elegant-white mb-2">Diseño Exclusivo</h3>
                    <p className="text-elegant-light font-light leading-relaxed">
                      Creamos arreglos únicos adaptados a tus gustos, ocasión y presupuesto específico.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-400/15 border border-gold-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xl title-elegant text-elegant-white mb-2">Asesoría Personalizada</h3>
                    <p className="text-elegant-light font-light leading-relaxed">
                      Nuestros expertos te guiarán para crear el regalo perfecto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-400/15 border border-gold-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xl title-elegant text-elegant-white mb-2">Entrega Garantizada</h3>
                    <p className="text-elegant-light font-light leading-relaxed">
                      Coordinamos la entrega en la fecha que necesites con nuestro servicio .
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold-400/15 to-gold-600/15 border border-gold-400/30 rounded-2xl p-6">
                <h4 className="title-elegant font-semibold text-gold-300 mb-2">💎 Garantía de Calidad</h4>
                <p className="text-elegant-light text-sm font-light leading-relaxed">
                  Todos nuestros arreglos personalizados incluyen productos de calidad, empaque de alto nivel y tarjeta
                  personalizada sin costo adicional.
                </p>
              </div>
            </div>

            {/* Right side - Form */}
            <Card className="elegant-card scale-in">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl title-elegant text-elegant-black">Solicita tu Cotización</CardTitle>
                <p className="text-elegant-gray font-medium">Completa el formulario y te contactaremos por WhatsApp</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-elegant-black font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      className="form-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-elegant-black font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Número de WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      placeholder="+503 70656561"
                      className="form-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaEntrega" className="text-elegant-black font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha de Entrega Deseada
                    </Label>
                    <Input
                      id="fechaEntrega"
                      name="fechaEntrega"
                      type="date"
                      value={formData.fechaEntrega}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion" className="text-elegant-black font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      ¿Qué deseas incluir en tu arreglo?
                    </Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe detalladamente qué te gustaría incluir: tipo de productos, colores, ocasión, presupuesto aproximado, etc."
                      className="form-input resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full gold-button py-4 text-lg font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-elegant-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Enviar por WhatsApp
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-4 border-t border-gold-200">
                  <p className="text-sm text-elegant-gray font-medium">
                    Al enviar este formulario, serás redirigido a WhatsApp para continuar la conversación con nuestro
                    equipo de especialistas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-up">
          <div className="bg-gradient-to-r from-gold-400/10 via-gold-400/20 to-gold-400/10 border border-gold-400/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl title-elegant text-elegant-white mb-4">
              ¿Tienes dudas sobre nuestros productos?
            </h3>
            <p className="text-elegant-light font-medium mb-6 leading-relaxed">
              También puedes contactarnos directamente por WhatsApp para resolver cualquier pregunta sobre nuestro
              catálogo.
            </p>
            <Button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`, "_blank")}
              variant="outline"
              className="elegant-button px-8 py-3 font-medium"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chatear Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
