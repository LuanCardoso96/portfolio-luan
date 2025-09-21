import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NewsCard({ n }: { n: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {n.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={n.image_url} 
            alt={n.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
      )}
      <CardContent className="space-y-3">
        <Badge className={n.category==='marvel_dc'?'bg-red-100 text-red-700':'bg-pink-100 text-pink-700'}>
          {n.category==='marvel_dc'?'Marvel & DC':'Fofocas'}
        </Badge>
        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{n.title}</h3>
        {n.summary && <p className="text-slate-600 text-sm line-clamp-3">{n.summary}</p>}
        <a 
          className="text-indigo-600 text-sm font-medium inline-flex items-center gap-1 hover:text-indigo-700 transition-colors" 
          href={n.source} 
          target="_blank" 
          rel="noopener nofollow"
        >
          Ler mais →
        </a>
      </CardContent>
    </Card>
  );
}
