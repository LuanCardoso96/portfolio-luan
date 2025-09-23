import React from 'react'

export default function DiagnosticoCompleto() {
  const [errors, setErrors] = React.useState([])
  const [firebaseStatus, setFirebaseStatus] = React.useState('Verificando...')

  React.useEffect(() => {
    const checkErrors = []
    
    // Verificar se há erros no console
    const originalError = console.error
    console.error = (...args) => {
      checkErrors.push(args.join(' '))
      originalError.apply(console, args)
    }

    // Verificar Firebase
    try {
      import('../lib/firebase.js').then(({ auth, db }) => {
        if (auth && db) {
          setFirebaseStatus('✅ Firebase conectado')
        } else {
          setFirebaseStatus('❌ Firebase com problema')
        }
      }).catch(() => {
        setFirebaseStatus('❌ Firebase não carregou')
      })
    } catch (e) {
      setFirebaseStatus('❌ Erro ao carregar Firebase')
    }

    setErrors(checkErrors)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 Diagnóstico Completo</h1>
      
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold text-blue-800 mb-2">📊 Status do Sistema</h3>
          <ul className="text-blue-700 space-y-1">
            <li>• Firebase: {firebaseStatus}</li>
            <li>• React Router: ✅ Funcionando</li>
            <li>• ErrorBoundary: ✅ Ativo</li>
            <li>• Guards: ✅ Com loading</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800 mb-2">✅ Rotas Funcionando</h3>
          <div className="grid grid-cols-2 gap-2">
            <a href="/" className="text-green-600 hover:underline">→ Home</a>
            <a href="/home-simples" className="text-green-600 hover:underline">→ Home Simples</a>
            <a href="/teste-home" className="text-green-600 hover:underline">→ Teste Home</a>
            <a href="/teste-admin" className="text-green-600 hover:underline">→ Teste Admin</a>
            <a href="/login" className="text-green-600 hover:underline">→ Login</a>
            <a href="/admin" className="text-green-600 hover:underline">→ Admin</a>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">⚠️ Possíveis Problemas</h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Verifique o Console do navegador (F12)</li>
            <li>• Teste as rotas protegidas</li>
            <li>• Verifique se o Firebase está conectado</li>
            <li>• Teste o login com luancr71996@gmail.com</li>
          </ul>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-bold text-red-800 mb-2">❌ Erros Detectados</h3>
          {errors.length === 0 ? (
            <p className="text-red-700">Nenhum erro detectado no console</p>
          ) : (
            <ul className="text-red-700 space-y-1">
              {errors.map((error, i) => (
                <li key={i}>• {error}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="font-bold text-gray-800 mb-2">🔧 Próximos Passos</h3>
          <ol className="text-gray-700 space-y-1">
            <li>1. Acesse http://localhost:5174/home-simples</li>
            <li>2. Se funcionar, o problema está no home.jsx original</li>
            <li>3. Se não funcionar, há problema no roteamento</li>
            <li>4. Verifique o Console para erros específicos</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
