import React from 'react'

export const Card = ({ 
  children, 
  className = '', 
  title, 
  icon: Icon,
  actions,
  ...props 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`} {...props}>
      {(title || actions) && (
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
)