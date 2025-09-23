import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { observeAuth, logout, Sub } from './lib/auth'

export default function App() {
  const location = useLocation()
  const [user, setUser] = React.useState(null)
  const [isMember, setIsMember] = React.useState(Sub.isMember())

  React.useEffect(() => {
    const unsub = observeAuth(setUser)
    return () => unsub()
  }, [])

  
  React.useEffect(() => {
    const removeBase44Elements = () => {
      document.querySelectorAll('*').forEach(n => {
        const txt = (n.textContent || '').toLowerCase()
        if (txt.includes('edit with base44') || txt.includes('feito com base44')) n.remove()
        if ((n.id||'').toLowerCase().includes('base44')) n.remove()
        if ((n.className||'').toString().toLowerCase().includes('base44')) n.remove()
      })
    }
    
    removeBase44Elements()
    const interval = setInterval(removeBase44Elements, 1000)
    return () => clearInterval(interval)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setIsMember(false)
    window.location.href = '/'
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium ${
      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-bold text-lg">Luan Digital</NavLink>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass} end>Home</NavLink>
            <NavLink to="/portfolio" className={linkClass}>Portfólio</NavLink>
            <NavLink to="/noticias" className={linkClass}>Notícias</NavLink>
            <NavLink to="/marvel-dc" className={linkClass}>Marvel & DC</NavLink>
            <NavLink to="/fofocas" className={linkClass}>Fofocas</NavLink>
            <NavLink to="/vendas" className={linkClass}>Vendas</NavLink>
            <NavLink to="/contato" className={linkClass}>Contato</NavLink>
            
            {!user && (
              <NavLink to="/login" className={linkClass}>Faça login</NavLink>
            )}
            {user && isMember && (
              <NavLink to="/membros" className={linkClass}>Conteúdo Premium</NavLink>
            )}
            {user && !isMember && (
              <NavLink to="/planos" className={linkClass}>Torne-se Membro</NavLink>
            )}
            {user && (
              <NavLink to="/minha-conta" className={linkClass}>Minha Conta</NavLink>
            )}
            {user?.isAdmin && (
              <NavLink to="/admin" className={linkClass}>Painel Admin</NavLink>
            )}
            {user && (
              <button 
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium border text-gray-600 hover:text-gray-900"
              >
                Sair
              </button>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:gap-6 justify-between">
          <p>© Luan Cardoso. Todos os direitos reservados.</p>
          <nav className="flex gap-4">
            <NavLink to="/privacidade" className="hover:underline">Política de Privacidade</NavLink>
            <NavLink to="/termos" className="hover:underline">Termos de Uso</NavLink>
            <NavLink to="/contato" className="hover:underline">Contato</NavLink>
          </nav>
        </div>
      </footer>
    </div>
  )
}
