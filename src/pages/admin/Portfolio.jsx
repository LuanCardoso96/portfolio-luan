import React from 'react'
import { listPaged, create, remove } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'

const COL = 'portfolio'

export default function AdminPortfolio() {
  const [user, setUser] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({
    titulo: '', 
    desc: '', 
    url: '', 
    tags: []
  })

  React.useEffect(() => observeAuth(setUser), [])

  async function loadFirst() {
    setLoading(true)
    try {
      const { items, nextCursor } = await listPaged(COL, 10, null)
      setItems(items)
      setCursor(nextCursor)
      sessionStorage.setItem('cache_admin_portfolio', JSON.stringify(items))
    } catch (error) {
      console.error('Erro ao carregar portfolio:', error)
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
      console.error('Erro ao carregar mais portfolio:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    const cache = sessionStorage.getItem('cache_admin_portfolio')
    if (cache) setItems(JSON.parse(cache))
    loadFirst()
  }, [])

  async function onCreate(e) {
    e.preventDefault()
    if (!form.titulo) return
    
    try {
      await create(COL, form, user?.email || null)
      setForm({ titulo: '', desc: '', url: '', tags: [] })
      await loadFirst()
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      alert('Erro ao criar projeto. Verifique se você está logado como admin.')
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir projeto?')) return
    
    try {
      await remove(COL, id)
      await loadFirst()
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
      alert('Erro ao excluir projeto. Verifique se você está logado como admin.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Admin • Portfolio</h1>
        <div className="text-sm text-gray-500">
          {items.length} projeto{items.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={onCreate} className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Adicionar Projeto</h2>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Título *</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Nome do projeto" 
              value={form.titulo} 
              onChange={e => setForm({...form, titulo: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Descrição</label>
            <textarea 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Descrição do projeto"
              rows="3"
              value={form.desc} 
              onChange={e => setForm({...form, desc: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">URL do Projeto</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="https://..." 
              value={form.url} 
              onChange={e => setForm({...form, url: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tags (separadas por vírgula)</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Web, React, Mobile" 
              value={form.tags.join(', ')} 
              onChange={e => setForm({...form, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Adicionar Projeto'}
          </button>
        </form>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Projetos</h2>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhum projeto cadastrado ainda.
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2">{item.titulo}</h3>
                    {item.desc && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.desc}</p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
                        Ver projeto
                      </a>
                    )}
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
