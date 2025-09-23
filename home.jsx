import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { SiteConfig, NewsItems } from "@/entities/all";
import {
  Smartphone,
  Globe,
  TrendingUp,
  ArrowRight,
  Star,
  MessageSquare,
  Calendar,
  ExternalLink,
  Download,
  Zap,
  User as UserIcon
} from "lucide-react";

import ServiceCard from "./Components/home/ServiceCard";
import ProjectCard from "./Components/home/ProjectCard";
import NewsHighlight from "./Components/home/NewsHighlight";
import AdSlot from "./Components/commom/AdSlot";
import TestimonialMarquee from "./src/components/TestimonialMarquee";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [siteConfig, setSiteConfig] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    loadData();
    handleInstallPrompt();
  }, []);

  const loadData = async () => {
    try {
      // Carregar configurações de forma silenciosa
      const configs = await SiteConfig.list().catch(() => []);
      if (configs.length > 0) {
        setSiteConfig(configs[0]);
      }

      // Carregar últimas notícias de forma silenciosa
      const news = await NewsItems.list("-pub_date", 6).catch(() => []);
      setLatestNews(news);
    } catch (error) {
      // Silenciar erros para manter o site público
      console.log("Dados não carregados, mas site continua funcionando");
    }
  };

  const handleInstallPrompt = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      console.log('PWA install prompt disponível');
    });
  };

  const installApp = async () => {
    if (!installPrompt) return;

    try {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch (error) {
      console.log('Erro ao instalar PWA:', error);
    }
  };

  const services = [
    {
      icon: Smartphone,
      title: "Apps Mobile",
      description: "Desenvolvimento de aplicativos iOS e Android nativos e híbridos",
      features: ["React Native", "Flutter", "App Store", "Play Store"],
      color: "bg-blue-500"
    },
    {
      icon: Globe,
      title: "Sites & Landing Pages",
      description: "Sites responsivos e landing pages de alta conversão",
      features: ["WordPress", "React", "SEO", "Performance"],
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Tráfego Pago",
      description: "Gestão de campanhas Google Ads, Facebook Ads e Instagram",
      features: ["Google Ads", "Facebook", "Analytics", "ROI"],
      color: "bg-purple-500"
    }
  ];

  const projects = [
    {
      title: "App E-commerce Fashion",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      description: "Aplicativo de moda com carrinho, pagamentos e sistema de reviews",
      tech: ["React Native", "Firebase", "Stripe"],
      link: "#"
    },
    {
      title: "Landing Page SaaS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      description: "Landing page para software B2B com conversão de 15%",
      tech: ["Next.js", "Tailwind", "Analytics"],
      link: "#"
    },
    {
      title: "Campanha Google Ads",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      description: "Campanha que gerou 300% ROI para cliente do e-commerce",
      tech: ["Google Ads", "GTM", "Data Studio"],
      link: "#"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Ad Banner Top */}
      <AdSlot type="top" />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#2563eb]/10 to-[#7c3aed]/10 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="justify-self-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d0165aa407ff2c6effbfaa/b1746b9bd_WhatsAppImage2025-09-23at142533.jpg"
              alt="Foto profissional de Luan Cardoso"
              className="w-[360px] max-w-full rounded-2xl shadow-xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Luan Cardoso — <span className="text-indigo-600">Desenvolvedor Web & Criador de Apps</span>
            </h1>
            <p className="text-gray-600 mt-4">
              Sou desenvolvedor web, criador de aplicativos e gestor de tráfego pago. Tenho 28 anos, casado e pai de um filho. Transformo ideias em projetos digitais prontos para gerar resultados.
            </p>
            <p className="text-gray-600 mt-4">
              Sou o criador do aplicativo <strong>Desafio Concurso</strong>, disponível na Play Store.
            </p>
            <a
              href={import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/5511960990726'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold"
            >
              <MessageSquare className="w-5 h-5" />
              Falar no WhatsApp
            </a>
            <div className="grid grid-cols-4 gap-6 mt-8">
              <div><div className="text-2xl font-extrabold">50+</div><div className="text-sm text-gray-500">Projetos</div></div>
              <div><div className="text-2xl font-extrabold">98%</div><div className="text-sm text-gray-500">Satisfação</div></div>
              <div><div className="text-2xl font-extrabold">300%</div><div className="text-sm text-gray-500">ROI</div></div>
              <div><div className="text-2xl font-extrabold">24h</div><div className="text-sm text-gray-500">Suporte</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="portfolio">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Serviços que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Geram Resultados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções digitais completas para fazer seu negócio crescer no mundo online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://wa.me/5511960990726"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Solicitar orçamento gratuito
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Projetos em <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Destaque</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Casos de sucesso que demonstram a qualidade e eficácia das nossas soluções
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner Middle */}
      <AdSlot size="300x250" className="mx-auto" />

      {/* News Highlights */}
      {latestNews.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Destaques do <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Dia</span>
              </h2>
              <Link
                to={createPageUrl("Noticias")}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Ver todas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.slice(0, 6).map((news) => (
                <NewsHighlight key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialMarquee />

      {/* Contact Section */}
      <section id="contato" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Vamos Criar Algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Incrível</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Entre em contato agora e descubra como podemos transformar sua ideia em realidade
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Fale Comigo</h3>
                <div className="space-y-6">
                  <a
                    href="https://wa.me/5511960990726"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm">Resposta em minutos</div>
                    </div>
                  </a>

                  <a
                    href="mailto:luancr72024@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm">luancr72024@gmail.com</div>
                    </div>
                  </a>

                  <div className="p-4 rounded-xl bg-purple-50 text-purple-700">
                    <div className="flex items-center gap-4 mb-2">
                      <Calendar className="w-6 h-6" />
                      <div className="font-semibold">Horário de Atendimento</div>
                    </div>
                    <div className="text-sm ml-10">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Vantagens</h3>
                <div className="space-y-4">
                  {[
                    "Orçamento gratuito e sem compromisso",
                    "Consultoria personalizada para seu negócio",
                    "Suporte contínuo pós-entrega",
                    "Resultados mensuráveis e comprovados"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner Bottom */}
      <AdSlot type="bottom" />
    </div>
  );
}