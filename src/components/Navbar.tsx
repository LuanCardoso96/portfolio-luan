import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center text-white text-sm font-bold">LC</span>
          Luan Cardoso — Portfólio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-slate-700 hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 font-medium' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => 
              `text-slate-700 hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 font-medium' : ''}`
            }
          >
            Portfólio
          </NavLink>
          <div className="group relative">
            <NavLink 
              to="/noticias" 
              className={({ isActive }) => 
                `text-slate-700 hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 font-medium' : ''}`
              }
            >
              Notícias
            </NavLink>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg p-2 mt-2 min-w-[200px]">
              <Link 
                className="block px-3 py-2 hover:bg-slate-50 rounded text-sm" 
                to="/noticias/marvel-dc"
              >
                Marvel & DC
              </Link>
              <Link 
                className="block px-3 py-2 hover:bg-slate-50 rounded text-sm" 
                to="/noticias/fofocas"
              >
                Fofocas
              </Link>
            </div>
          </div>
          <NavLink 
            to="/vendas" 
            className={({ isActive }) => 
              `text-slate-700 hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 font-medium' : ''}`
            }
          >
            Vendas
          </NavLink>
          <NavLink 
            to="/admin" 
            className={({ isActive }) => 
              `text-slate-700 hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 font-medium' : ''}`
            }
          >
            Admin
          </NavLink>
          <a 
            href="#contato" 
            className="text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Contato
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className="block px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólio
            </Link>
            <div className="px-3 py-2 text-slate-500 text-sm font-medium">Notícias</div>
            <Link 
              to="/noticias/marvel-dc" 
              className="block px-6 py-2 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Marvel & DC
            </Link>
            <Link 
              to="/noticias/fofocas" 
              className="block px-6 py-2 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Fofocas
            </Link>
            <Link 
              to="/vendas" 
              className="block px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendas
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <a 
              href="#contato" 
              className="block px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
