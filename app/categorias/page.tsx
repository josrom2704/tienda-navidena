"use client";

import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wine, 
  Package, 
  Gift, 
  Heart, 
  Apple, 
  Flower, 
  Sprout, 
  Sparkles,
  Grid3X3,
  List,
  Star,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { CategoryLoadingSkeleton } from "@/components/loading-skeleton";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const dominio = useDominio();
  const { getCategoriasByDominio } = useApi();

  useEffect(() => {
    if (!dominio) return;

    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const data = await getCategoriasByDominio(dominio);
        setCategorias(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [dominio, getCategoriasByDominio]);

  // ✅ OPTIMIZACIÓN: Memoizar el mapeo de iconos
  const getCategoryIcon = useMemo(() => (categoria: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Canastas con vino': <Wine className="w-8 h-8 text-red-500" />,
      'Canastas con whisky': <Wine className="w-8 h-8 text-amber-600" />,
      'Canastas sin licor': <Package className="w-8 h-8 text-blue-500" />,
      'Regalos navideños': <Gift className="w-8 h-8 text-green-500" />,
      'Detalles pequeños': <Heart className="w-8 h-8 text-pink-500" />,
      'Canastas frutales': <Apple className="w-8 h-8 text-red-600" />,
      'Flores': <Flower className="w-8 h-8 text-purple-500" />,
      'Ramos': <Sprout className="w-8 h-8 text-rose-500" />
    };
    return iconMap[categoria] || <Sparkles className="w-8 h-8 text-yellow-500" />;
  }, []);

  // ✅ OPTIMIZACIÓN: Memoizar el mapeo de slugs
  const getCategorySlug = useMemo(() => (categoria: string) => {
    const slugMap: { [key: string]: string } = {
      'Canastas con vino': 'canastas-con-vino',
      'Canastas con whisky': 'canastas-con-whisky',
      'Canastas sin licor': 'canastas-sin-licor',
      'Regalos navideños': 'regalos-navidenos',
      'Detalles pequeños': 'detalles-pequenos',
      'Canastas frutales': 'canastas-frutales',
      'Flores': 'flores',
      'Ramos': 'ramos'
    };
    return slugMap[categoria] || categoria.toLowerCase().replace(/\s+/g, '-');
  }, []);

  // ✅ OPTIMIZACIÓN: Memoizar las descripciones
  const getCategoryDescription = useMemo(() => (categoria: string) => {
    const descriptions: { [key: string]: string } = {
      'Canastas con vino': 'Elegantes canastas acompañadas de los mejores vinos para ocasiones especiales',
      'Canastas con whisky': 'Canastas premium con whisky de alta calidad para momentos únicos',
      'Canastas sin licor': 'Hermosas canastas sin alcohol, perfectas para toda la familia',
      'Regalos navideños': 'Productos especiales para hacer de la Navidad un momento mágico',
      'Detalles pequeños': 'Regalos delicados y especiales para ocasiones íntimas',
      'Canastas frutales': 'Canastas frescas con las mejores frutas de temporada',
      'Flores': 'Hermosas flores frescas para cualquier ocasión especial',
      'Ramos': 'Ramos elegantes y bien diseñados para regalar'
    };
    return descriptions[categoria] || 'Descubre nuestra selección especial de productos';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
              Nuestras <span className="text-yellow-500">Categorías</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora nuestra amplia gama de productos organizados por categorías
            </p>
          </div>
          
          <CategoryLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-black mb-8">Nuestras Categorías</h1>
          <p className="text-red-500 text-lg mb-8">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de Nuevo
          </Button>
        </div>
      </div>
    );
  }

  if (categorias.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-black mb-6">Nuestras Categorías</h1>
          <div className="text-yellow-500 text-6xl mb-4">🌸</div>
          <p className="text-xl text-gray-600 mb-8">
            No hay categorías disponibles en este momento.
          </p>
          <p className="text-gray-500">Las categorías aparecerán aquí una vez que sean agregadas desde el panel de administración.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
            Nuestras <span className="text-yellow-500">Categorías</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra amplia gama de productos organizados por categorías especiales
          </p>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
              {categorias.length} Categorías
            </Badge>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-4 h-4" />
              <span className="text-sm">Categorías Premium</span>
            </div>
          </div>

          {/* Vista */}
          <div className="flex border border-yellow-200 rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`rounded-none ${viewMode === "grid" ? "bg-yellow-500 text-white" : "text-gray-600"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`rounded-none ${viewMode === "list" ? "bg-yellow-500 text-white" : "text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Grid de categorías */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {categorias.map((categoria) => (
            <Card key={categoria} className="group hover:shadow-xl transition-all duration-300 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {getCategoryIcon(categoria)}
                </div>
                <CardTitle className="text-xl font-serif text-black group-hover:text-yellow-600 transition-colors">
                  {categoria}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6">
                  {getCategoryDescription(categoria)}
                </CardDescription>
                <Link href={`/catalogo/${getCategorySlug(categoria)}`}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white group-hover:shadow-lg transition-all duration-300">
                    Ver Productos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Package className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Categorías Especializadas</h3>
            <p className="text-gray-600">Cada categoría cuidadosamente curada</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Productos Premium</h3>
            <p className="text-gray-600">Calidad excepcional en cada detalle</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Regalos Perfectos</h3>
            <p className="text-gray-600">Encuentra el regalo ideal para cada ocasión</p>
          </div>
        </div>
      </div>
    </div>
  );
}
