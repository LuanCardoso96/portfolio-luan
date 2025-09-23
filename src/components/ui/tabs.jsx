import React from 'react'

export const Tabs = ({ 
  value, 
  onValueChange, 
  children, 
  className = '' 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-100 p-1 rounded-full ${className}`}>
      <div className="flex gap-1">
        {children}
      </div>
    </div>
  )
}

export const TabsTrigger = ({ 
  value, 
  children, 
  className = '',
  onClick 
}) => {
  const isActive = value === true // Será passado pelo componente pai
  
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, children, className = '' }) => {
  return (
    <div className={`mt-6 ${className}`}>
      {children}
    </div>
  )
}