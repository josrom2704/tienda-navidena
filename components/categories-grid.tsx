// /components/categories-grid.tsx
"use client";

import { useApi } from '@/hooks/useApi';
import { useDominio } from '@/hooks/useDominio';
import { useEffect, useState } from 'react';
import { Wine, Gift, Apple, Flower, Sprout, Package, Sparkles, Heart } from 'lucide-react';

interface CategoryCardProps {
  categoria: string;
  icon: React.ReactNode;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoria, icon, description }) => {
  const slug = categoria
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áéíóúüñ]/g, (match) => {
      const accents: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u', 'ñ': 'n'
      };
      return accents[match] || match;
    });

  return (
    <a
      href={`/catalogo/${slug}`}
      className="group block bg-gradient-to-b from-gray-100 to-black rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
    >
      <div className="relative p-6 text-center">
        {/* Icono personalizado */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
          {categoria}
        </h3>
        
        {/* Descripción */}
        <p className="text-sm text-white/80 group-hover:text-white/70 transition-colors duration-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export function CategoriesGrid() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dominio = useDominio();
  const { getCategoriasByDominio } = useApi();

  useEffect(() => {
    if (!dominio) return;

    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const data = await getCategoriasByDominio(dominio);
        
        // 🔍 LOG TEMPORAL PARA DEBUGGING
        console.log("🔍 [DEBUG] Categorías recibidas del backend:", data);
        console.log("🔍 [DEBUG] Tipo de datos:", typeof data);
        console.log("🔍 [DEBUG] Es array:", Array.isArray(data));
        console.log("🔍 [DEBUG] Longitud:", Array.isArray(data) ? data.length : 'N/A');
        
        setCategorias(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error('Error fetching categorías:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [dominio, getCategoriasByDominio]);

  // ✅ Mapeo de iconos personalizados para cada categoría
  const getCategoryIcon = (categoria: string) => {
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
  };

  // ✅ Descripciones personalizadas para cada categoría
  const getCategoryDescription = (categoria: string) => {
    const descriptionMap: { [key: string]: string } = {
      'Canastas con vino': 'Descubre nuestra selección especial de canastas con vino',
      'Canastas con whisky': 'Descubre nuestra selección especial de canastas con whisky',
      'Canastas sin licor': 'Descubre nuestra selección especial de canastas sin licor',
      'Regalos navideños': 'Descubre nuestra selección especial de regalos navideños',
      'Detalles pequeños': 'Descubre nuestra selección especial de detalles pequeños',
      'Canastas frutales': 'Descubre nuestra selección especial de canastas frutales',
      'Flores': 'Descubre nuestra selección especial de flores',
      'Ramos': 'Descubre nuestra selección especial de ramos'
    };

    return descriptionMap[categoria] || 'Descubre nuestra selección especial';
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gradient-to-b from-gray-100 to-black rounded-lg border border-white/20 p-6 animate-pulse">
                <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-4"></div>
                <div className="bg-white/10 h-6 rounded mb-2"></div>
                <div className="bg-white/10 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Nuestras Categorías</h2>
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  if (categorias.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Nuestras Categorías</h2>
          <p className="text-gray-400 text-lg">No hay categorías disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Nuestras Categorías
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorias.map((categoria) => (
            <CategoryCard
              key={categoria}
              categoria={categoria}
              icon={getCategoryIcon(categoria)}
              description={getCategoryDescription(categoria)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
