import React from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Switch } from '../ui/Switch'
import { Label } from '../ui/label'
import { 
  Newspaper, 
  Trash2, 
  RefreshCw, 
  Loader2,
  Image as ImageIcon 
} from 'lucide-react'

export default function NewsList({ 
  news = [], 
  onDelete, 
  onFetchNews, 
  isAutoFetchEnabled, 
  onToggleAutoFetch,
  isLoading = false 
}) {
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'marvel_dc':
        return <Badge variant="indigo">Marvel & DC</Badge>
      case 'fofocas':
        return <Badge variant="purple">Fofocas</Badge>
      default:
        return <Badge variant="default">Geral</Badge>
    }
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Tem certeza que deseja excluir a notícia "${title}"?`)) {
      onDelete(id)
    }
  }

  return (
    <Card 
      title="Notícias Recentes" 
      icon={Newspaper}
      actions={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="auto-fetch" className="text-sm text-gray-600">
              Busca Automática
            </Label>
            <Switch
              id="auto-fetch"
              checked={isAutoFetchEnabled}
              onCheckedChange={onToggleAutoFetch}
            />
          </div>
          <Button
            onClick={onFetchNews}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Buscar Notícias
          </Button>
        </div>
      }
    >
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {news.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma notícia encontrada</p>
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-start p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full flex items-center justify-center text-gray-400"
                  style={{ display: item.image_url ? 'none' : 'flex' }}
                >
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  {getCategoryBadge(item.category)}
                  <span className="text-xs text-gray-500">{item.source}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item.id, item.title)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
