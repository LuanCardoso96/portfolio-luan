import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Membros() {
  const isAuth = localStorage.getItem('auth') === '1'
  if (!isAuth) return <Navigate to="/login" replace />
  return (
    <div className="prose">
      <h1>Área de Membros</h1>
      <p>Conteúdo premium para assinantes.</p>
    </div>
  )
}
