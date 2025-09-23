
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  MessageSquare, 
  Code, 
  TrendingUp, 
  Smartphone, 
  Award, 
  Users,
  Heart,
  Target,
  Briefcase,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Sobre() {
  const whatsappUrl = "https://wa.me/5511960990726";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Luan Cardoso</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvedor, empreendedor e pai dedicado transformando ideias em projetos digitais de sucesso
          </p>
        </div>

        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-[320px]">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d0165aa407ff2c6effbfaa/b1746b9bd_WhatsAppImage2025-09-23at142533.jpg"
                alt="Foto profissional de Luan Cardoso"
                className="w-full h-auto object-contain rounded-[18px] shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Code className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Olá, eu sou o Luan! 👋</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Sou <strong>desenvolvedor web e criador de aplicativos</strong> com 28 anos, casado e pai dedicado de um filho. 
                Minha missão é transformar ideias em projetos digitais funcionais e lucrativos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Atuo como <strong>gestor de tráfego pago</strong>, ajudando negócios a crescerem com estratégias 
                inteligentes de anúncios online. Além disso, sou o criador do aplicativo 
                <strong> Desafio Concurso</strong>, disponível na Play Store, que já impacta milhares 
                de pessoas que buscam conhecimento e crescimento.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tenho paixão por <strong>tecnologia, marketing e inovação</strong>, unindo técnica e estratégia 
                para entregar sites profissionais, aplicativos modernos e soluções digitais completas.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-blue-800 font-semibold text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Se você busca alguém que entenda de tecnologia e ao mesmo tempo pense em resultados reais, está no lugar certo!
              </p>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                <MessageSquare className="w-5 h-5 mr-2" />
                Vamos Conversar no WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">28</div>
              <div className="text-sm text-gray-600">Anos de Idade</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">App na Play Store</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Usuários Impactados</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Pai</div>
              <div className="text-sm text-gray-600">e Marido Dedicado</div>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Especialidades</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Desenvolvimento Web</h4>
                <p className="text-gray-600 mb-4">
                  Criação de sites profissionais, landing pages de alta conversão e aplicações web modernas.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• React & Next.js</li>
                  <li>• WordPress</li>
                  <li>• SEO Otimizado</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Apps Mobile</h4>
                <p className="text-gray-600 mb-4">
                  Desenvolvimento de aplicativos Android e iOS nativos e híbridos para diversas necessidades.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• React Native</li>
                  <li>• Play Store/App Store</li>
                  <li>• UI/UX Design</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Tráfego Pago</h4>
                <p className="text-gray-600 mb-4">
                  Gestão estratégica de campanhas no Google Ads, Facebook e Instagram para maximizar ROI.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Google Ads</li>
                  <li>• Facebook & Instagram</li>
                  <li>• Analytics & Conversão</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* App Highlight */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  Desafio Concurso
                </h3>
                <p className="text-xl text-blue-100 mb-6">
                  Meu aplicativo de sucesso que ajuda milhares de pessoas a estudarem para concursos públicos de forma gamificada e eficiente.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.desafioconcurso" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Ver na Play Store
                  </a>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                  <Smartphone className="w-24 h-24 mx-auto text-white mb-4" />
                  <p className="text-2xl font-bold">1000+</p>
                  <p className="text-blue-200">Downloads</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Vamos Trabalhar Juntos?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Se você tem um projeto em mente ou precisa de ajuda com desenvolvimento web, apps ou tráfego pago, 
              entre em contato comigo. Vamos transformar sua ideia em realidade!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </Button>
              </a>
              <Link to="/#contato">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Ver Mais Contatos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
