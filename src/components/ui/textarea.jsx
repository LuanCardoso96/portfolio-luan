import React from 'react'

export const Textarea = ({ className = '', ...props }) => (
  <textarea 
    className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
)
