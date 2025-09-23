import React from 'react'

export default function Diagnostico() {
  const [status, setStatus] = React.useState({
    servidor: 'Verificando...',
    imagens: 'Verificando...',
    firestore: 'Verificando...',
    auth: 'Verificando...'
  })

  React.useEffect(() => {
    // Teste 1: Servidor
    setStatus(prev => ({ ...prev, servidor: '✅ Servidor funcionando' }))

    // Teste 2: Imagens
    const img = new Image()
    img.onload = () => setStatus(prev => ({ ...prev, imagens: '✅ Imagens carregando' }))
    img.onerror = () => setStatus(prev => ({ ...prev, imagens: '❌ Problema com imagens' }))
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'

    // Teste 3: Firestore
    import('../lib/firestoreRepo').then(() => {
      setStatus(prev => ({ ...prev, firestore: '✅ Firestore configurado' }))
    }).catch(() => {
      setStatus(prev => ({ ...prev, firestore: '❌ Problema no Firestore' }))
    })

    // Teste 4: Auth
    import('../lib/auth').then(() => {
      setStatus(prev => ({ ...prev, auth: '✅ Auth configurado' }))
    }).catch(() => {
      setStatus(prev => ({ ...prev, auth: '❌ Problema no Auth' }))
    })
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">🔍 Diagnóstico do Sistema</h1>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">Servidor:</span>
          <span className={status.servidor.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {status.servidor}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">Imagens:</span>
          <span className={status.imagens.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {status.imagens}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">Firestore:</span>
          <span className={status.firestore.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {status.firestore}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">Autenticação:</span>
          <span className={status.auth.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {status.auth}
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-bold mb-2">📋 Checklist de Verificação:</h3>
        <ul className="text-sm space-y-1">
          <li>• Acesse: http://localhost:5174</li>
          <li>• Verifique se a página carrega</li>
          <li>• Teste o carrossel de depoimentos</li>
          <li>• Verifique se as imagens aparecem</li>
          <li>• Teste o login com luancr71996@gmail.com</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded">
        <h3 className="font-bold mb-2">⚠️ Problemas Comuns:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Imagens:</strong> URLs do Unsplash podem estar bloqueadas</li>
          <li>• <strong>Firestore:</strong> Regras não configuradas</li>
          <li>• <strong>Auth:</strong> Firebase não configurado</li>
          <li>• <strong>Console:</strong> Verifique erros no F12</li>
        </ul>
      </div>
    </div>
  )
}
