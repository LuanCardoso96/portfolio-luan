import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { observeAuth } from '../lib/auth'

export default function AdminRoute({ children }) {
  const loc = useLocation()
  const [user, setUser] = React.useState(undefined)

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
  if (!user.isAdmin) return <Navigate to="/" replace />
  return children
}
