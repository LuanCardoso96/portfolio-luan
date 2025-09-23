import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithGoogle, loginWithPassword, observeAuth } from '../lib/auth'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [err, setErr] = React.useState('')
  const [redirectTo, setRedirectTo] = React.useState('/membros')

  React.useEffect(() => {
    const unsub = observeAuth(u => { 
      if (u) nav(redirectTo, { replace: true }) 
    })
    return () => unsub()
  }, [redirectTo, nav])

  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const to = p.get('to')
    if (to) setRedirectTo(to)
  }, [])

  async function onEmail(e) {
    e.preventDefault()
    setErr('')
    try {
      await loginWithPassword(email.trim(), pass)
      nav(redirectTo, { replace: true })
    } catch (e) {
      setErr('Não foi possível entrar. Verifique e-mail/senha.')
    }
  }

  async function onGoogle() {
    setErr('')
    try {
      await loginWithGoogle()
      nav(redirectTo, { replace: true })
    } catch (e) {
      setErr('Falha no login com Google.')
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white py-10">
      <div className="w-[92vw] max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-4 flex items-center justify-center text-white text-xl">★</div>
        <h1 className="text-2xl font-extrabold text-center">Entre na sua conta</h1>
        <p className="text-center text-gray-500 mb-6">Acesse a área de membros ou o painel admin.</p>

        <form onSubmit={onEmail} className="space-y-4">
          <div>
            <label className="text-sm font-medium">E-mail</label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-600" 
              placeholder="seu@email.com" 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Senha</label>
            <input 
              type="password" 
              value={pass} 
              onChange={e => setPass(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-600" 
              placeholder="••••••••" 
            />
          </div>
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button type="submit" className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black">
            Entrar
          </button>
        </form>

        <div className="my-4 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <button 
          onClick={onGoogle}
          className="w-full py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-medium"
        >
          Entrar com Google
        </button>
      </div>
    </section>
  )
}