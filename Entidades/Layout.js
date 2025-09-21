import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { 
  Menu, 
  X, 
  Home, 
  Newspaper, 
  ShoppingBag, 
  User as UserIcon,
  LogIn,
  LogOut,
  Settings,
  Phone,
  Mail,
  Instagram,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const isActive = (pageName) => {
    return currentPageName === pageName || location.pathname === createPageUrl(pageName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 font-bold text-xl text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                LC
              </div>
              <span>Luan Cardoso</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to={createPageUrl("Home")}
                className={`font-medium transition-colors ${
                  isActive("Home") ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                }`}
              >
                Home
              </Link>
              <Link
                to={createPageUrl("News")}
                className={`font-medium transition-colors ${
                  isActive("News") ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                }`}
              >
                Notícias
              </Link>
              <Link
                to={createPageUrl("Sales")}
                className={`font-medium transition-colors ${
                  isActive("Sales") ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                }`}
              >
                Vendas
              </Link>
              <Link
                to={createPageUrl("Privacy")}
                className={`font-medium transition-colors ${
                  isActive("Privacy") ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                }`}
              >
                Privacidade
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-slate-200">
                {isLoading ? (
                  <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
                ) : user ? (
                  <div className="flex items-center gap-3">
                    {user.role === 'admin' && (
                      <Link
                        to={createPageUrl("Admin")}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
                      >
                        <Settings className="w-4 h-4" />
                        Admin
                      </Link>
                    )}
                    <Button variant="ghost" onClick={handleLogout} className="text-slate-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-700">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
            <nav className="px-4 py-6 space-y-6">
              <div className="space-y-4">
                <Link
                  to={createPageUrl("Home")}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("Home")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to={createPageUrl("News")}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("News")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Newspaper className="w-5 h-5" />
                  Notícias
                </Link>
                <Link
                  to={createPageUrl("Sales")}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("Sales")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Vendas
                </Link>
                <Link
                  to={createPageUrl("Privacy")}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("Privacy")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  Privacidade
                </Link>
              </div>

              <hr className="border-slate-200" />

              {/* Mobile User Section */}
              {isLoading ? (
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded animate-pulse" />
                      <div className="h-2 bg-slate-200 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : user ? (
                <div className="space-y-4">
                  <div className="px-4 py-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.full_name}</p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {user.role === 'admin' && (
                    <Link
                      to={createPageUrl("Admin")}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      Painel Admin
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="px-4">
                  <Button 
                    onClick={() => {
                      handleLogin();
                      closeMenu();
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 justify-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar na conta
                  </Button>
                </div>
              )}

              <hr className="border-slate-200" />

              {/* Contact Links */}
              <div className="px-4 space-y-4">
                <h3 className="font-semibold text-slate-900">Contato</h3>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/5511960990726"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 hover:text-green-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:luancr72024@gmail.com"
                    className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <Mail className="w-4 h-4" />
                    E-mail
                  </a>
                  <a
                    href="https://instagram.com/luancardoso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 hover:text-pink-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                  <a
                    href="https://github.com/luancardoso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                    onClick={closeMenu}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  LC
                </div>
                <span className="font-bold text-xl">Luan Cardoso</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Desenvolvedor especializado em criar soluções digitais que geram resultados reais 
                para empresas e empreendedores.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/5511960990726"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href="mailto:luancr72024@gmail.com"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="E-mail"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/luancardoso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/luancardoso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <Link to={createPageUrl("Home")} className="block text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to={createPageUrl("News")} className="block text-slate-400 hover:text-white transition-colors">
                  Notícias
                </Link>
                <Link to={createPageUrl("Sales")} className="block text-slate-400 hover:text-white transition-colors">
                  Vendas
                </Link>
                <Link to={createPageUrl("Privacy")} className="block text-slate-400 hover:text-white transition-colors">
                  Privacidade
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <div className="space-y-2 text-slate-400">
                <p>Apps Mobile</p>
                <p>Sites & Landing Pages</p>
                <p>Tráfego Pago</p>
                <p>Consultoria Digital</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-800 my-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 Luan Cardoso. Todos os direitos reservados.
            </p>
            <p className="text-slate-400 text-xs">
              ⚠️ Este site contém links de afiliado. Podemos receber comissões por compras realizadas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}