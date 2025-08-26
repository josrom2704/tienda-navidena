import { Crown, Truck, Shield, Star } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Crown className="w-8 h-8 text-yellow-500" />,
      title: "Productos de Alta Calidad",
      description: "Selección exclusiva de productos de la más alta calidad y prestigio"
    },
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: "Entrega Rápida",
      description: "Servicio de entrega premium con empaque elegante incluido"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Garantía Total",
      description: "100% de satisfacción garantizada o devolvemos tu dinero"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-500" />,
      title: "Personalización",
      description: "Arreglos únicos diseñados especialmente para cada ocasión"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las ventajas que nos hacen únicos en el mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white border-2 border-yellow-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-yellow-50 border-2 border-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
