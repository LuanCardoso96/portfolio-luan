import React from 'react'
import { listPaged, create, remove } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'

const COL = 'noticias' // usamos uma coleção só, com campo categoria (Marvel & DC | Fofocas)

export default function AdminConteudo() {
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

  async function load(first = true) {
    setLoading(true)
    try {
      const { items: data, nextCursor } = await listPaged(COL, 10, first ? null : cursor)
      setItems(first ? data : [...items, ...data])
      setCursor(nextCursor)
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => { 
    load(true) 
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
    
    try {
      await create(COL, form, user?.email || null)
      setForm({ titulo: '', descricao: '', url: '', imagem: '', categoria: 'Marvel & DC', fonte: '' })
      await load(true)
      alert('Conteúdo criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error)
      alert('Erro ao criar conteúdo: ' + error.message)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir item?')) return
    
    try {
      await remove(COL, id)
      await load(true)
    } catch (error) {
      console.error('Erro ao excluir item:', error)
      alert('Erro ao excluir item: ' + error.message)
    }
  }

  const Input = (props) => (
    <input {...props} 
      className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
    />
  )

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Formulário */}
      <form onSubmit={onCreate} className="bg-white rounded-2xl border p-5 shadow-sm space-y-3">
        <h2 className="font-bold text-lg">Adicionar notícia/fofoca</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Título *</label>
          <Input 
            value={form.titulo} 
            onChange={e => setForm({...form, titulo: e.target.value})} 
            placeholder="Título"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <textarea 
            value={form.descricao} 
            onChange={e => setForm({...form, descricao: e.target.value})}
            placeholder="Breve descrição"
            className="w-full rounded-xl border px-3 py-2 h-24 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">URL da Notícia *</label>
          <Input 
            value={form.url} 
            onChange={e => setForm({...form, url: e.target.value})} 
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">URL da Imagem (thumb)</label>
          <Input 
            value={form.imagem} 
            onChange={e => setForm({...form, imagem: e.target.value})} 
            placeholder="https://..."
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <select 
              value={form.categoria} 
              onChange={e => setForm({...form, categoria: e.target.value})}
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            >
              <option value="Marvel & DC">Marvel & DC</option>
              <option value="Fofocas">Fofocas</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Fonte</label>
            <Input 
              value={form.fonte} 
              onChange={e => setForm({...form, fonte: e.target.value})} 
              placeholder="Nome da fonte"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      {/* Lista */}
      <div className="bg-white rounded-2xl border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">Itens recentes</h2>
          {loading && <span className="text-sm text-gray-500">Carregando…</span>}
        </div>
        
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {loading ? 'Carregando...' : 'Nenhum conteúdo cadastrado ainda.'}
            </div>
          ) : (
            items.map(n => (
              <div key={n.id} className="rounded-2xl border p-4 flex gap-3 items-start hover:shadow-sm transition-shadow">
                {n.imagem ? (
                  <img 
                    src={n.imagem} 
                    alt={n.titulo}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop'
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                    Sem Imagem
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm line-clamp-2">{n.titulo}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      n.categoria === 'Fofocas' 
                        ? 'bg-pink-100 text-pink-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {n.categoria || 'Geral'}
                    </span>
                    {n.fonte && <span className="ml-2">• {n.fonte}</span>}
                  </div>
                  <a 
                    href={n.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
                  >
                    Ler matéria ↗
                  </a>
                </div>
                <button 
                  onClick={() => onDelete(n.id)} 
                  className="text-red-600 text-sm hover:underline flex-shrink-0"
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
        
        {cursor && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => load(false)} 
              disabled={loading}
              className="px-4 py-2 rounded-xl border hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Carregando...' : 'Carregar mais'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
