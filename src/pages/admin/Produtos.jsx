import React from 'react'
import { listPaged, create, remove } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'

// Vamos usar duas coleções simples:
const COL_PRODUTOS = 'vendas'     // seus afiliados/ofertas
const COL_MEMBROS  = 'downloads'  // conteúdos premium (downloads, tutoriais, links, etc)

export default function AdminProdutos() {
  const [user, setUser] = React.useState(null)
  const [tab, setTab] = React.useState('produtos') // 'produtos' | 'membros'

  React.useEffect(() => observeAuth(setUser), [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={() => setTab('produtos')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            tab === 'produtos' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white border hover:bg-gray-50'
          }`}
        >
          Produtos
        </button>
        <button 
          onClick={() => setTab('membros')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            tab === 'membros' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white border hover:bg-gray-50'
          }`}
        >
          Conteúdos de Membros
        </button>
      </div>

      {tab === 'produtos' ? <Produtos user={user} /> : <Membros user={user} />}
    </div>
  )
}

function Produtos({ user }) {
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({ 
    titulo: '', 
    url: '', 
    imagem: '', 
    preco: '', 
    destaque: false 
  })

  async function load(first = true) {
    setLoading(true)
    try {
      const { items: data, nextCursor } = await listPaged(COL_PRODUTOS, 12, first ? null : cursor)
      setItems(first ? data : [...items, ...data])
      setCursor(nextCursor)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
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
      await create(COL_PRODUTOS, form, user?.email || null)
      setForm({ titulo: '', url: '', imagem: '', preco: '', destaque: false })
      await load(true)
      alert('Produto criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto: ' + error.message)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir produto?')) return
    
    try {
      await remove(COL_PRODUTOS, id)
      await load(true)
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      alert('Erro ao excluir produto: ' + error.message)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onCreate} className="bg-white rounded-2xl border p-5 shadow-sm space-y-3">
        <h2 className="font-bold text-lg">Adicionar Produto</h2>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Título *</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="Nome do produto" 
            value={form.titulo} 
            onChange={e => setForm({...form, titulo: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">URL da Oferta *</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="https://..." 
            value={form.url} 
            onChange={e => setForm({...form, url: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="https://..." 
            value={form.imagem} 
            onChange={e => setForm({...form, imagem: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Preço (opcional)</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="R$ 0,00" 
            value={form.preco} 
            onChange={e => setForm({...form, preco: e.target.value})}
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input 
              type="checkbox" 
              checked={form.destaque}
              onChange={e => setForm({...form, destaque: e.target.checked})}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            />
            Destaque
          </label>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <div className="bg-white rounded-2xl border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">Produtos</h2>
          {loading && <span className="text-sm text-gray-500">Carregando…</span>}
        </div>
        
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {loading ? 'Carregando...' : 'Nenhum produto cadastrado ainda.'}
            </div>
          ) : (
            items.map(p => (
              <div key={p.id} className="rounded-2xl border p-4 flex gap-3 items-start hover:shadow-sm transition-shadow">
                {p.imagem ? (
                  <img 
                    src={p.imagem} 
                    alt={p.titulo}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop'
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    Sem Imagem
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm line-clamp-2">{p.titulo}</div>
                  {p.preco && (
                    <div className="text-sm text-indigo-700 font-medium mt-1">{p.preco}</div>
                  )}
                  {p.destaque && (
                    <span className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mt-1">
                      Destaque
                    </span>
                  )}
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
                  >
                    Ver oferta ↗
                  </a>
                </div>
                <button 
                  onClick={() => onDelete(p.id)} 
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

function Membros({ user }) {
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({ 
    titulo: '', 
    desc: '', 
    url: '', 
    imagem: '' 
  })

  async function load(first = true) {
    setLoading(true)
    try {
      const { items: data, nextCursor } = await listPaged(COL_MEMBROS, 12, first ? null : cursor)
      setItems(first ? data : [...items, ...data])
      setCursor(nextCursor)
    } catch (error) {
      console.error('Erro ao carregar conteúdos de membros:', error)
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
      await create(COL_MEMBROS, form, user?.email || null)
      setForm({ titulo: '', desc: '', url: '', imagem: '' })
      await load(true)
      alert('Conteúdo de membro criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar conteúdo de membro:', error)
      alert('Erro ao criar conteúdo de membro: ' + error.message)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir conteúdo?')) return
    
    try {
      await remove(COL_MEMBROS, id)
      await load(true)
    } catch (error) {
      console.error('Erro ao excluir conteúdo de membro:', error)
      alert('Erro ao excluir conteúdo de membro: ' + error.message)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onCreate} className="bg-white rounded-2xl border p-5 shadow-sm space-y-3">
        <h2 className="font-bold text-lg">Adicionar Conteúdo de Membro</h2>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Título *</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="Nome do conteúdo" 
            value={form.titulo} 
            onChange={e => setForm({...form, titulo: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <textarea 
            className="w-full rounded-xl border px-3 py-2 h-24 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 resize-none" 
            placeholder="Descrição (opcional)" 
            value={form.desc} 
            onChange={e => setForm({...form, desc: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">URL *</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="URL (download / página premium)" 
            value={form.url} 
            onChange={e => setForm({...form, url: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
          <input 
            className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" 
            placeholder="URL da imagem (opcional)" 
            value={form.imagem} 
            onChange={e => setForm({...form, imagem: e.target.value})}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <div className="bg-white rounded-2xl border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">Conteúdos Premium</h2>
          {loading && <span className="text-sm text-gray-500">Carregando…</span>}
        </div>
        
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {loading ? 'Carregando...' : 'Nenhum conteúdo premium cadastrado ainda.'}
            </div>
          ) : (
            items.map(p => (
              <div key={p.id} className="rounded-2xl border p-4 flex gap-3 items-start hover:shadow-sm transition-shadow">
                {p.imagem ? (
                  <img 
                    src={p.imagem} 
                    alt={p.titulo}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop'
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    Sem Imagem
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm line-clamp-2">{p.titulo}</div>
                  {p.desc && (
                    <div className="text-sm text-gray-600 line-clamp-2 mt-1">{p.desc}</div>
                  )}
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
                  >
                    Acessar ↗
                  </a>
                </div>
                <button 
                  onClick={() => onDelete(p.id)} 
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
