"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { buildImageUrl } from "@/lib/imagenes";
import "@/styles/globals.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const normalizedImage = buildImageUrl(product.image);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: normalizedImage,
      quantity: 1,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group product-card overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={normalizedImage}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-elegant-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-gold-500 text-elegant-white font-bold px-3 py-1.5 border-0">
            ⭐ Exclusivo
          </Badge>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-elegant-black/90 text-gold-400 border-2 border-gold-400 font-bold px-3 py-1.5">
            -{discount}%
          </Badge>
        )}

        {/* Heart button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 ${discount > 0 ? "top-16" : ""} bg-elegant-white/90 hover:bg-elegant-white transition-all duration-300 ${isLiked ? "text-red-500" : "text-elegant-gray"}`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label={isLiked ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>

        {/* Add to cart overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            onClick={handleAddToCart}
            className="gold-button px-8 py-3 font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al Carrito
          </Button>
        </div>
      </div>

      <CardContent className="p-6 bg-elegant-white text-elegant-black">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-gold-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
          ))}
          <span className="text-sm text-elegant-gray ml-2 font-medium">(4.9)</span>
        </div>

        {/* Product name */}
        <h3 className="text-xl title-elegant text-elegant-black mb-3 group-hover:text-gold-500 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-elegant-gray text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl title-elegant text-gold-500">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-elegant-gray line-through font-medium">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Badge
            variant="outline"
            className="text-xs border-2 border-gold-400 text-gold-500 bg-gold-50/10 font-bold"
          >
            {product.category}
          </Badge>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          className="w-full gold-button py-3 font-medium tracking-wide"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
}
