import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){ 
    super(props); 
    this.state = { hasError: false, error: null } 
  }
  
  static getDerivedStateFromError(error){ 
    return { hasError: true, error } 
  }
  
  componentDidCatch(error, info){ 
    console.error('UI error:', error, info) 
  }
  
  render(){
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto p-6 text-red-700">
          <h2 className="text-xl font-bold mb-2">Ops, algo quebrou na interface.</h2>
          <pre className="bg-red-50 border border-red-200 rounded p-3 overflow-auto text-sm">
            {String(this.state.error)}
          </pre>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
