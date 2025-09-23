// Stub para NewsItems entity
export class NewsItems {
  static async list(orderBy = '-pub_date', limit = 10) {
    // Retornar notícias mock para desenvolvimento
    return [
      {
        id: '1',
        title: 'Notícia de exemplo sobre Marvel',
        description: 'Esta é uma notícia de exemplo sobre o universo Marvel.',
        url: 'https://example.com/news/1',
        image_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=250&fit=crop',
        pub_date: new Date().toISOString(),
        category: 'marvel_dc',
        source: 'Exemplo News'
      },
      {
        id: '2',
        title: 'Fofoca sobre celebridade',
        description: 'Esta é uma fofoca de exemplo sobre celebridades.',
        url: 'https://example.com/news/2',
        image_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=250&fit=crop',
        pub_date: new Date().toISOString(),
        category: 'fofocas',
        source: 'Fofocas News'
      }
    ]
  }

  static async create(data) {
    console.log('Criando notícia:', data)
    return { id: Date.now().toString(), ...data }
  }

  static async delete(id) {
    console.log('Deletando notícia:', id)
    return { success: true }
  }
}
