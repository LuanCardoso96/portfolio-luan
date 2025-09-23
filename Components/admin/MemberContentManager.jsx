import React, { useState, useEffect } from "react";
import { MemberContent } from "@/entities/MemberContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Star, Trash2 } from "lucide-react";

// Form Component
function ContentForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    content_type: "",
    category: "",
    featured: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await MemberContent.create(formData);
      setFormData({ title: "", content: "", content_type: "", category: "", featured: false });
      onSuccess?.();
    } catch (error) {
      alert("Erro ao criar conteúdo: " + error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Adicionar Conteúdo de Membro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Título do conteúdo *" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <Textarea placeholder="Descrição ou conteúdo..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
          <Select value={formData.content_type} onValueChange={(v) => setFormData({...formData, content_type: v})}>
            <SelectTrigger><SelectValue placeholder="Tipo de conteúdo *" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="article">Artigo</SelectItem>
              <SelectItem value="video">Vídeo</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="download">Download</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Categoria" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          <div className="flex items-center space-x-2">
              <Switch id="featured-content" checked={formData.featured} onCheckedChange={(c) => setFormData({...formData, featured: c})} />
              <Label htmlFor="featured-content">Em Destaque</Label>
          </div>
          <Button type="submit" disabled={isSubmitting || !formData.title || !formData.content_type} className="w-full">
            {isSubmitting ? "Criando..." : "Criar Conteúdo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Main Manager Component
export default function MemberContentManager() {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const allContents = await MemberContent.list("-created_date");
      setContents(allContents);
    } catch (error) {
      console.error("Erro ao carregar conteúdos:", error);
    }
    setIsLoading(false);
  };

  const deleteContent = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este conteúdo?")) return;
    try {
      await MemberContent.delete(id);
      loadContent();
    } catch (error) {
      alert("Erro ao excluir: " + error.message);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <ContentForm onSuccess={loadContent} />
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Conteúdos Exclusivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <p>Carregando...</p> : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {contents.map(item => (
                  <div key={item.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.content_type} {item.category && `- ${item.category}`}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteContent(item.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}