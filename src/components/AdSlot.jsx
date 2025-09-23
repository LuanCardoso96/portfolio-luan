import React from 'react'

export default function AdSlot({ type, size, className = "" }) {
  const getAdContent = () => {
    if (type === 'top') {
      return 'Anúncio Topo - 728x90'
    } else if (type === 'bottom') {
      return 'Anúncio Rodapé - 728x90'
    } else if (size === '300x250') {
      return 'Anúncio Lateral - 300x250'
    } else if (size === '728x90') {
      return 'Anúncio Banner - 728x90'
    }
    return 'Seu anúncio aqui'
  }

  return (
    <div className={`ad-slot ${type ? `ad-slot-${type}` : ''} ${className}`}>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500 mb-1">
          {getAdContent()}
        </div>
        <div className="text-xs text-gray-400">
          AdSense / Afiliados
        </div>
      </div>
    </div>
  )
}
