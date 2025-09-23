// Stub para Apps entity
export class Apps {
  static async list() {
    return [
      {
        id: '1',
        name: 'Desafio Concurso',
        description: 'App para estudos de concursos públicos',
        download_url: 'https://play.google.com/store/apps/details?id=com.example.app',
        image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
        featured: true,
        active: true
      }
    ]
  }
}
