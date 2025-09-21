export function createPageUrl(name: string) {
  // mapeia nomes lógicos para rotas do React Router
  const map: Record<string, string> = {
    Home: "/",
    News: "/noticias",
    Login: "/acesso",
    Vendas: "/vendas",
    Admin: "/admin",
  };
  return map[name] || "/";
}
