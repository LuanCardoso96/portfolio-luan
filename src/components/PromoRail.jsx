import React from 'react'
import { listPaged } from '../lib/firestoreRepo'

export default function PromoRail() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    (async () => {
      try {
        const { items } = await listPaged('vendas', 10)
        setItems(items)
      } catch (error) {
        console.error('Erro ao carregar promoções:', error)
      }
    })()
  }, [])

  if (!items.length) return null

  return (
    <div className="mb-6 overflow-hidden">
      <div className="flex gap-4 animate-[scroll_35s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map(p => (
          <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
             className="min-w-[260px] max-w-[260px] bg-white rounded-xl border shadow-sm flex gap-3 items-center p-3 hover:shadow-md transition">
            {p.imagem && <img src={p.imagem} className="w-16 h-16 rounded-lg object-cover" alt={p.titulo} />}
            <div className="text-sm font-semibold line-clamp-2">{p.titulo}</div>
          </a>
        ))}
        {/* duplica para loop */}
        {items.map((p,i) => (
          <a key={`dup-${i}`} href={p.url} target="_blank" rel="noopener noreferrer"
             className="min-w-[260px] max-w-[260px] bg-white rounded-xl border shadow-sm flex gap-3 items-center p-3 hover:shadow-md transition">
            {p.imagem && <img src={p.imagem} className="w-16 h-16 rounded-lg object-cover" alt={p.titulo} />}
            <div className="text-sm font-semibold line-clamp-2">{p.titulo}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
