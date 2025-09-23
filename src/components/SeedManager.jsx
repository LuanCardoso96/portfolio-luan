import React, { useState } from 'react'
import { seedVendas, seedFofocas, seedMarvelDC } from '../data/seedVendas'

export default function SeedManager() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function executarSeed(tipo) {
    setLoading(true)
    setStatus('')
    
    try {
      switch (tipo) {
        case 'vendas':
          await seedVendas()
          setStatus('✅ Afiliados Shopee criados com sucesso!')
          break
        case 'fofocas':
          await seedFofocas()
          setStatus('✅ Fofocas criadas com sucesso!')
          break
        case 'marvel':
          await seedMarvelDC()
          setStatus('✅ Notícias Marvel & DC criadas com sucesso!')
          break
        case 'todos':
          await seedVendas()
          await seedFofocas()
          await seedMarvelDC()
          setStatus('✅ Todos os seeds executados com sucesso!')
          break
      }
    } catch (error) {
      console.error('Erro no seed:', error)
      setStatus('❌ Erro ao executar seed: ' + error.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🌱 Seed Manager</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-bold text-blue-800 mb-2">📋 O que este seed faz:</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• <strong>Afiliados Shopee:</strong> 5 produtos de afiliado</li>
          <li>• <strong>Fofocas:</strong> 10 links de sites de celebridades</li>
          <li>• <strong>Marvel & DC:</strong> 10 links de sites de quadrinhos</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">🛒 Afiliados Shopee</h2>
          <p className="text-gray-600 text-sm">Cria 5 produtos de afiliado da Shopee</p>
          <button
            onClick={() => executarSeed('vendas')}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Afiliados Shopee'}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">📰 Fofocas</h2>
          <p className="text-gray-600 text-sm">Cria 10 links de sites de celebridades</p>
          <button
            onClick={() => executarSeed('fofocas')}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Fofocas'}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">🦸 Marvel & DC</h2>
          <p className="text-gray-600 text-sm">Cria 10 links de sites de quadrinhos</p>
          <button
            onClick={() => executarSeed('marvel')}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Marvel & DC'}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">🚀 Todos</h2>
          <p className="text-gray-600 text-sm">Executa todos os seeds de uma vez</p>
          <button
            onClick={() => executarSeed('todos')}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Executar Todos'}
          </button>
        </div>
      </div>

      {status && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <p className="text-gray-800">{status}</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">⚠️ Importante:</h3>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• Execute apenas uma vez</li>
          <li>• Verifique o Firestore Console após executar</li>
          <li>• Os dados aparecerão nas páginas públicas</li>
          <li>• Use "Executar Todos" para popular tudo</li>
        </ul>
      </div>
    </div>
  )
}
