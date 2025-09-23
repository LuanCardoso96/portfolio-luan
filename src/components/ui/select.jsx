import React from 'react'

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
