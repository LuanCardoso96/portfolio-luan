import React, { useState } from "react";
import { Products } from "@/entities/Products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, ShoppingCart } from "lucide-react";

export default function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image_url: "",
    affiliate_url: "",
    category: "",
    featured: false,
    active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await Products.create(formData);

      setFormData({
        title: "",
        price: "",
        image_url: "",
        affiliate_url: "",
        category: "",
        featured: false,
        active: true
      });

      onSuccess?.();
    } catch (error) {
      alert("Erro ao criar produto: " + error.message);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Adicionar Novo Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nome do Produto *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Fone Bluetooth Premium"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Preço *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="R$ 89,90"
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
              placeholder="https://exemplo.com/produto.jpg"
            />
          </div>

          <div>
            <Label htmlFor="affiliate_url">Link de Afiliado Shopee *</Label>
            <Input
              id="affiliate_url"
              type="url"
              value={formData.affiliate_url}
              onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})}
              placeholder="https://shopee.com.br/produto?aff_id=..."
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eletrônicos">Eletrônicos</SelectItem>
                <SelectItem value="acessórios">Acessórios</SelectItem>
                <SelectItem value="gamer">Gamer</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="moda">Moda</SelectItem>
                <SelectItem value="beleza">Beleza</SelectItem>
                <SelectItem value="esportes">Esportes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
              />
              <Label htmlFor="featured">Produto em Destaque</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({...formData, active: checked})}
              />
              <Label htmlFor="active">Ativo</Label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.price || !formData.affiliate_url}
            className="w-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isSubmitting ? "Criando..." : "Criar Produto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}