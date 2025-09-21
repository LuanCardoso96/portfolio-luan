import React, { useState, useEffect } from "react";
import { News } from "@/entities/News";
import { Product } from "@/entities/Product";
import { Project } from "@/entities/Project";
import { User } from "@/entities/User";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Star,
  ExternalLink,
  MessageCircle,
  Mail,
  Github,
  Code,
  Palette,
  Zap,
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/NewsCard";
import { ProductCard } from "@/components/ProductCard";
import { ProjectCard } from "@/components/ProjectCard";
import { AdSlot } from "@/components/AdSlot";

export default function HomePage() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const loadData = async () => {
    try {
      const [news, products, projects] = await Promise.all([
        News.filter({ is_featured: true }, '-created_date', 3),
        Product.filter({ is_featured: true }, '-created_date', 3),
        Project.filter({ is_featured: true }, 'order', 6)
      ]);
      
      setFeaturedNews(news);
      setFeaturedProducts(products);
      setFeaturedProjects(projects);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const services = [
    {
      icon: Smartphone,
      title: "Apps Mobile",
      description: "Desenvolvimento de aplicativos iOS e Android que convertem usuários em clientes.",
      features: ["React Native", "Flutter", "PWA"],
      cta: "Criar meu app"
    },
    {
      icon: Globe,
      title: "Sites & Landing Pages",
      description: "Sites responsivos e landing pages otimizadas para alta conversão.",
      features: ["WordPress", "React", "SEO"],
      cta: "Fazer meu site"
    },
    {
      icon: TrendingUp,
      title: "Tráfego Pago",
      description: "Gestão profissional de campanhas Google Ads e Facebook Ads.",
      features: ["Google Ads", "Meta Ads", "Analytics"],
      cta: "Aumentar vendas"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-10" />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjciLz48L2c+PC9nPjwvc3ZnPg==")'}} />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200 mb-8">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Soluções Digitais Profissionais</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
              Transformo ideias em
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                produtos digitais
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Apps mobile, sites profissionais e campanhas de tráfego que 
              <strong className="text-indigo-600"> geram resultados reais</strong> para o seu negócio.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href="https://wa.me/5511960990726" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
              <a 
                href="mailto:luancr72024@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full border-2 border-slate-200 hover:border-indigo-300 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Enviar E-mail
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">50+</div>
                <div className="text-sm text-slate-500">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm text-slate-500">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">24h</div>
                <div className="text-sm text-slate-500">Suporte</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">3+</div>
                <div className="text-sm text-slate-500">Anos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <AdSlot size="728x90" label="Espaço Publicitário" />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Serviços que <span className="text-indigo-600">entregam resultados</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Soluções completas para digitalizar e acelerar o crescimento do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <a 
                    href="https://wa.me/5511960990726" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-200 group-hover:shadow-lg transform group-hover:scale-105"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Portfólio em <span className="text-indigo-600">destaque</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Alguns dos projetos que desenvolvi para clientes reais
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-200"
              >
                Ver todos os projetos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Destaques do <span className="text-indigo-600">dia</span>
                </h2>
                <p className="text-xl text-slate-600">
                  As últimas notícias que você precisa saber
                </p>
              </div>
              <Link 
                to="/noticias"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-200"
              >
                Ver todas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <NewsCard key={news.id} n={news} />
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link 
                to="/noticias"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-200"
              >
                Ver todas as notícias
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Produtos <span className="text-green-600">em destaque</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Produtos selecionados com qualidade garantida
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} p={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/vendas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200"
              >
                Ver todos os produtos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Pronto para <span className="text-indigo-600">decolar</span> seu negócio?
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Entre em contato e vamos conversar sobre como posso ajudar 
              a transformar suas ideias em realidade digital.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <a 
                href="https://wa.me/5511960990726" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
              <a 
                href="mailto:luancr72024@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                E-mail
              </a>
            </div>

            {!user && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-slate-600 mb-4">
                  Quer receber novidades exclusivas?
                </p>
                <Button asChild>
                  <Link to="/admin">
                    Criar conta grátis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}