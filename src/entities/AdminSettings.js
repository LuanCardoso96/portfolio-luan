// Stub para AdminSettings entity
export class AdminSettings {
  static async list() {
    return [
      {
        id: '1',
        setting_key: 'auto_fetch_news',
        setting_value: 'false',
        description: 'Busca automática de notícias'
      }
    ]
  }

  static async filter({ setting_key }) {
    const settings = await this.list()
    return settings.filter(s => s.setting_key === setting_key)
  }

  static async update(id, data) {
    console.log('Atualizando configuração:', id, data)
    return { success: true }
  }

  static async create(data) {
    console.log('Criando configuração:', data)
    return { id: Date.now().toString(), ...data }
  }
}
