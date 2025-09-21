import React from "react";
import { Navbar } from "@/components/Navbar";
import { AdBanner } from "@/components/AdBanner";
import { MessageCircle, Mail, Github, Instagram } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="mt-12 bg-slate-900 text-white">
        <AdBanner position="bottom" />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Luan Cardoso</h3>
              <p className="text-slate-300 mb-4">
                Desenvolvedor Full Stack especializado em soluções digitais que geram resultados reais para seu negócio.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/seuuser" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/seu_perfil" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Desenvolvimento de Apps</li>
                <li>Sites & Landing Pages</li>
                <li>Tráfego Pago</li>
                <li>Consultoria Digital</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/5511960990726" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href="mailto:luancr72024@gmail.com"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  E-mail
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p className="mb-2">
              © 2025 Luan Cardoso. Todos os direitos reservados.
            </p>
            <p className="text-sm">
              Este site contém links de afiliados. Ao clicar em produtos afiliados, você ajuda a manter este site funcionando.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
