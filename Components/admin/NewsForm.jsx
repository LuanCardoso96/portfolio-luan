import React, { useState } from "react";
import { NewsItems } from "@/entities/NewsItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Newspaper } from "lucide-react";

export default function NewsForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    image_url: "",
    category: "",
    source: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await NewsItems.create({
        ...formData,
        pub_date: new Date().toISOString()
      });

      setFormData({
        title: "",
        description: "",
        url: "",
        image_url: "",
        category: "",
        source: ""
      });

      onSuccess?.();
    } catch (error) {
      alert("Erro ao criar notícia: " + error.message);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Adicionar Nova Notícia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Título da notícia"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Breve descrição da notícia"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="url">URL da Notícia *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://exemplo.com/noticia"
              required
            />
          </div>

          <div>
            <Label htmlFor="image_url">URL da Imagem</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              placeholder="https://exemplo.com/imagem.jpg"
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

          <div>
            <Label htmlFor="source">Fonte</Label>
            <Input
              id="source"
              value={formData.source}
              onChange={(e) => setFormData({...formData, source: e.target.value})}
              placeholder="Nome da fonte"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.url || !formData.category}
            className="w-full"
          >
            <Newspaper className="w-4 h-4 mr-2" />
            {isSubmitting ? "Criando..." : "Criar Notícia"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}