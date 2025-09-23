import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { observeAuth, Sub } from '../lib/auth'

export default function ProtectedMember({ children }) {
  const loc = useLocation()
  const [user, setUser] = React.useState(undefined)
  const [isMember, setIsMember] = React.useState(Sub.isMember())

  React.useEffect(() => {
    const unsub = observeAuth(setUser)
    return () => unsub()
  }, [])

  if (user === undefined) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Carregando…
      </div>
    )
  }
  if (!user) return <Navigate to={`/login?to=${encodeURIComponent(loc.pathname)}`} replace />
  if (!isMember) return <Navigate to="/planos" replace />
  return children
}
