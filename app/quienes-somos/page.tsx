import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Clock } from "lucide-react"

export default function QuienesSomosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Quiénes Somos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Somos una empresa familiar dedicada a crear momentos especiales a través de regalos únicos y de calidad
          premium. Desde 2015, hemos sido parte de las celebraciones más importantes de nuestros clientes.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Todo comenzó en 2015 cuando María y Carlos decidieron convertir su pasión por los detalles especiales en
              un negocio familiar. Lo que inició como un pequeño taller de arreglos florales, se transformó en una
              empresa especializada en canastas navideñas y regalos premium.
            </p>
            <p>
              Nuestra filosofía siempre ha sido simple: cada regalo debe contar una historia y transmitir emociones
              genuinas. Por eso, seleccionamos cuidadosamente cada producto, desde los vinos más exquisitos hasta las
              flores más frescas.
            </p>
            <p>
              Hoy, después de casi una década, seguimos siendo una empresa familiar que valora la calidad, la atención
              personalizada y la satisfacción de nuestros clientes por encima de todo.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg?height=500&width=600"
            alt="Nuestro taller"
            className="w-full h-auto rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-4 rounded-lg shadow-lg">
            <div className="text-2xl font-bold">9+</div>
            <div className="text-sm">Años de experiencia</div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestros Valores</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión</h3>
              <p className="text-gray-600">
                Cada producto es creado con amor y dedicación para transmitir emociones genuinas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Calidad</h3>
              <p className="text-gray-600">
                Seleccionamos solo los mejores productos para garantizar la excelencia en cada regalo.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Familia</h3>
              <p className="text-gray-600">
                Somos una empresa familiar que trata a cada cliente como parte de nuestra familia.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compromiso</h3>
              <p className="text-gray-600">
                Nos comprometemos a entregar siempre en tiempo y forma, cumpliendo nuestras promesas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="María González"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">María González</h3>
              <p className="text-red-600 font-medium mb-3">Fundadora & Directora Creativa</p>
              <p className="text-gray-600 text-sm">
                Especialista en arreglos florales con más de 15 años de experiencia. Su visión artística define cada uno
                de nuestros productos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Carlos Rodríguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Carlos Rodríguez</h3>
              <p className="text-green-600 font-medium mb-3">Co-fundador & Director de Operaciones</p>
              <p className="text-gray-600 text-sm">
                Experto en logística y atención al cliente. Se encarga de que cada pedido llegue perfecto y a tiempo.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-8">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Ana Martínez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ana Martínez</h3>
              <p className="text-blue-600 font-medium mb-3">Especialista en Canastas Premium</p>
              <p className="text-gray-600 text-sm">
                Sommelier certificada y experta en productos gourmet. Selecciona personalmente cada vino y producto
                premium.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-red-50 to-green-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Crear experiencias memorables a través de regalos únicos y de calidad excepcional, conectando corazones y
          celebrando los momentos más especiales de la vida. Nos esforzamos por ser el puente entre tus sentimientos y
          las personas que amas.
        </p>
      </div>
    </div>
  )
}
