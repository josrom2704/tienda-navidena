"use client";

import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Star, Package, Truck, Shield } from "lucide-react";
import { objectIdToNumber } from "@/lib/id";
import { ProductLoadingSkeleton } from "@/components/loading-skeleton";

// ✅ OPTIMIZACIÓN: Lazy loading de componentes pesados
const ProductCard = lazy(() => import("@/components/product-card").then(module => ({ default: module.ProductCard })));

type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  imagen?: string;
  categoria: string;
  stock?: number;
};

export default function CatalogoPage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const dominio = useDominio();
  const { getProductosAll } = useApi();

  // ✅ OPTIMIZACIÓN: Memoizar la función de carga
  const fetchProducts = useCallback(async () => {
    if (!dominio) return;

    try {
      setLoading(true);
      const data = await getProductosAll(dominio);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [dominio, getProductosAll]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ OPTIMIZACIÓN: Memoizar el filtrado de productos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filtro por rango de precio
    filtered = filtered.filter(product => {
      const price = typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      const priceA = typeof a.precio === 'string' ? parseFloat(a.precio) : a.precio;
      const priceB = typeof b.precio === 'string' ? parseFloat(b.precio) : b.precio;
      
      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "name":
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  // ✅ OPTIMIZACIÓN: Memoizar las categorías
  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.categoria))), 
    [products]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
              Nuestro <span className="text-yellow-500">Catálogo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra exclusiva colección de productos navideños
            </p>
          </div>
          
          <ProductLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-black mb-8">Nuestro Catálogo</h1>
          <p className="text-red-500 text-lg mb-8">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de Nuevo
          </Button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-black mb-6">Nuestro Catálogo</h1>
          <div className="text-yellow-500 text-6xl mb-4">🌸</div>
          <p className="text-xl text-gray-600 mb-8">
            No hay productos disponibles en este momento.
          </p>
          <p className="text-gray-500">Los productos aparecerán aquí una vez que sean agregados desde el panel de administración.</p>
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
            Nuestro <span className="text-yellow-500">Catálogo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra exclusiva colección de productos navideños, canastas de lujo y regalos premium
        </p>
      </div>

        {/* Filtros y controles */}
        <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 mb-12 shadow-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-yellow-200 focus:border-yellow-400"
              />
            </div>

            {/* Categoría */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-yellow-200 focus:border-yellow-400">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ordenamiento */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-yellow-200 focus:border-yellow-400">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              </SelectContent>
            </Select>

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

          {/* Rango de precio */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Rango de precio:</span>
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-24 border-yellow-200 focus:border-yellow-400"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24 border-yellow-200 focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-4 h-4" />
              <span className="text-sm">Productos Premium</span>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <Suspense key={product._id} fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
                <ProductCard
                  product={{
                    id: objectIdToNumber(product._id),
                    name: product.nombre,
                    description: product.descripcion ?? "",
                    price: typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio,
                    image: product.imagen || "/placeholder.svg?height=300&width=300",
                    category: product.categoria,
                  }}
                />
              </Suspense>
            ))}
        </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-yellow-500 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-black mb-4">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar los filtros de búsqueda
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange([0, 1000]);
              }}
              variant="outline"
              className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              Limpiar Filtros
            </Button>
        </div>
      )}

        {/* Información adicional */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Package className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Productos Premium</h3>
            <p className="text-gray-600">Calidad excepcional en cada detalle</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Truck className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Envío Rápido</h3>
            <p className="text-gray-600">Entrega en 24-48 horas</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Shield className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-black mb-2">Garantía Total</h3>
            <p className="text-gray-600">Satisfacción 100% garantizada</p>
          </div>
        </div>
      </div>
    </div>
  );
}
