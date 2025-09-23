import React from "react";
import { ExternalLink, Calendar } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function NewsHighlight({ news }) {
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
      marvel_dc: { label: "Marvel & DC", color: "bg-red-100 text-red-700" },
      fofocas: { label: "Fofocas", color: "bg-pink-100 text-pink-700" }
    };
    return badges[category] || { label: "Notícia", color: "bg-gray-100 text-gray-700" };
  };

  const badge = getCategoryBadge(news.category);

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {news.image_url && (
        <div className="relative overflow-hidden h-40">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>
        
        {news.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {news.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{getTimeAgo(news.pub_date)}</span>
          </div>
          {news.source && (
            <span className="font-medium">{news.source}</span>
          )}
        </div>

        <a
          href={news.url}
          target="_blank"
          rel="noopener nofollow"
          className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
        >
          Ler mais
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}