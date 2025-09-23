import React, { useState } from 'react'
import { listPaged, create, remove } from '../lib/firestoreRepo'

export default function AdminSimples() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    url: '',
    imagem: '',
    categoria: 'Marvel & DC',
    fonte: ''
  })

  async function loadNoticias() {
    setLoading(true)
    try {
      const { items } = await listPaged('noticias', 10, null)
      setNoticias(items)
      console.log('Notícias carregadas:', items)
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
      alert('Erro ao carregar notícias: ' + error.message)
    }
    setLoading(false)
  }

  async function criarNoticia(e) {
    e.preventDefault()
    if (!form.titulo || !form.url) {
      alert('Preencha título e URL')
      return
    }

    setLoading(true)
    try {
      // Simular usuário admin para teste
      const docId = await create('noticias', form, 'luancr71996@gmail.com')
      console.log('Notícia criada com ID:', docId)
      alert('Notícia criada com sucesso!')
      setForm({ titulo: '', descricao: '', url: '', imagem: '', categoria: 'Marvel & DC', fonte: '' })
      await loadNoticias()
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      alert('Erro ao criar notícia: ' + error.message)
    }
    setLoading(false)
  }

  async function deletarNoticia(id) {
    if (!confirm('Excluir notícia?')) return

    try {
      await remove('noticias', id)
      alert('Notícia excluída!')
      await loadNoticias()
    } catch (error) {
      console.error('Erro ao excluir notícia:', error)
      alert('Erro ao excluir: ' + error.message)
    }
  }

  React.useEffect(() => {
    loadNoticias()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔧 Admin Simples (Sem Login)</h1>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">⚠️ Modo de Teste</h3>
        <p className="text-yellow-700 text-sm">
          Este admin funciona sem login para testar o Firestore. 
          Use apenas para desenvolvimento!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">➕ Adicionar Notícia</h2>
          
          <form onSubmit={criarNoticia} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={form.titulo}
                onChange={e => setForm({...form, titulo: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Título da notícia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
              <input
                type="url"
                value={form.url}
                onChange={e => setForm({...form, url: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="https://exemplo.com/noticia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={form.descricao}
                onChange={e => setForm({...form, descricao: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Descrição da notícia"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="url"
                value={form.imagem}
                onChange={e => setForm({...form, imagem: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={form.categoria}
                  onChange={e => setForm({...form, categoria: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Marvel & DC">Marvel & DC</option>
                  <option value="Fofocas">Fofocas</option>
                  <option value="Geral">Geral</option>
                  <option value="Tecnologia">Tecnologia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fonte</label>
                <input
                  type="text"
                  value={form.fonte}
                  onChange={e => setForm({...form, fonte: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da fonte"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Criar Notícia'}
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📰 Notícias ({noticias.length})</h2>
          
          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : noticias.length === 0 ? (
            <p className="text-gray-500">Nenhuma notícia cadastrada</p>
          ) : (
            <div className="space-y-3">
              {noticias.map(noticia => (
                <div key={noticia.id} className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">{noticia.titulo}</h3>
                  <p className="text-xs text-gray-600 mt-1">{noticia.categoria}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {noticia.createdAt?.toDate ? noticia.createdAt.toDate().toLocaleDateString('pt-BR') : 'Data não disponível'}
                  </p>
                  <button
                    onClick={() => deletarNoticia(noticia.id)}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="font-bold text-red-800 mb-2">🚨 Problemas Identificados:</h3>
        <ul className="text-red-700 space-y-1 text-sm">
          <li>• Firebase Auth retornando erro 400</li>
          <li>• PWA beforeinstallprompt não funcionando</li>
          <li>• Cross-Origin-Opener-Policy bloqueando popups</li>
          <li>• Notícias não salvando no Firestore</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-bold text-green-800 mb-2">✅ Soluções:</h3>
        <ul className="text-green-700 space-y-1 text-sm">
          <li>• Use este admin simples para testar</li>
          <li>• Configure as regras do Firestore</li>
          <li>• Verifique se o Firebase está conectado</li>
          <li>• Teste sem autenticação primeiro</li>
        </ul>
      </div>
    </div>
  )
}
