import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ p }: { p: any }) {
  const track = (id: string, url: string) => {
    (window as any).gtag?.("event","affiliate_click",{item_id:id,destination:url});
    setTimeout(() => window.open(url,"_blank"), 120);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {p.image && (
        <div className="aspect-square overflow-hidden">
          <img 
            src={p.image} 
            alt={p.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
      )}
      <CardContent className="space-y-3">
        <Badge className="bg-green-100 text-green-700">Afiliado</Badge>
        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{p.title}</h3>
        <p className="text-indigo-700 font-bold text-lg">{p.price}</p>
        <button 
          onClick={() => track(p.id, p.url)} 
          className="w-full px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
        >
          Comprar
        </button>
      </CardContent>
    </Card>
  );
}
