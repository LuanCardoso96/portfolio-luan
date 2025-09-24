import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Admin() {
  const tab = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'bg-white border hover:bg-gray-50'
    }`

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-500 mt-2">Gerencie o conteúdo do site.</p>
      </div>

      <div className="flex gap-3 mb-8">
        <NavLink to="/admin/conteudo" className={tab}>
          Conteúdo (Notícias & Fofocas)
        </NavLink>
        <NavLink to="/admin/produtos" className={tab}>
          Produtos & Membros
        </NavLink>
      </div>

      <Outlet />
    </section>
  )
}