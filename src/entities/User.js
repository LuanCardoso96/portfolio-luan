// Stub para User entity
export class User {
  static async me() {
    // Simular usuário logado para desenvolvimento
    return {
      id: '1',
      email: 'test@example.com',
      full_name: 'Usuário Teste',
      membership_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_date: new Date().toISOString()
    }
  }

  static async login() {
    // Simular login
    localStorage.setItem('auth', '1')
    return { success: true }
  }

  static async logout() {
    // Simular logout
    localStorage.removeItem('auth')
    return { success: true }
  }
}
