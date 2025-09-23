import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import { NewsItems, Products, NewsFeeds, AdminSettings, User } from "@/entities/all";
import { InvokeLLM } from "@/integrations/Core";
import { 
  Settings, 
  Plus, 
  Download, 
  UploadCloud,
  Newspaper, 
  ShoppingCart, 
  Star,
  Users,
  Rss,
  FolderOpen
} from "lucide-react";

// Novos componentes
import NewsFormNew from "./src/components/admin/NewsFormNew";
import NewsListNew from "./src/components/admin/NewsListNew";
import ProjectsTableNew from "./src/components/admin/ProjectsTableNew";
import FeedManager from "./Components/admin/FeedManager";
import UserManagement from "./Components/admin/UserManagement";
import MemberContentManager from "./Components/admin/MemberContentManager";

// Componentes UI
import { Button } from "./src/components/ui/Button";
import { Card } from "./src/components/ui/Card";
import { Badge } from "./src/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/components/ui/Tabs";

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [news, setNews] = useState([]);
  const [products, setProducts] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isAutoFetchEnabled, setIsAutoFetchEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("news");

  const showMessage = useCallback((msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000);
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [newsData, productsData, feedsData, settings] = await Promise.all([
        NewsItems.list("-created_date", 50),
        Products.list("-created_date", 50),
        NewsFeeds.list(),
        AdminSettings.list()
      ]);
      
      setNews(newsData);
      setProducts(productsData);
      setFeeds(feedsData);
      
      const autoFetchSetting = settings.find(s => s.setting_key === "auto_fetch_news");
      setIsAutoFetchEnabled(autoFetchSetting?.setting_value === "true");
    } catch (error) {
      showMessage("Erro ao carregar dados: " + error.message, "error");
    }
  }, [showMessage]);

  const checkAdminAccess = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      await loadData();
    } catch (error) {
      // Se falhar, apenas define o usuário como nulo - não redireciona
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, [loadData]);

  useEffect(() => {
    checkAdminAccess();
  }, [checkAdminAccess]);

  // Remover qualquer marca Base44
  useEffect(() => {
    const removeBase44Elements = () => {
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        if (el.textContent && /edit with base44|feito com base44/i.test(el.textContent)) {
          el.remove();
        }
        if (el.id && /base44/i.test(el.id)) el.remove();
        if (el.className && /base44/i.test(el.className)) el.remove();
      });
    };
    
    removeBase44Elements();
    const interval = setInterval(removeBase44Elements, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestNews = async () => {
    setIsLoading(true);
    showMessage("Buscando notícias mais recentes...", "info");

    try {
      const activeFeeds = feeds.filter(f => f.active);
      let newNewsCount = 0;

      for (const feed of activeFeeds) {
        try {
          const prompt = `
            Crie 3 notícias ${feed.category === 'marvel_dc' ? 'sobre Marvel, DC Comics, super-heróis e universo cinematográfico' : 'de fofocas sobre celebridades, entretenimento e famosos'} 
            que sejam atuais e interessantes. 
            
            Para cada notícia, inclua:
            - título chamativo
            - descrição de 2-3 frases
            - URL fictícia mas realista
            - data atual
            - fonte (${feed.feed_name})
          `;

          const response = await InvokeLLM({
            prompt,
            response_json_schema: {
              type: "object",
              properties: {
                articles: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      url: { type: "string" },
                      image_url: { type: "string" },
                      source: { type: "string" }
                    }
                  }
                }
              }
            }
          });

          if (response.articles) {
            for (const article of response.articles) {
              const exists = news.some(n => 
                n.title.toLowerCase().includes(article.title.toLowerCase().substring(0, 20))
              );

              if (!exists) {
                await NewsItems.create({
                  title: article.title,
                  description: article.description,
                  url: article.url,
                  image_url: article.image_url || getRandomNewsImage(feed.category),
                  pub_date: new Date().toISOString(),
                  category: feed.category,
                  source: article.source
                });
                newNewsCount++;
              }
            }
          }
        } catch (error) {
          console.error(`Erro ao processar feed ${feed.feed_name}:`, error);
        }
      }

      await loadData();
      showMessage(`✅ ${newNewsCount} novas notícias adicionadas!`, "success");
    } catch (error) {
      showMessage("Erro ao buscar notícias: " + error.message, "error");
    }
    
    setIsLoading(false);
  };

  const getRandomNewsImage = (category) => {
    const marvelDcImages = [
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1620662736427-b8a2b6b4ed30?w=400&h=250&fit=crop"
    ];
    
    const fofocasImages = [
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
    ];

    const images = category === "marvel_dc" ? marvelDcImages : fofocasImages;
    return images[Math.floor(Math.random() * images.length)];
  };

  const deleteNewsItem = async (id) => {
    try {
      await NewsItems.delete(id);
      await loadData();
      showMessage("Notícia excluída com sucesso!", "success");
    } catch (error) {
      showMessage("Erro ao excluir notícia: " + error.message, "error");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await Products.delete(id);
      await loadData();
      showMessage("Produto excluído com sucesso!", "success");
    } catch (error) {
      showMessage("Erro ao excluir produto: " + error.message, "error");
    }
  };

  const toggleAutoFetch = async (enabled) => {
    try {
      setIsAutoFetchEnabled(enabled);
      
      const existingSetting = await AdminSettings.filter({ setting_key: "auto_fetch_news" });
      
      if (existingSetting.length > 0) {
        await AdminSettings.update(existingSetting[0].id, { 
          setting_value: enabled ? "true" : "false" 
        });
      } else {
        await AdminSettings.create({
          setting_key: "auto_fetch_news",
          setting_value: enabled ? "true" : "false",
          description: "Busca automática de notícias habilitada"
        });
      }
      
      showMessage(`Busca automática ${enabled ? 'habilitada' : 'desabilitada'}!`, "success");
    } catch (error) {
      showMessage("Erro ao alterar configuração: " + error.message, "error");
    }
  };

  const handleNewsSuccess = () => {
    loadData();
    showMessage("Notícia criada com sucesso!", "success");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões de administrador...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <div className="text-center p-8">
            <Settings className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
            <p className="text-gray-600 mb-6">Apenas administradores podem acessar esta área.</p>
            <Button onClick={() => window.location.href = "/"}>
              Voltar ao Início
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "news", label: "Notícias", icon: Newspaper, count: news.length },
    { id: "products", label: "Produtos", icon: ShoppingCart, count: products.length },
    { id: "member_content", label: "Conteúdo Membros", icon: Star },
    { id: "users", label: "Usuários", icon: Users },
    { id: "feeds", label: "Feeds RSS", icon: Rss }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Painel <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Administrativo</span>
          </h1>
          <p className="text-gray-500 mt-1">Gerencie notícias, produtos e configurações do seu site</p>
        </div>

        {/* Barra de ações */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/admin/noticias">
              <Button variant="solid">
                <Newspaper className="w-4 h-4 mr-2" />
                Gerenciar Notícias
              </Button>
            </Link>
                  <Link to="/admin/vendas">
                    <Button variant="solid">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Gerenciar Vendas
                    </Button>
                  </Link>
                  <Link to="/admin/portfolio">
                    <Button variant="solid">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Gerenciar Portfolio
                    </Button>
                  </Link>
                  <Link to="/admin/downloads">
                    <Button variant="solid">
                      <Download className="w-4 h-4 mr-2" />
                      Gerenciar Downloads
                    </Button>
                  </Link>
            <Button variant="ghost">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="ghost">
              <UploadCloud className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="default">
              {news.length + products.length} itens
            </Badge>
          </div>
        </div>

        {/* Mensagens */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'error' 
              ? 'bg-red-50 border border-red-200 text-red-800' 
              : messageType === 'info'
              ? 'bg-blue-50 border border-blue-200 text-blue-800'
              : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id === activeTab}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="default" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Conteúdo das abas */}
          <TabsContent>
            {activeTab === "news" && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-5">
                  <NewsFormNew onSuccess={handleNewsSuccess} />
                </div>
                <div className="col-span-12 md:col-span-7">
                  <NewsListNew
                    news={news}
                    onDelete={deleteNewsItem}
                    onFetchNews={fetchLatestNews}
                    isAutoFetchEnabled={isAutoFetchEnabled}
                    onToggleAutoFetch={toggleAutoFetch}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <ProjectsTableNew
                projects={products}
                onDelete={deleteProduct}
                onEdit={(product) => console.log('Editar produto:', product)}
              />
            )}

            {activeTab === "member_content" && (
              <MemberContentManager />
            )}

            {activeTab === "users" && (
              <UserManagement />
            )}

            {activeTab === "feeds" && (
              <FeedManager 
                feeds={feeds} 
                onUpdate={() => { 
                  loadData(); 
                  showMessage("Feeds atualizados!", "success"); 
                }} 
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Espaço Publicitário */}
        <div className="mt-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl text-gray-400 flex items-center justify-center h-28">
            <div className="text-center">
              <div className="font-medium mb-1">Espaço Publicitário</div>
              <div className="text-sm">728×90</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}