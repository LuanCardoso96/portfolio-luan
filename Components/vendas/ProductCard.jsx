import React from "react";
import { ShoppingCart, ExternalLink, Star, Badge as BadgeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product, onAffiliateClick, featured = false }) {
  const handleClick = (e) => {
    e.preventDefault();
    onAffiliateClick(product);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-orange-500 text-white shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Destaque
          </Badge>
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <Badge className="bg-green-500 text-white shadow-lg">
          <BadgeIcon className="w-3 h-3 mr-1" />
          Afiliado
        </Badge>
      </div>

      {product.image_url && (
        <div className="relative overflow-hidden h-48 bg-gray-100">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1586040140449-5703e4b617c4?w=400&h=300&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-green-600">
            {product.price}
          </div>
          {product.category && (
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          )}
        </div>

        <Button
          onClick={handleClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition-all duration-300 group-hover:bg-orange-600 group-hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar na Shopee
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>

        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">
            🚚 Frete grátis • ⚡ Entrega rápida
          </span>
        </div>
      </CardContent>
    </Card>
  );
}