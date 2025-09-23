import React from 'react'

export const Button = ({ children, className = '', onClick, ...props }) => (
  <button 
    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

export const Input = ({ className = '', ...props }) => (
  <input 
    className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
)

export const Textarea = ({ className = '', ...props }) => (
  <textarea 
    className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
)

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    {children}
  </div>
)

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
)

export const Badge = ({ children, className = '', variant = 'default' }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${className}`}>
    {children}
  </span>
)

export const Select = ({ children, value, onValueChange }) => (
  <select 
    value={value} 
    onChange={(e) => onValueChange(e.target.value)}
    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </select>
)

export const SelectContent = ({ children }) => children
export const SelectItem = ({ children, value }) => <option value={value}>{children}</option>
export const SelectTrigger = ({ children }) => children
export const SelectValue = ({ placeholder }) => placeholder

export const Tabs = ({ children, defaultValue }) => children
export const TabsList = ({ children }) => <div className="flex space-x-1">{children}</div>
export const TabsTrigger = ({ children, value }) => (
  <button className="px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700">
    {children}
  </button>
)
export const TabsContent = ({ children, value }) => <div>{children}</div>

export const Switch = ({ checked, onCheckedChange }) => (
  <input 
    type="checkbox" 
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
  />
)

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
)

export const Alert = ({ children, className = '' }) => (
  <div className={`p-4 rounded-md ${className}`}>
    {children}
  </div>
)

export const AlertDescription = ({ children }) => (
  <div className="text-sm">
    {children}
  </div>
)

export const Progress = ({ value, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div 
      className="bg-blue-600 h-2.5 rounded-full" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
)
