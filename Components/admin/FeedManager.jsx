import React, { useState } from "react";
import { NewsFeeds } from "@/entities/NewsFeeds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Rss, Trash2 } from "lucide-react";

export default function FeedManager({ feeds, onUpdate }) {
  const [formData, setFormData] = useState({
    feed_name: "",
    feed_url: "",
    category: "",
    active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await NewsFeeds.create(formData);
      
      setFormData({
        feed_name: "",
        feed_url: "",
        category: "",
        active: true
      });
      
      onUpdate?.();
    } catch (error) {
      alert("Erro ao criar feed: " + error.message);
    }
    
    setIsSubmitting(false);
  };

  const deleteFeed = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este feed?")) return;
    
    try {
      await NewsFeeds.delete(id);
      onUpdate?.();
    } catch (error) {
      alert("Erro ao excluir feed: " + error.message);
    }
  };

  const toggleFeedStatus = async (feed) => {
    try {
      await NewsFeeds.update(feed.id, { ...feed, active: !feed.active });
      onUpdate?.();
    } catch (error) {
      alert("Erro ao alterar status do feed: " + error.message);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Feed RSS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feed_name">Nome do Feed *</Label>
                <Input
                  id="feed_name"
                  value={formData.feed_name}
                  onChange={(e) => setFormData({...formData, feed_name: e.target.value})}
                  placeholder="Ex: Marvel News"
                  required
                />
              </div>

              <div>
                <Label htmlFor="feed_url">URL do Feed *</Label>
                <Input
                  id="feed_url"
                  type="url"
                  value={formData.feed_url}
                  onChange={(e) => setFormData({...formData, feed_url: e.target.value})}
                  placeholder="https://exemplo.com/feed.xml"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marvel_dc">Marvel & DC</SelectItem>
                    <SelectItem value="fofocas">Fofocas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                />
                <Label htmlFor="active">Feed Ativo</Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.feed_name || !formData.feed_url || !formData.category}
                className="w-full"
              >
                <Rss className="w-4 h-4 mr-2" />
                {isSubmitting ? "Criando..." : "Adicionar Feed"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rss className="w-5 h-5" />
              Feeds RSS Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeds.map((feed) => (
                <div key={feed.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{feed.feed_name}</h4>
                      <Badge variant={feed.category === 'marvel_dc' ? 'default' : 'secondary'}>
                        {feed.category === 'marvel_dc' ? 'Marvel & DC' : 'Fofocas'}
                      </Badge>
                      <Badge variant={feed.active ? 'default' : 'destructive'}>
                        {feed.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 break-all">{feed.feed_url}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={feed.active}
                      onCheckedChange={() => toggleFeedStatus(feed)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFeed(feed.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {feeds.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Rss className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum feed RSS cadastrado ainda.</p>
                  <p className="text-sm">Adicione feeds para buscar notícias automaticamente.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}