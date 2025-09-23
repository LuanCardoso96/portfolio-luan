// Stub para MemberContent entity
export class MemberContent {
  static async list(orderBy = '-created_date', limit = 20) {
    return [
      {
        id: '1',
        title: 'Conteúdo Exclusivo para Membros',
        description: 'Este é um conteúdo exclusivo para membros premium.',
        type: 'article',
        featured: true,
        created_date: new Date().toISOString()
      }
    ]
  }
}
