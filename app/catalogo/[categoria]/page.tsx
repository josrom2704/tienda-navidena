"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Star, Package, Truck, Shield, ArrowLeft } from "lucide-react";
import { objectIdToNumber } from "@/lib/id";
import Link from "next/link";

type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  imagen?: string;
  categoria: string;
  stock?: number;
};

interface CategoriaPageProps {
  params: {
    categoria: string;
  };
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const [products, setProducts] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const dominio = useDominio();
  const { getProductosByCategoria } = useApi();
  const categoriaSlug = decodeURIComponent(params.categoria);

  useEffect(() => {
    if (!dominio) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductosByCategoria(dominio, categoriaSlug);
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar productos de esta categoría');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dominio, categoriaSlug, getProductosByCategoria]);

  useEffect(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
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

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
              Categoría: <span className="text-yellow-500">{categoriaSlug}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra colección de {categoriaSlug.toLowerCase()}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg h-96 border border-yellow-200 shadow-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-black mb-8">Categoría: {categoriaSlug}</h1>
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
          <h1 className="text-4xl font-serif font-bold text-black mb-6">Categoría: {categoriaSlug}</h1>
          <div className="text-yellow-500 text-6xl mb-4">🌸</div>
          <p className="text-xl text-gray-600 mb-8">
            No hay productos disponibles en esta categoría en este momento.
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
          <div className="mb-6">
            <Link href="/catalogo" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Catálogo
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
            Categoría: <span className="text-yellow-500">{categoriaSlug}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra exclusiva colección de {categoriaSlug.toLowerCase()}
          </p>
        </div>

        {/* Filtros y controles */}
        <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 mb-12 shadow-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
              Mostrando {filteredProducts.length} de {products.length} productos en {categoriaSlug}
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
              <ProductCard
                key={product._id}
                product={{
                  id: objectIdToNumber(product._id),
                  name: product.nombre,
                  description: product.descripcion ?? "",
                  price: typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio,
                  image: product.imagen || "/placeholder.svg?height=300&width=300",
                  category: product.categoria,
                }}
              />
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

