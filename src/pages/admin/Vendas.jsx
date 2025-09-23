import React from 'react'
import { listPaged, create, remove, update } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'

const COL = 'vendas'

export default function AdminVendas() {
  const [user, setUser] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({
    titulo: '', 
    preco: '', 
    url: '', 
    imagem: '', 
    destaque: false
  })

  React.useEffect(() => observeAuth(setUser), [])

  async function loadFirst() {
    setLoading(true)
    try {
      const { items, nextCursor } = await listPaged(COL, 10, null)
      setItems(items)
      setCursor(nextCursor)
      sessionStorage.setItem('cache_admin_vendas', JSON.stringify(items))
    } catch (error) {
      console.error('Erro ao carregar vendas:', error)
    }
    setLoading(false)
  }

  async function loadMore() {
    if (!cursor) return
    setLoading(true)
    try {
      const { items: extra, nextCursor } = await listPaged(COL, 10, cursor)
      setItems(prev => [...prev, ...extra])
      setCursor(nextCursor)
    } catch (error) {
      console.error('Erro ao carregar mais vendas:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    const cache = sessionStorage.getItem('cache_admin_vendas')
    if (cache) setItems(JSON.parse(cache))
    loadFirst()
  }, [])

  async function onCreate(e) {
    e.preventDefault()
    if (!form.titulo || !form.preco) {
      alert('Preencha título e preço')
      return
    }
    
    if (!user) {
      alert('Você precisa estar logado')
      return
    }
    
    try {
      const docId = await create(COL, form, user?.email || null)
      console.log('Produto criado com ID:', docId)
      alert('Produto criado com sucesso!')
      setForm({ titulo: '', descricao: '', preco: '', url: '', imagem: '', categoria: 'Produto', destaque: false, status: 'Ativo' })
      await loadFirst()
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto: ' + error.message)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir item de venda?')) return
    
    try {
      await remove(COL, id)
      await loadFirst()
    } catch (error) {
      console.error('Erro ao excluir venda:', error)
      alert('Erro ao excluir venda. Verifique se você está logado como admin.')
    }
  }

  async function toggleDestaque(id) {
    try {
      const item = items.find(i => i.id === id)
      await update(COL, id, { destaque: !item.destaque })
      await loadFirst()
    } catch (error) {
      console.error('Erro ao atualizar destaque:', error)
      alert('Erro ao atualizar destaque. Verifique se você está logado como admin.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Admin • Vendas</h1>
        <div className="text-sm text-gray-500">
          {items.length} produto{items.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={onCreate} className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Adicionar Produto/Oferta</h2>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Título *</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Nome do produto" 
              value={form.titulo} 
              onChange={e => setForm({...form, titulo: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Preço</label>
              <input 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
                placeholder="R$ 0,00" 
                value={form.preco} 
                onChange={e => setForm({...form, preco: e.target.value})}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={form.destaque} 
                  onChange={e => setForm({...form, destaque: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Destaque</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">URL do Produto *</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="https://..." 
              value={form.url} 
              onChange={e => setForm({...form, url: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="https://..." 
              value={form.imagem} 
              onChange={e => setForm({...form, imagem: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Adicionar Produto'}
          </button>
        </form>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Produtos/Ofertas</h2>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhum produto cadastrado ainda.
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2">{item.titulo}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {item.preco && (
                        <span className="text-sm font-bold text-green-600">{item.preco}</span>
                      )}
                      {item.destaque && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Destaque
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-3">
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Ver produto
                      </a>
                    )}
                    <button 
                      onClick={() => toggleDestaque(item.id)} 
                      className={`text-xs px-2 py-1 rounded ${
                        item.destaque 
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item.destaque ? 'Remover destaque' : 'Destacar'}
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Paginação */}
        {cursor && (
          <div className="mt-6 text-center">
            <button 
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Carregar Mais'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}