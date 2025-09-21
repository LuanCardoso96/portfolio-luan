import React, { useState, useEffect } from "react";
import { News } from "@/entities/News";
import { UploadFile } from "@/integrations/Core";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Image,
  Star,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    image_url: "",
    category: "marvel_dc",
    external_url: "",
    is_featured: false,
    tags: []
  });
  const [newTag, setNewTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const allNews = await News.list('-created_date', 100);
      setNews(allNews);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title || "",
      content: newsItem.content || "",
      summary: newsItem.summary || "",
      image_url: newsItem.image_url || "",
      category: newsItem.category || "marvel_dc",
      external_url: newsItem.external_url || "",
      is_featured: newsItem.is_featured || false,
      tags: newsItem.tags || []
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingNews.id) {
        await News.update(editingNews.id, formData);
      } else {
        await News.create(formData);
      }
      await loadNews();
      handleCancel();
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await News.delete(id);
        await loadNews();
      } catch (error) {
        console.error("Erro ao excluir notícia:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      content: "",
      summary: "",
      image_url: "",
      category: "marvel_dc",
      external_url: "",
      is_featured: false,
      tags: []
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await UploadFile({ file });
      setFormData(prev => ({ ...prev, image_url: result.file_url }));
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciar Notícias</h2>
          <p className="text-slate-600">Adicione, edite ou remova notícias do site</p>
        </div>
        <Button onClick={() => setEditingNews({})}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Notícia
        </Button>
      </div>

      {/* Form */}
      {editingNews !== null && (
        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingNews.id ? "Editar Notícia" : "Nova Notícia"}
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título da notícia"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marvel_dc">Marvel & DC</SelectItem>
                    <SelectItem value="gossip">Fofocas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Resumo</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Resumo da notícia"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Conteúdo completo da notícia"
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="external_url">URL Externa (opcional)</Label>
              <Input
                id="external_url"
                value={formData.external_url}
                onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                placeholder="Link para fonte original"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Imagem</Label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" disabled={isUploading} asChild>
                    <span>
                      {isUploading ? "Enviando..." : <><Image className="w-4 h-4 mr-2" />Enviar Imagem</>}
                    </span>
                  </Button>
                </label>
                {formData.image_url && (
                  <div className="flex-1">
                    <img src={formData.image_url} alt="Preview" className="h-20 w-32 object-cover rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Adicionar tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="featured">Destacar esta notícia</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : <><Save className="w-4 h-4 mr-2" />Salvar</>}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array(5).fill().map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 flex gap-4">
                <div className="w-24 h-16 bg-slate-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {newsItem.image_url && (
                    <img 
                      src={newsItem.image_url} 
                      alt={newsItem.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{newsItem.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={newsItem.category === 'marvel_dc' ? 'destructive' : 'secondary'}>
                            {newsItem.category === 'marvel_dc' ? 'Marvel & DC' : 'Fofocas'}
                          </Badge>
                          {newsItem.is_featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              Destaque
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(newsItem.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {newsItem.summary && (
                      <p className="text-sm text-slate-600 line-clamp-2">{newsItem.summary}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(newsItem.created_date), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                      {newsItem.tags && newsItem.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {newsItem.tags.slice(0, 2).join(", ")}
                          {newsItem.tags.length > 2 && ` +${newsItem.tags.length - 2}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}