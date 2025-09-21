import React, { useState, useEffect } from "react";
import { News } from "@/entities/News";
import { Product } from "@/entities/Product";
import { Project } from "@/entities/Project";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  FileText, 
  ShoppingBag, 
  Settings,
  TrendingUp,
  Eye,
  Star
} from "lucide-react";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalProducts: 0,
    totalProjects: 0,
    totalUsers: 0,
    featuredNews: 0,
    featuredProducts: 0,
    featuredProjects: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [news, products, projects, users] = await Promise.all([
        News.list(),
        Product.list(),
        Project.list(),
        User.list()
      ]);

      setStats({
        totalNews: news.length,
        totalProducts: products.length,
        totalProjects: projects.length,
        totalUsers: users.length,
        featuredNews: news.filter(n => n.is_featured).length,
        featuredProducts: products.filter(p => p.is_featured).length,
        featuredProjects: projects.filter(p => p.is_featured).length
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total de Notícias",
      value: stats.totalNews,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
      subtitle: `${stats.featuredNews} em destaque`
    },
    {
      title: "Total de Produtos",
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: "text-purple-600",
      bg: "bg-purple-100",
      subtitle: `${stats.featuredProducts} em destaque`
    },
    {
      title: "Total de Projetos",
      value: stats.totalProjects,
      icon: Settings,
      color: "text-green-600",
      bg: "bg-green-100",
      subtitle: `${stats.featuredProjects} em destaque`
    },
    {
      title: "Usuários Cadastrados",
      value: stats.totalUsers,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      subtitle: "membros ativos"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill().map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-slate-200 rounded w-24" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Visão Geral</h2>
        <p className="text-slate-600">Resumo das principais métricas da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Gerenciar Notícias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 text-sm mb-4">
              Adicione, edite ou remova notícias do site
            </p>
            <div className="text-2xl font-bold text-blue-800">
              {stats.totalNews} notícias
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Gerenciar Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 text-sm mb-4">
              Adicione, edite ou remova produtos afiliados
            </p>
            <div className="text-2xl font-bold text-purple-800">
              {stats.totalProducts} produtos
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Gerenciar Projetos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 text-sm mb-4">
              Adicione, edite ou remova projetos do portfólio
            </p>
            <div className="text-2xl font-bold text-green-800">
              {stats.totalProjects} projetos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Insights de Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-800">
                {stats.featuredNews + stats.featuredProducts + stats.featuredProjects}
              </div>
              <p className="text-sm text-yellow-700">Itens em destaque</p>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-800">
                {stats.totalUsers}
              </div>
              <p className="text-sm text-indigo-700">Usuários registrados</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">
                {stats.totalNews + stats.totalProducts + stats.totalProjects}
              </div>
              <p className="text-sm text-green-700">Total de conteúdos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}