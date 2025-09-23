import React from 'react'
import { listPaged, create, remove } from '../../lib/firestoreRepo'
import { observeAuth } from '../../lib/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../lib/firebase'

const COL = 'downloads'

export default function AdminDownloads() {
  const [user, setUser] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [imagePreview, setImagePreview] = React.useState(null)
  const [form, setForm] = React.useState({
    titulo: '', 
    desc: '', 
    url: ''
  })

  React.useEffect(() => observeAuth(setUser), [])

  async function loadFirst() {
    setLoading(true)
    try {
      const { items, nextCursor } = await listPaged(COL, 10, null)
      setItems(items)
      setCursor(nextCursor)
      sessionStorage.setItem('cache_admin_downloads', JSON.stringify(items))
    } catch (error) {
      console.error('Erro ao carregar downloads:', error)
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
      console.error('Erro ao carregar mais downloads:', error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    const cache = sessionStorage.getItem('cache_admin_downloads')
    if (cache) setItems(JSON.parse(cache))
    loadFirst()
  }, [])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo 5MB.')
        return
      }
      
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Apenas arquivos de imagem são permitidos.')
        return
      }
      
      setSelectedFile(file)
      
      // Criar preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToStorage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`
    const storageRef = ref(storage, `downloads/${fileName}`)
    
    try {
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Erro no upload:', error)
      throw new Error('Falha no upload da imagem')
    }
  }

  const isImageUrl = (url) => {
    if (!url) return false
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    return imageExtensions.some(ext => url.toLowerCase().includes(ext)) || 
           url.includes('firebasestorage.googleapis.com') ||
           url.includes('storage.googleapis.com')
  }

  async function onCreate(e) {
    e.preventDefault()
    if (!form.titulo) {
      alert('Título é obrigatório')
      return
    }
    
    if (!user || !user.isAdmin) {
      alert('Apenas administradores podem criar downloads')
      return
    }
    
    setUploading(true)
    
    try {
      let finalUrl = form.url
      
      // Se arquivo foi selecionado, fazer upload
      if (selectedFile) {
        finalUrl = await uploadImageToStorage(selectedFile)
      }
      
      // Se nem arquivo nem URL foram fornecidos
      if (!finalUrl) {
        alert('Forneça uma URL ou selecione um arquivo')
        return
      }
      
      const downloadData = {
        titulo: form.titulo,
        desc: form.desc,
        url: finalUrl,
        isImage: selectedFile ? true : isImageUrl(form.url)
      }
      
      await create(COL, downloadData, user.email)
      
      // Limpar formulário
      setForm({ titulo: '', desc: '', url: '' })
      setSelectedFile(null)
      setImagePreview(null)
      document.getElementById('file-input').value = ''
      
      await loadFirst()
      alert('Download criado com sucesso!')
      
    } catch (error) {
      console.error('Erro ao criar download:', error)
      alert('Erro ao criar download: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  async function onDelete(id) {
    if (!confirm('Excluir download?')) return
    
    try {
      await remove(COL, id)
      await loadFirst()
    } catch (error) {
      console.error('Erro ao excluir download:', error)
      alert('Erro ao excluir download. Verifique se você está logado como admin.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Admin • Downloads</h1>
        <div className="text-sm text-gray-500">
          {items.length} download{items.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulário - só mostra se admin */}
        {user && user.isAdmin && (
          <form onSubmit={onCreate} className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold mb-4">Adicionar Download</h2>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Título *</label>
              <input 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
                placeholder="Nome do download" 
                value={form.titulo} 
                onChange={e => setForm({...form, titulo: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
                placeholder="Descrição do download"
                rows="3"
                value={form.desc} 
                onChange={e => setForm({...form, desc: e.target.value})}
              />
            </div>

            {/* Upload de arquivo */}
            <div>
              <label className="text-sm font-medium text-gray-700">Upload de Imagem</label>
              <input 
                id="file-input"
                type="file" 
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">Máximo 5MB. Formatos: JPG, PNG, GIF, WebP</p>
              
              {/* Preview da imagem */}
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <p className="text-xs text-green-600 mt-1">✓ Imagem selecionada</p>
                </div>
              )}
            </div>

            {/* URL alternativa */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                URL Externa (alternativa ao upload)
              </label>
              <input 
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500" 
                placeholder="https://drive.google.com/..." 
                value={form.url} 
                onChange={e => setForm({...form, url: e.target.value})}
                disabled={selectedFile}
              />
              {selectedFile && (
                <p className="text-xs text-blue-600 mt-1">URL desabilitada - arquivo selecionado</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={uploading || loading}
              className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {uploading ? 'Fazendo Upload...' : loading ? 'Salvando...' : 'Adicionar Download'}
            </button>
          </form>
        )}

        {/* Lista de downloads */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Downloads</h2>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {loading ? 'Carregando...' : 'Nenhum download cadastrado ainda.'}
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
                    
                    {/* Preview da imagem se for uma imagem */}
                    {item.url && (item.isImage || isImageUrl(item.url)) && (
                      <div className="mt-2">
                        <img 
                          src={item.url} 
                          alt={item.titulo}
                          className="w-16 h-16 object-cover rounded border"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
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
                        {item.isImage || isImageUrl(item.url) ? 'Ver Imagem' : 'Baixar'}
                      </a>
                    )}
                    {user && user.isAdmin && (
                      <button 
                        onClick={() => onDelete(item.id)} 
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Excluir
                      </button>
                    )}
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