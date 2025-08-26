import { Truck, Shield, Crown, Sparkles } from "lucide-react"

const features = [
  {
    icon: Crown,
    title: "Productos de Alta Calidad",
    description: "Selección exclusiva de productos de la más alta calidad y prestigio.",
    color: "text-gold-500",
  },
  {
    icon: Truck,
    title: "Entrega Rapida",
    description: "Servicio de entrega premium con empaque elegante incluido.",
    color: "text-green-500",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "100% de satisfacción garantizada o devolvemos tu dinero.",
    color: "text-blue-500",
  },
  {
    icon: Sparkles,
    title: "Personalización",
    description: "Arreglos únicos diseñados especialmente para cada ocasión.",
    color: "text-purple-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-elegant-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl title-elegant text-elegant-white mb-6">
            ¿Por qué <span className="text-gold-400">elegirnos?</span>
          </h2>
          <p className="text-xl text-elegant-light max-w-3xl mx-auto font-light leading-relaxed">
            Nos comprometemos a brindarte la experiencia más exclusiva en regalos navideños.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-elegant-dark border-2 border-gold-400/20 rounded-full mb-6 group-hover:border-gold-400 group-hover:elegant-glow transition-all duration-300 ${feature.color}`}
              >
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl title-elegant text-elegant-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-elegant-light font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
