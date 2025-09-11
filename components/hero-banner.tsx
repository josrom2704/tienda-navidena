import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Star, Crown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración de partículas
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 40;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      angle: number;
    }> = [];

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Verificar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate() {
      if (prefersReducedMotion || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Actualizar posición
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 0.5;
        particle.angle += 0.02;

        // Reiniciar si sale de la pantalla
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.x = Math.random() * canvas.width;
        }

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#C7A44B';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Iniciar animación
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
      {/* Canvas para partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-90" style={{ zIndex: 2 }}></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-3" style={{ zIndex: 2 }}></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400/20 rounded-full animate-pulse bg-white/50" style={{ zIndex: 3 }}></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-400/30 rounded-full animate-pulse delay-1000 bg-white/50" style={{ zIndex: 3 }}></div>
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ zIndex: 3 }}></div>
      <div className="absolute top-1/3 right-32 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500" style={{ zIndex: 3 }}></div>

      <div className="relative container mx-auto px-4 py-20" style={{ zIndex: 4 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 fade-in-up">
            <div className="space-y-6">
              {/* Ornamento SVG dorado */}
              <div className="flex justify-center mb-4">
                <div 
                  className="ornament-container hover:ornament-hover transition-all duration-300 cursor-pointer"
                  role="img"
                  aria-label="Ornamento navideño dorado"
                >
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="ornament-svg"
                  >
                    <path 
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                      fill="#C7A44B"
                    />
                    <path 
                      d="M12 18L13.09 20.26L20 21L13.09 21.74L12 24L10.91 21.74L4 21L10.91 20.26L12 18Z" 
                      fill="#C7A44B"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 flex-col sm:flex-row">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <span className="text-yellow-500 font-light uppercase tracking-[0.2em] text-sm">
                    Navidades 2025
                  </span>
                </div>
                
                {/* Mini CTA discreto */}
                <Link 
                  href="#catalogo"
                  className="mini-cta text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group"
                  aria-label="Ver ofertas exclusivas de Navidad"
                >
                  🎁 Ver ofertas exclusivas
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif leading-tight">
                <span className="text-black">Regala </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  momentos
                </span>
                <br />
                <span className="text-yellow-500"> inolvidables</span>
                <br />
                <span className="text-black">esta Navidad</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-light max-w-xl">
                Descubre nuestra exclusiva colección de canastas navideñas de lujo, arreglos florales únicos y regalos
                premium que transformarán esta temporada en algo verdaderamente extraordinario.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/catalogo">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 text-lg font-medium tracking-wide">
                  <Gift className="w-5 h-5 mr-3" />
                  Explorar Colección
                </Button>
              </Link>
              <Link href="/catalogo/canastas-vino">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300"
                >
                  <Star className="w-5 h-5 mr-3" />
                  Canastas Navideñas
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-yellow-500">500+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Productos Exclusivos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-yellow-500">24h</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Entrega Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-yellow-500">⭐ 5.0</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Calificación</div>
              </div>
            </div>
          </div>

          <div className="relative scale-in">
            <div className="relative z-10">
              <div className="w-full h-[700px] bg-gradient-to-br from-white to-gray-100 rounded-2xl border-2 border-yellow-200 flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/canasta-premium.jpg"
                  alt="Canasta Premium de Frutas y Regalos Navideños"
                  width={600}
                  height={700}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-3xl">🎄</span>
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute top-1/2 -left-6 w-16 h-16 bg-white border-2 border-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-md">
                <span className="text-xl">🎁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
