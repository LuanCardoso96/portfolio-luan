import React from 'react'

export default function TesteHome() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧪 Teste Simples do Home</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800">✅ Home Funcionando</h3>
          <p className="text-green-700">Se você está vendo isso, o roteamento está funcionando!</p>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold text-blue-800">🔗 Links de Teste</h3>
          <div className="space-y-2">
            <a href="/" className="block text-blue-600 hover:underline">
              → Home Original
            </a>
            <a href="/teste-admin" className="block text-blue-600 hover:underline">
              → Teste Admin
            </a>
            <a href="/diagnostico" className="block text-blue-600 hover:underline">
              → Diagnóstico
            </a>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800">⚠️ Se ainda há tela em branco:</h3>
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
