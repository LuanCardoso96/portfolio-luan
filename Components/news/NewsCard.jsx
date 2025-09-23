import React from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function NewsCard({ news }) {
  const getTimeAgo = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { 
        addSuffix: true, 
        locale: ptBR 
      });
    } catch {
      return "Recente";
    }
  };

  const getCategoryBadge = (category) => {
    const badges = {
      marvel_dc: { label: "Marvel & DC", color: "bg-red-500 text-white", emoji: "⚡" },
      fofocas: { label: "Fofocas", color: "bg-pink-500 text-white", emoji: "🌟" }
    };
    return badges[category] || { label: "Notícia", color: "bg-gray-500 text-white", emoji: "📰" };
  };

  const handleClick = (e) => {
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'news_click', {
        news_title: news.title,
        news_category: news.category,
        news_source: news.source
      });
    }
  };

  const badge = getCategoryBadge(news.category);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {news.image_url && (
        <div className="relative overflow-hidden h-44">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className={`${badge.color} shadow-lg`}>
              <span className="mr-1">{badge.emoji}</span>
              {badge.label}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {getTimeAgo(news.pub_date)}
            </div>
          </div>
        </div>
      )}

      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {news.title}
        </h3>
        
        {news.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {news.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            {!news.image_url && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{getTimeAgo(news.pub_date)}</span>
              </div>
            )}
          </div>
          {news.source && (
            <span className="font-medium bg-gray-100 px-2 py-1 rounded-full">
              {news.source}
            </span>
          )}
        </div>

        <a
          href={news.url}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group-hover:gap-3"
        >
          Ler matéria completa
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </CardContent>
    </Card>
  );
}