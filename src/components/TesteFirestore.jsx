import React from 'react'
import { create } from '../lib/firestoreRepo'
import { observeAuth } from '../lib/auth'

export default function TesteFirestore() {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const unsub = observeAuth(setUser)
    return () => unsub()
  }, [])

  const testarCriacao = async () => {
    setLoading(true)
    try {
      console.log('Testando criação no Firestore...')
      console.log('Usuário:', user)
      
      const dadosTeste = {
        titulo: 'Teste de Notícia',
        descricao: 'Esta é uma notícia de teste',
        url: 'https://exemplo.com',
        categoria: 'Teste',
        fonte: 'Sistema'
      }
      
      const docId = await create('noticias', dadosTeste, user?.email)
      console.log('✅ Sucesso! Documento criado com ID:', docId)
      alert('✅ Teste bem-sucedido! Notícia criada no Firestore.')
      
    } catch (error) {
      console.error('❌ Erro no teste:', error)
      alert(`❌ Erro: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Teste do Firestore</h2>
      
      <div className="mb-4">
        <strong>Status:</strong> {user ? `Logado como ${user.email}` : 'Não logado'}
      </div>
      
      <div className="mb-4">
        <strong>Admin:</strong> {user?.isAdmin ? '✅ Sim' : '❌ Não'}
      </div>
      
      <button 
        onClick={testarCriacao}
        disabled={loading || !user}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testando...' : 'Testar Criação'}
      </button>
      
      <p className="text-sm text-gray-600 mt-4">
        Este botão testa se o Firestore está funcionando corretamente.
      </p>
    </div>
  )
}
