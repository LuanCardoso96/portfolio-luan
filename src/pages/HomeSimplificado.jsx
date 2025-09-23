import React from 'react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">🏠 Home Simplificado</h1>
      <p className="text-gray-600 mb-8">Se você está vendo isso, o roteamento está funcionando!</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800">✅ Home Funcionando</h3>
          <p className="text-green-700">O componente Home está renderizando corretamente.</p>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold text-blue-800">🔗 Links de Teste</h3>
          <div className="space-y-2">
            <a href="/teste-home" className="block text-blue-600 hover:underline">
              → Teste Home Detalhado
            </a>
            <a href="/teste-admin" className="block text-blue-600 hover:underline">
              → Teste Admin
            </a>
            <a href="/diagnostico" className="block text-blue-600 hover:underline">
              → Diagnóstico
            </a>
            <a href="/admin" className="block text-blue-600 hover:underline">
              → Admin (protegido)
            </a>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800">⚠️ Se ainda há problemas:</h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Abra o Console do navegador (F12)</li>
            <li>• Verifique se há erros em vermelho</li>
            <li>• Teste as rotas protegidas</li>
            <li>• Verifique se o Firebase está conectado</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
