import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { listPaged } from "./src/lib/firestoreRepo";
import { Search, Calendar, ExternalLink, Loader2, TrendingUp } from "lucide-react";
import { Input } from "./src/components/ui/input";
import { Button } from "./src/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/components/ui/Tabs";
import { Badge } from "./src/components/ui/Badge";
import { Card, CardContent } from "./src/components/ui/Card";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import AdSlot from "./Components/commom/AdSlot";
import NewsCard from "./Components/news/NewsCard";
import PromoRail from "./src/components/PromoRail";

export default function Noticias() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();
  const itemsPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [location.search]);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const { items } = await listPaged('noticias', 50);
      setNews(items);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    }
    setIsLoading(false);
  };

  const filterNews = useCallback(() => {
    let filtered = [...news];

    // Filtro por categoria
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.categoria === activeCategory);
    }

    // Filtro por busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.titulo.toLowerCase().includes(term) ||
        (item.descricao && item.descricao.toLowerCase().includes(term)) ||
        (item.fonte && item.fonte.toLowerCase().includes(term))
      );
    }

    setFilteredNews(filtered);
    setPage(1);
    setHasMore(filtered.length > itemsPerPage);
  }, [news, searchTerm, activeCategory]);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [filterNews]);

  const loadMoreNews = () => {
    const nextPage = page + 1;
    const maxItems = nextPage * itemsPerPage;
    setPage(nextPage);
    setHasMore(filteredNews.length > maxItems);
  };

  const getDisplayedNews = () => {
    return filteredNews.slice(0, page * itemsPerPage);
  };

  const getCategoryStats = () => {
    const stats = {
      all: news.length,
      marvel_dc: news.filter(n => n.category === "marvel_dc").length,
      fofocas: news.filter(n => n.category === "fofocas").length
    };
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Central de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Notícias</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades do mundo Marvel, DC e celebridades
          </p>
        </div>

        {/* PromoRail */}
        <PromoRail />

        {/* Ad Banner Top */}
        <AdSlot size="728x90" className="mx-auto mb-8" />

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="px-6 py-3 rounded-xl"
              disabled={!searchTerm}
            >
              Limpar
            </Button>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="all"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Todas ({categoryStats.all})
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="marvel_dc"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <div className="flex items-center gap-2">
                  ⚡ Marvel & DC ({categoryStats.marvel_dc})
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="fofocas"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <div className="flex items-center gap-2">
                  🌟 Fofocas ({categoryStats.fofocas})
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-gray-600">
            {searchTerm ? (
              <span>
                {filteredNews.length} resultado{filteredNews.length !== 1 ? 's' : ''} para "{searchTerm}"
              </span>
            ) : (
              <span>
                {filteredNews.length} notícia{filteredNews.length !== 1 ? 's' : ''} {activeCategory !== 'all' && `na categoria selecionada`}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Atualizado há poucos minutos
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma notícia encontrada</h3>
                <p>
                  {searchTerm
                    ? `Não encontramos notícias para "${searchTerm}". Tente outros termos de busca.`
                    : "Não há notícias disponíveis nesta categoria no momento."
                  }
                </p>
              </div>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Ver todas as notícias
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getDisplayedNews().map((newsItem) => (
                <NewsCard key={newsItem.id} news={newsItem} />
              ))}
            </div>

            {/* Ad Banner Middle */}
            <AdSlot size="300x250" className="mx-auto mb-8" />

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMoreNews}
                  size="lg"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  <Loader2 className="w-4 h-4 mr-2" />
                  Carregar mais notícias
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}