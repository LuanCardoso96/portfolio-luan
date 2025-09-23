import React from 'react'
import { useNavigate } from 'react-router-dom'
import { observeAuth, Sub } from '../lib/auth'

const PRICE_LABEL = import.meta.env.VITE_MEMBER_PRICE_LABEL || 'Plano Premium'
const PRICE_VALUE = import.meta.env.VITE_MEMBER_PRICE || 'R$ 29,90/mês'

export default function Planos() {
  const nav = useNavigate()
  const [user, setUser] = React.useState(null)
  
  React.useEffect(() => {
    const unsub = observeAuth(setUser)
    return () => unsub()
  }, [])
  
  const handleAssinar = () => {
    if (!user) { 
      nav('/login?to=/planos')
      return 
    }
    // Simula checkout aprovado
    Sub.start('member-monthly')
    nav('/membros')
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Torne-se um Membro Premium</h1>
      <p className="text-center text-gray-600 mb-10">Acesso a conteúdos exclusivos, downloads (APK) e tutoriais.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-start-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
          <div className="text-sm font-semibold text-indigo-600 mb-2">{PRICE_LABEL}</div>
          <div className="text-3xl font-extrabold mb-2">{PRICE_VALUE}</div>
          <ul className="text-left text-gray-600 space-y-2 my-6">
            <li>• Conteúdo premium Web & Mobile</li>
            <li>• Downloads "Cursor APKs" e templates</li>
            <li>• Tutoriais de IA e automações</li>
            <li>• Suporte prioritário</li>
          </ul>
          <button 
            onClick={handleAssinar}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-95"
          >
            Assinar agora
          </button>
          <p className="text-xs text-gray-500 mt-3">Pagamento simulado para testes. Integraremos Stripe/Pix depois.</p>
        </div>
      </div>
    </section>
  )
}
