import React from 'react'
import { listPaged } from './src/lib/firestoreRepo'

function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition">
      {p.imagem && <img src={p.imagem} alt={p.titulo} className="w-full h-44 object-cover" />}
      <div className="p-4">
        <h3 className="font-bold">{p.titulo}</h3>
        {p.preco && <div className="text-indigo-600 font-semibold mt-1">{p.preco}</div>}
        <a href={p.url} target="_blank" rel="noopener noreferrer"
           className="mt-3 inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2 w-full hover:bg-indigo-700">
          Ver oferta
        </a>
      </div>
    </div>
  )
}

export default function Vendas() {
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  async function load(first = true) {
    setLoading(true)
    try {
      const { items: data, nextCursor } = await listPaged('vendas', 12, first ? null : cursor)
      setItems(first ? data : [...items, ...data])
      setCursor(nextCursor)
    } catch (error) {
      console.error('Erro ao carregar vendas:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => { load(true) }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6">Vendas</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      {cursor && (
        <div className="flex justify-center mt-8">
          <button onClick={() => load(false)}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50">Carregar mais</button>
        </div>
      )}
      {loading && <div className="text-center text-gray-500 mt-6">Carregando…</div>}
    </section>
  )
}