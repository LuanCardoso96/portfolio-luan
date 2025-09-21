import React, { useEffect, useState } from "react";
import { News } from "@/entities/News";
import { NewsCard } from "@/components/NewsCard";
import { AdSlot } from "@/components/AdSlot";
import { Search } from "lucide-react";

export default function Noticias() {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "marvel_dc" | "fofocas">("all");

  useEffect(() => {
    loadNews();
  }, [activeTab]);

  const loadNews = async () => {
    try {
      const filter = activeTab === "all" ? {} : { category: activeTab };
      const news = await News.filter(filter, "-created_date", 12);
      setItems(news);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    }
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Notícias do <span className="text-indigo-600">Dia</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          As últimas novidades sobre Marvel & DC e os bastidores do mundo das celebridades
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === "all" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("marvel_dc")}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === "marvel_dc" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Marvel & DC
          </button>
          <button
            onClick={() => setActiveTab("fofocas")}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === "fofocas" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Fofocas
          </button>
        </div>
      </div>

      {/* Ad Slot */}
      <AdSlot size="728x90" label="Espaço Publicitário" />

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map((news) => (
          <NewsCard key={news.id} n={news} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Nenhuma notícia encontrada.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredItems.length > 0 && (
        <div className="text-center">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors">
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
}