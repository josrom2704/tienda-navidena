"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "./cart-provider";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div 
      className="group bg-white border-2 border-yellow-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay con información */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge de categoría */}
        <Badge className="absolute top-4 left-4 bg-yellow-500 text-white border-2 border-white font-bold px-3 py-1.5">
          {product.category}
        </Badge>

        {/* Botones de acción */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Botón de agregar al carrito */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al Carrito
          </Button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-serif font-bold text-black group-hover:text-yellow-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-yellow-600">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Stock: 15</span>
          </div>
        </div>
      </div>
    </div>
  );
}
