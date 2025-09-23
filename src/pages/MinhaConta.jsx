import React from 'react'
import { Sub } from '../lib/auth'

export default function MinhaConta() {
  const active = Sub.isMember()
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold mb-4">Minha Conta</h1>
      <div className="bg-white rounded-2xl p-6 border">
        <p className="mb-4">
          Status da assinatura: {active ? (
            <span className="text-emerald-600 font-semibold">ATIVA</span>
          ) : (
            <span className="text-gray-600">sem assinatura</span>
          )}
        </p>
        {active ? (
          <button 
            onClick={() => { 
              Sub.cancel()
              window.location.reload() 
            }}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
          >
            Cancelar assinatura
          </button>
        ) : (
          <a 
            href="/planos" 
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Assinar
          </a>
        )}
      </div>
    </div>
  )
}
