import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "@/entities/User";
import { createPageUrl } from "@/utils";
import { 
  Menu, 
  X, 
  Home, 
  Newspaper, 
  ShoppingCart, 
  Mail, 
  Shield,
  LogIn,
  LogOut,
  Settings,
  Crown,
  Star,
  BookOpen,
  Rss,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Componente para links que podem ser âncoras
const NavLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      const targetId = to.substring(2);
      
      if (location.pathname === '/') {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  if (to.startsWith('/#')) {
    return (
      <a href={to} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Verificação opcional e silenciosa - NÃO bloqueia o site
    checkUserOptionally();
  }, []);

  const checkUserOptionally = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      // Falha é normal - site continua funcionando normalmente
      setCurrentUser(null);
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setCurrentUser(null);
      setIsMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isAdmin = currentUser?.email === "luancr71996@gmail.com";
  
  // Itens de navegação sempre disponíveis
  const getNavigationItems = () => {
    const publicItems = [
      { name: "Home", path: "/", icon: Home },
      { name: "Portfólio", path: "/#portfolio", icon: BookOpen },
      { name: "Notícias", path: createPageUrl("Noticias"), icon: Newspaper },
      { name: "Marvel & DC", path: createPageUrl("Noticias", { category: 'marvel_dc' }), icon: Rss },
      { name: "Fofocas", path: createPageUrl("Noticias", { category: 'fofocas' }), icon: Heart },
      { name: "Vendas", path: createPageUrl("Vendas"), icon: ShoppingCart },
      { name: "Contato", path: "/#contato", icon: Mail },
    ];
    
    if (isAdmin) {
      publicItems.push({ name: "Painel Admin", path: createPageUrl("Admin"), icon: Settings, isAdmin: true });
    }
    
    return publicItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">L</span>
              </div>
              <span>Luan Digital</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navigationItems.map((item) => {
                const isActive = 
                  (item.path === "/" && location.pathname === "/" && !location.hash) ||
                  (location.hash && item.path.endsWith(location.hash)) ||
                  (item.path !== "/" && location.pathname.includes(item.path.split('?')[0].replace("/pages/", "").replace(".html", "")));
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? item.isAdmin
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.isAdmin && <Crown className="w-3 h-3 text-purple-600" />}
                  </NavLink>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <Link to={createPageUrl("Membros")} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    {isAdmin ? (
                      <Crown className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Star className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      Minha Conta
                    </span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Área de Membros / Entrar</span>
                </Button>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-25 transition-opacity md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transition-transform transform md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">L</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Luan Digital</span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {currentUser ? (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  {isAdmin ? (
                    <Crown className="w-5 h-5 text-white" />
                  ) : (
                    <Star className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {currentUser.full_name || currentUser.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isAdmin ? "Administrador" : "Membro"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border-b border-gray-200 text-center">
              <p className="text-gray-600 mb-3">Faça login para acessar conteúdos exclusivos</p>
              <Button
                onClick={() => { handleLogin(); closeMenu(); }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <LogIn className="w-4 h-4 mr-2" />
                <span>Área de Membros / Entrar</span>
              </Button>
            </div>
          )}

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {[
                ...navigationItems,
                currentUser ? { name: "Minha Conta", path: createPageUrl("Membros"), icon: Star } : null
              ].filter(Boolean).map((item) => {
                 const isActive = 
                  (item.path === "/" && location.pathname === "/" && !location.hash) ||
                  (location.hash && item.path.endsWith(location.hash)) ||
                  (item.path !== "/" && location.pathname.includes(item.path.split('?')[0].replace("/pages/", "").replace(".html", "")));
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? item.isAdmin
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {item.isAdmin && <Crown className="w-4 h-4 text-purple-600 ml-auto" />}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {currentUser && (
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={() => { handleLogout(); closeMenu(); }}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">L</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Luan Digital</span>
              </div>
              <p className="text-gray-600 mb-4">
                Criando soluções digitais que geram resultados reais. 
                Especializado em desenvolvimento de aplicativos e estratégias de marketing digital.
              </p>
              <div className="flex space-x-4">
                <a href="https://wa.me/5511960990726" className="text-gray-400 hover:text-gray-600 transition-colors">
                  WhatsApp
                </a>
                <a href="mailto:luancr72024@gmail.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                  Email
                </a>
                <a href="https://instagram.com/luan.digital" className="text-gray-400 hover:text-gray-600 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Links Úteis</h3>
              <div className="space-y-2">
                <NavLink to="/" className="block text-gray-600 hover:text-gray-900 transition-colors">Home</NavLink>
                <NavLink to={createPageUrl("Noticias")} className="block text-gray-600 hover:text-gray-900 transition-colors">Notícias</NavLink>
                <NavLink to={createPageUrl("Vendas")} className="block text-gray-600 hover:text-gray-900 transition-colors">Vendas</NavLink>
                <NavLink to="/#contato" className="block text-gray-600 hover:text-gray-900 transition-colors">Contato</NavLink>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <div className="space-y-2 text-gray-600">
                <Link to={createPageUrl("Privacidade")} className="block text-gray-600 hover:text-gray-900 transition-colors">Política de Privacidade</Link>
                <Link to={createPageUrl("Termos")} className="block text-gray-600 hover:text-gray-900 transition-colors">Termos de Uso</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © Luan Cardoso. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">
                Links de afiliado podem gerar comissão
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}