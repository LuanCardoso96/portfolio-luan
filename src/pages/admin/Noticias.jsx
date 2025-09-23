import React from 'react'
import { listPaged, create, remove } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'

const COL = 'noticias'

export default function AdminNoticias() {
  const [user, setUser] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({
    titulo: '', 
    descricao: '', 
    url: '', 
    imagem: '', 
    categoria: 'Marvel & DC', 
    fonte: ''
  })

  React.useEffect(() => observeAuth(setUser), [])

  async function loadFirst() {
    setLoading(true)
    try {
      const { items, nextCursor } = await listPaged(COL, 10, null)
      setItems(items)
      setCursor(nextCursor)
      sessionStorage.setItem('cache_admin_noticias', JSON.stringify(items))
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
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
      console.error('Erro ao carregar mais notícias:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    const cache = sessionStorage.getItem('cache_admin_noticias')
    if (cache) setItems(JSON.parse(cache))
    loadFirst()
  }, [])

  async function onCreate(e) {
    e.preventDefault()
    if (!form.titulo || !form.url) {
      alert('Preencha título e URL')
      return
    }
    
    if (!user) {
      alert('Você precisa estar logado')
      return
    }
    
    console.log('Usuário atual:', user)
    console.log('Dados do formulário:', form)
    
    try {
      const docId = await create(COL, form, user?.email || null)
      console.log('Notícia criada com ID:', docId)
      alert('Notícia criada com sucesso!')
      setForm({ titulo: '', descricao: '', url: '', imagem: '', categoria: 'Marvel & DC', fonte: '' })
      await loadFirst()
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      console.error('Detalhes do erro:', error.message)
      alert(`Erro ao criar notícia: ${error.message}. Verifique se você está logado como admin.`)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir notícia?')) return
    
    try {
      await remove(COL, id)
      await loadFirst()
    } catch (error) {
      console.error('Erro ao excluir notícia:', error)
      alert('Erro ao excluir notícia. Verifique se você está logado como admin.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Admin • Notícias</h1>
        <div className="text-sm text-gray-500">
          {user ? `Logado como: ${user.email}` : 'Não logado'}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={onCreate} className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Adicionar Nova Notícia</h2>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Título *</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Título da notícia" 
              value={form.titulo} 
              onChange={e => setForm({...form, titulo: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">URL da Notícia *</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="https://..." 
              value={form.url} 
              onChange={e => setForm({...form, url: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Descrição</label>
            <textarea 
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Descrição da notícia"
              rows="3"
              value={form.descricao} 
              onChange={e => setForm({...form, descricao: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <select 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                value={form.categoria} 
                onChange={e => setForm({...form, categoria: e.target.value})}
              >
                <option value="Geral">Geral</option>
                <option value="Marvel & DC">Marvel & DC</option>
                <option value="Fofocas">Fofocas</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Negócios">Negócios</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Fonte</label>
              <input 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
                placeholder="Nome da fonte" 
                value={form.fonte} 
                onChange={e => setForm({...form, fonte: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Adicionar Notícia'}
          </button>
        </form>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Notícias Cadastradas</h2>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhuma notícia cadastrada ainda.
            </div>
          ) : (
            items.map(n => (
              <div key={n.id} className="bg-white rounded-2xl border p-4 shadow-sm flex gap-3 items-start">
                {n.imagem ? (
                  <img 
                    src={n.imagem} 
                    className="w-16 h-16 rounded-lg object-cover" 
                    alt="Thumbnail"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Sem img</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <a 
                    href={n.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline text-sm line-clamp-2"
                  >
                    {n.titulo}
                  </a>
                  <div className="text-xs text-gray-500 mt-1">
                    {n.categoria} • {n.fonte || 'Sem fonte'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleDateString('pt-BR') : 'Data não disponível'}
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(n.id)} 
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Excluir
                </button>
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
