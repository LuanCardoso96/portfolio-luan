import React, { useEffect, useState } from "react";
import { Product } from "@/entities/Product";
import { ProductCard } from "@/components/ProductCard";
import { AdSlot } from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";

export default function Vendas(){
  const [items, setItems] = useState<any[]>([]);
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);

  useEffect(() => { 
    (async () => { 
      const allProducts = await Product.filter({}, "-created_date", 24);
      const featured = await Product.filter({ is_featured: true }, "-created_date", 6);
      setItems(allProducts);
      setFeaturedItems(featured);
    })(); 
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Produtos <span className="text-green-600">Afiliados</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Produtos selecionados com qualidade garantida e preços especiais
        </p>
        <Badge className="mt-4 bg-green-100 text-green-700">
          💰 Links de afiliado - Você ajuda a manter o site funcionando
        </Badge>
      </div>

      {/* Featured Products */}
      {featuredItems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Produtos em <span className="text-indigo-600">Destaque</span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {featuredItems.map(p => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {/* Ad Slot */}
      <AdSlot size="728x90" label="Espaço Publicitário" />

      {/* All Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Todos os <span className="text-indigo-600">Produtos</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Nenhum produto encontrado.</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-slate-50 rounded-xl p-6 mt-12">
        <h3 className="font-semibold text-slate-900 mb-3">ℹ️ Sobre os Links de Afiliado</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Este site contém links de afiliado. Quando você clica em um produto afiliado e faz uma compra, 
          recebemos uma pequena comissão sem custo adicional para você. Isso nos ajuda a manter o site 
          funcionando e continuar criando conteúdo de qualidade. Obrigado pelo seu apoio!
        </p>
      </div>
    </div>
  )
}
