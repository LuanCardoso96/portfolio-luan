import React, { useState } from 'react'
import { importNewsToFirestore } from '../scripts/importNews'

export default function ImportNews() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleImport = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const ids = await importNewsToFirestore()
      setResult({
        success: true,
        message: `${ids.length} notícias importadas com sucesso!`,
        count: ids.length
      })
    } catch (error) {
      setResult({
        success: false,
        message: `Erro: ${error.message}`,
        count: 0
      })
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Importar Notícias para Firestore</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Este script irá importar 10 notícias (5 Fofocas + 5 Marvel & DC) para o Firestore.
        </p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• 5 notícias de Fofocas</li>
          <li>• 5 notícias de Marvel & DC</li>
          <li>• Todas com timestamps e autor admin</li>
        </ul>
      </div>

      <button
        onClick={handleImport}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {loading ? 'Importando...' : 'Importar Notícias'}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-xl ${
          result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <div className="font-semibold">
            {result.success ? '✅ Sucesso!' : '❌ Erro!'}
          </div>
          <div className="text-sm mt-1">{result.message}</div>
          {result.success && (
            <div className="text-xs mt-2 opacity-75">
              As notícias agora aparecerão nas páginas /noticias, /fofocas e /marvel-dc
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400">
        <p><strong>Nota:</strong> Você precisa estar logado como admin (luancr71996@gmail.com) para executar esta operação.</p>
      </div>
    </div>
  )
}
