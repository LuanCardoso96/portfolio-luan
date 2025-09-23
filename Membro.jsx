import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { MemberContent } from "@/entities/MemberContent";
import { Apps } from "@/entities/Apps";
import { createPageUrl } from "@/utils";
import {
  Lock,
  Star,
  Crown,
  Play,
  Download,
  FileText,
  Video,
  BookOpen,
  TrendingUp,
  Users,
  Calendar,
  Award,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Membros() {
  const [currentUser, setCurrentUser] = useState(null);
  const [memberContent, setMemberContent] = useState([]);
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Esta função agora protege APENAS esta página.
    checkAuthenticationRequired();
  }, []);

  const checkAuthenticationRequired = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Carregar conteúdo apenas se o usuário for membro ativo
      const now = new Date();
      const membershipExpires = user.membership_expires_at ? new Date(user.membership_expires_at) : null;
      if (membershipExpires && membershipExpires > now) {
        const [content, appsData] = await Promise.all([
          MemberContent.list("-created_date", 20).catch(() => []),
          Apps.list().catch(() => [])
        ]);
        setMemberContent(content);
        setApps(appsData.filter(app => app.active));
      }
    } catch (error) {
      // CORREÇÃO CRÍTICA: Se falhar, apenas define o usuário como nulo.
      // NÃO força o login para o site inteiro.
      setCurrentUser(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch(e) {
      console.error(e)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando credenciais...</p>
        </div>
      </div>
    );
  }

  // Se, após a verificação, não houver usuário, esta página mostra o bloqueio.
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md mx-auto text-center shadow-2xl">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6">
              Esta é uma área exclusiva para membros. Por favor, faça login para continuar.
            </p>
            <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleLogin}>
                Fazer Login ou Cadastrar
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se o usuário está logado, mas não é membro, mostra a tela para assinar.
  const now = new Date();
  const membershipExpires = currentUser.membership_expires_at ? new Date(currentUser.membership_expires_at) : null;
  const isMember = membershipExpires && membershipExpires > now;

  if (!isMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg mx-auto text-center shadow-2xl">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Torne-se um Membro Premium</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6">
              Olá, {currentUser.full_name}! Para acessar nossos conteúdos, apps e tutoriais, você precisa de uma assinatura ativa.
            </p>
            <a href={createPageUrl("Assinatura")}>
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Ver Planos de Assinatura
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Conteúdo visível apenas para membros logados e ativos.
  const getContentIcon = (type) => {
    const icons = {
      article: FileText,
      video: Video,
      tutorial: BookOpen,
      download: Download
    };
    return icons[type] || FileText;
  };

  const getContentTypeLabel = (type) => {
    const labels = {
      article: "Artigo",
      video: "Vídeo",
      tutorial: "Tutorial",
      download: "Download"
    };
    return labels[type] || "Conteúdo";
  };

  const featuredContent = memberContent.filter(c => c.featured);
  const regularContent = memberContent.filter(c => !c.featured);
  const featuredApps = apps.filter(app => app.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Área Exclusiva de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Membros</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bem-vindo, {currentUser.full_name}! Aproveite seus benefícios.
          </p>
        </div>
        {/* ... O resto do JSX para membros logados ... */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Premium</div>
              <div className="text-sm text-gray-500">Status</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Date(currentUser.created_date).toLocaleDateString('pt-BR')}
              </div>
              <div className="text-sm text-gray-500">Membro desde</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{memberContent.length}</div>
              <div className="text-sm text-gray-500">Conteúdos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{apps.length}</div>
              <div className="text-sm text-gray-500">Apps</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}