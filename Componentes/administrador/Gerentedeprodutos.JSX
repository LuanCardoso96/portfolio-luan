import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { UploadFile } from "@/integrations/Core";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Image,
  Star,
  ExternalLink,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    affiliate_url: "",
    is_featured: false,
    category: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await Product.list('-created_date', 100);
      setProducts(allProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image_url: product.image_url || "",
      affiliate_url: product.affiliate_url || "",
      is_featured: product.is_featured || false,
      category: product.category || ""
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingProduct.id) {
        await Product.update(editingProduct.id, formData);
      } else {
        await Product.create(formData);
      }
      await loadProducts();
      handleCancel();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await Product.delete(id);
        await loadProducts();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      image_url: "",
      affiliate_url: "",
      is_featured: false,
      category: ""
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciar Produtos</h2>
          <p className="text-slate-600">Adicione, edite ou remova produtos afiliados</p>
        </div>
        <Button onClick={() => setEditingProduct({})}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Form */}
      {editingProduct !== null && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingProduct.id ? "Editar Produto" : "Novo Produto"}
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do produto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="R$ 99,90"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Eletrônicos, Casa, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="affiliate_url">Link de Afiliado</Label>
                <Input
                  id="affiliate_url"
                  value={formData.affiliate_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, affiliate_url: e.target.value }))}
                  placeholder="https://shopee.com.br/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição do produto"
                rows={3}
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
                  id="product-image-upload"
                />
                <label htmlFor="product-image-upload">
                  <Button variant="outline" disabled={isUploading} asChild>
                    <span>
                      {isUploading ? "Enviando..." : <><Image className="w-4 h-4 mr-2" />Enviar Imagem</>}
                    </span>
                  </Button>
                </label>
                {formData.image_url && (
                  <div className="flex-1">
                    <img src={formData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="featured">Produto em destaque</Label>
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

      {/* Products List */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill().map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-slate-200" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded" />
                <div className="h-6 bg-slate-200 rounded w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden bg-slate-100 relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-slate-400" />
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-400 text-yellow-900">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button variant="secondary" size="icon" className="w-8 h-8" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="w-8 h-8" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                    {product.category && (
                      <Badge variant="outline" className="mt-1 text-xs">{product.category}</Badge>
                    )}
                  </div>
                </div>
                <div className="text-lg font-bold text-green-600">{product.price}</div>
                {product.description && (
                  <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                )}
                {product.affiliate_url && (
                  <a 
                    href={product.affiliate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver na Shopee
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}