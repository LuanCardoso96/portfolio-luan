import React, { useEffect, useState } from "react";
import { News } from "@/entities/News";
import { NewsCard } from "@/components/NewsCard";
import { AdSlot } from "@/components/AdSlot";

export default function NoticiasMarvel() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const news = await News.filter({ category: "marvel_dc" }, "-created_date", 12);
      setItems(news);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Marvel & <span className="text-red-600">DC</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          As últimas novidades do universo cinematográfico Marvel e DC Comics
        </p>
      </div>

      {/* Ad Slot */}
      <AdSlot size="728x90" label="Espaço Publicitário" />

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map((news) => (
          <NewsCard key={news.id} n={news} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Nenhuma notícia encontrada.</p>
        </div>
      )}
    </div>
  );
}
