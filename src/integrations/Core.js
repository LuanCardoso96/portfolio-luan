// Stub para InvokeLLM
export const InvokeLLM = async ({ prompt, response_json_schema }) => {
  console.log('InvokeLLM chamado com:', { prompt, response_json_schema })
  
  // Simular resposta para desenvolvimento
  return {
    articles: [
      {
        title: 'Notícia gerada por IA',
        description: 'Esta é uma notícia gerada automaticamente.',
        url: 'https://example.com/ai-news/1',
        image_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=250&fit=crop',
        source: 'IA Generator'
      }
    ]
  }
}
