import React from 'react'
import { listPaged } from '../lib/firestoreRepo'
import PromoRail from '../components/PromoRail'

function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition">
      {news.imagem && (
        <img src={news.imagem} alt={news.titulo} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{news.titulo}</h3>
        {news.descricao && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.descricao}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
            {news.categoria}
          </span>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
          >
            Ler mais →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Fofocas() {
  const [news, setNews] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadFofocas() {
      try {
        const { items } = await listPaged('noticias', 20, null)
        // Filtrar apenas fofocas
        const fofocas = items.filter(item => item.categoria === 'Fofocas')
        setNews(fofocas)
      } catch (error) {
        console.error('Erro ao carregar fofocas:', error)
      }
      setLoading(false)
    }
    
    loadFofocas()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Fofocas</h1>
      <p className="text-gray-600 mb-6">As últimas fofocas sobre celebridades e entretenimento.</p>
      
      <PromoRail />
      
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border p-4 shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Nenhuma fofoca cadastrada ainda.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  )
}
