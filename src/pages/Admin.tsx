import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { News } from "@/entities/News";
import { Product } from "@/entities/Product";
import { Project } from "@/entities/Project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Download, Upload, Save } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"news" | "products" | "projects">("news");
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user, activeTab]);

  const checkAuth = async () => {
    const currentUser = await User.me();
    if (!currentUser) {
      // Show login form
      return;
    }
    setUser(currentUser);
  };

  const loadItems = async () => {
    try {
      let data: any[] = [];
      switch (activeTab) {
        case "news":
          data = await News.filter({}, "-created_date", 50);
          break;
        case "products":
          data = await Product.filter({}, "-created_date", 50);
          break;
        case "projects":
          data = await Project.filter({}, "order", 50);
          break;
      }
      setItems(data);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  const saveItem = (item: any) => {
    const key = `admin_${activeTab}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = existing.map((i: any) => i.id === item.id ? item : i);
    localStorage.setItem(key, JSON.stringify(updated));
    loadItems();
    setIsEditing(false);
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    const key = `admin_${activeTab}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = existing.filter((i: any) => i.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    loadItems();
  };

  const exportData = () => {
    const key = `admin_${activeTab}`;
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          const key = `admin_${activeTab}`;
          localStorage.setItem(key, JSON.stringify(data));
          loadItems();
        } catch (error) {
          alert("Erro ao importar arquivo JSON");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              await User.login(email, password);
              setUser(await User.me());
            }}>
              <div className="space-y-4">
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Painel <span className="text-indigo-600">Administrativo</span>
        </h1>
        <p className="text-slate-600">Gerencie conteúdo do site</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 rounded-full p-1">
          {["news", "products", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "news" ? "Notícias" : tab === "products" ? "Produtos" : "Projetos"}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button onClick={() => {
            setEditingItem({});
            setIsEditing(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <label className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            <Upload className="w-4 h-4 inline mr-2" />
            Importar
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>
        </div>
        <Badge variant="outline">
          {items.length} itens
        </Badge>
      </div>

      {/* Items Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.title}</div>
                      {item.summary && (
                        <div className="text-sm text-slate-500 line-clamp-1">{item.summary}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={item.is_featured ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}>
                        {item.is_featured ? "Destaque" : "Normal"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                            setIsEditing(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingItem.id ? "Editar" : "Adicionar"} {activeTab === "news" ? "Notícia" : activeTab === "products" ? "Produto" : "Projeto"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const item = Object.fromEntries(formData.entries());
                item.is_featured = formData.has("is_featured");
                if (!editingItem.id) {
                  item.id = Date.now().toString();
                }
                saveItem({ ...editingItem, ...item });
              }}>
                <div className="space-y-4">
                  <input
                    name="title"
                    placeholder="Título"
                    defaultValue={editingItem.title || ""}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  
                  {activeTab === "news" && (
                    <>
                      <textarea
                        name="summary"
                        placeholder="Resumo"
                        defaultValue={editingItem.summary || ""}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                      />
                      <select
                        name="category"
                        defaultValue={editingItem.category || "marvel_dc"}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="marvel_dc">Marvel & DC</option>
                        <option value="fofocas">Fofocas</option>
                      </select>
                      <input
                        name="source"
                        placeholder="URL da fonte"
                        defaultValue={editingItem.source || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                    </>
                  )}
                  
                  {activeTab === "products" && (
                    <>
                      <input
                        name="price"
                        placeholder="Preço"
                        defaultValue={editingItem.price || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                      <input
                        name="url"
                        placeholder="URL do produto"
                        defaultValue={editingItem.url || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                    </>
                  )}
                  
                  {activeTab === "projects" && (
                    <>
                      <textarea
                        name="description"
                        placeholder="Descrição"
                        defaultValue={editingItem.description || ""}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                      />
                      <input
                        name="technologies"
                        placeholder="Tecnologias (separadas por vírgula)"
                        defaultValue={editingItem.technologies?.join(", ") || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                      <input
                        name="demo_url"
                        placeholder="URL da demo"
                        defaultValue={editingItem.demo_url || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                      <input
                        name="github_url"
                        placeholder="URL do GitHub"
                        defaultValue={editingItem.github_url || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                    </>
                  )}
                  
                  <input
                    name="image_url"
                    placeholder="URL da imagem"
                    defaultValue={editingItem.image_url || ""}
                    className="w-full border rounded px-3 py-2"
                  />
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_featured"
                      defaultChecked={editingItem.is_featured}
                    />
                    <span className="text-sm">Destaque</span>
                  </label>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingItem(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
