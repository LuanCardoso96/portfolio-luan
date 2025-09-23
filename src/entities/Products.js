// Stub para Products entity
export class Products {
  static async list() {
    // Retornar produtos mock para desenvolvimento
    return [
      {
        id: '1',
        title: 'Produto de Exemplo',
        price: 'R$ 29,90',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        affiliate_url: 'https://example.com/product/1',
        category: 'eletrônicos',
        featured: true,
        active: true
      }
    ]
  }

  static async create(data) {
    console.log('Criando produto:', data)
    return { id: Date.now().toString(), ...data }
  }

  static async delete(id) {
    console.log('Deletando produto:', id)
    return { success: true }
  }
}
