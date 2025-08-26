import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift, Star, Crown, Sparkles } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-cream-50 min-h-screen flex items-center">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-elegant-white to-cream-100 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-3"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-gold-400/20 rounded-full animate-pulse bg-elegant-white/50"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold-400/30 rounded-full animate-pulse delay-1000 bg-elegant-white/50"></div>
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-gold-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-32 w-1 h-1 bg-gold-400 rounded-full animate-ping delay-500"></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-gold-500" />
                <span className="text-gold-500 font-light uppercase tracking-[0.2em] text-sm">
                  Navidades 2025
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl title-elegant leading-tight">
                <span className="text-elegant-black">Regala </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  momentos
                </span>
                <br />
                <span className="text-gold-500"> inolvidables</span>
                <br />
                <span className="text-elegant-black">esta Navidad</span>
              </h1>

              <p className="text-xl text-elegant-gray leading-relaxed font-light max-w-xl">
                Descubre nuestra exclusiva colección de canastas navideñas de lujo, arreglos florales únicos y regalos
                premium que transformarán esta temporada en algo verdaderamente extraordinario.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/catalogo">
                <Button size="lg" className="gold-button px-10 py-4 text-lg font-medium tracking-wide">
                  <Gift className="w-5 h-5 mr-3" />
                  Explorar Colección
                </Button>
              </Link>
              <Link href="/catalogo/canastas-vino">
                <Button
                  variant="outline"
                  size="lg"
                  className="elegant-button px-10 py-4 text-lg font-medium tracking-wide"
                >
                  <Star className="w-5 h-5 mr-3" />
                  Canastas Navideñas
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl title-elegant text-gold-500">500+</div>
                <div className="text-sm text-elegant-gray uppercase tracking-wide">Productos Exclusivos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl title-elegant text-gold-500">24h</div>
                <div className="text-sm text-elegant-gray uppercase tracking-wide">Entrega Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl title-elegant text-gold-500">⭐ 5.0</div>
                <div className="text-sm text-elegant-gray uppercase tracking-wide">Calificación</div>
              </div>
            </div>
          </div>

          <div className="relative scale-in">
            <div className="relative z-10">
              <div className="w-full h-[700px] bg-elegant-gradient rounded-2xl elegant-glow border border-gold-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-gold-400 mx-auto" />
                  <p className="text-elegant-gray text-lg">Imagen de Canasta Premium</p>
                  <p className="text-elegant-gray text-sm">Lugar para imagen destacada</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center elegant-glow animate-bounce">
              <span className="text-3xl">🎄</span>
            </div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-gold-600 to-gold-400 rounded-full flex items-center justify-center elegant-glow animate-bounce delay-1000">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute top-1/2 -left-6 w-16 h-16 bg-elegant-white border-2 border-gold-400 rounded-full flex items-center justify-center animate-pulse shadow-elegant">
              <span className="text-xl">🎁</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
