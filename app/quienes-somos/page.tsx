import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Clock, Star, Crown, Truck } from "lucide-react"

export default function QuienesSomosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">Quienes Somos</h1>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>
            Somos una empresa comprometida en el servicio y atención al cliente contamos con años de experiencia en el diseño, 
            venta, comercialización de Canastas y Box para empresas y ejecutivos; elaboramos con una diversidad de productos 
            que se pueden adaptar al gusto de cada uno de nuestros clientes y personalizar sus obsequios a manera de que 
            puedan reflejar lo deseado.
          </p>
          
          <p>
            Nuestro principal objetivo es proporcionar a sus obsequios y presentes un toque de elegancia además de distinción 
            al personalizarlos, el plus que le ofrecemos es el servicio a domicilio, así usted podrá elegir cualquier diseño 
            de Canastas y Box navideños para empresas y ejecutivos desde nuestro catálogo online y optar por la cantidad 
            necesaria desde las comodidades de su oficina y hogar.
          </p>
          
          <p className="text-xl font-semibold text-yellow-600">
            ¡Brindamos un servicio único y totalmente excepcional!
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-bold text-black text-center mb-12">¿Por Qué Elegirnos?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Experiencia</h3>
              <p className="text-gray-600">
                Años de experiencia en el diseño y comercialización de canastas premium.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Elegancia</h3>
              <p className="text-gray-600">
                Cada producto refleja elegancia y distinción personalizada.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Servicio a Domicilio</h3>
              <p className="text-gray-600">
                Comodidad total desde su oficina u hogar con entrega directa.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Personalización</h3>
              <p className="text-gray-600">
                Adaptamos cada producto al gusto y necesidades de nuestros clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Specialization Section */}
      <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-12 text-center border-2 border-yellow-200">
        <h2 className="text-3xl font-serif font-bold text-black mb-6">Nuestra Especialización</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Canastas para Empresas</h3>
            <p className="text-gray-600">
              Soluciones corporativas elegantes para regalos empresariales y eventos corporativos.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Box para Ejecutivos</h3>
            <p className="text-gray-600">
              Productos premium diseñados para ejecutivos que buscan elegancia y distinción.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-serif font-bold text-black mb-4">
          ¿Listo para experimentar nuestro servicio excepcional?
        </h2>
        <p className="text-gray-600 mb-6">
          Descubra nuestra colección de canastas y box navideños premium
        </p>
        <a 
          href="/catalogo" 
          className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
          <Star className="w-5 h-5 mr-2" />
          Ver Catálogo
        </a>
      </div>
    </div>
  )
}
