import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
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
  Github,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    demo_url: "",
    github_url: "",
    technologies: [],
    is_featured: false,
    order: 0
  });
  const [newTech, setNewTech] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await Project.list('order', 100);
      setProjects(allProjects);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      image_url: project.image_url || "",
      demo_url: project.demo_url || "",
      github_url: project.github_url || "",
      technologies: project.technologies || [],
      is_featured: project.is_featured || false,
      order: project.order || 0
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingProject.id) {
        await Project.update(editingProject.id, formData);
      } else {
        await Project.create(formData);
      }
      await loadProjects();
      handleCancel();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        await Project.delete(id);
        await loadProjects();
      } catch (error) {
        console.error("Erro ao excluir projeto:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      demo_url: "",
      github_url: "",
      technologies: [],
      is_featured: false,
      order: 0
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
  
  const addTech = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  const removeTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciar Projetos</h2>
          <p className="text-slate-600">Adicione, edite ou remova projetos do portfólio</p>
        </div>
        <Button onClick={() => setEditingProject({})}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Form */}
      {editingProject !== null && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingProject.id ? "Editar Projeto" : "Novo Projeto"}
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value, 10) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo_url">URL Demo</Label>
                <Input
                  id="demo_url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url">URL GitHub</Label>
                <Input
                  id="github_url"
                  value={formData.github_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagem</Label>
              <div className="flex gap-4 items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="project-image-upload" />
                <label htmlFor="project-image-upload">
                  <Button variant="outline" disabled={isUploading} asChild>
                    <span>{isUploading ? "Enviando..." : <><Image className="w-4 h-4 mr-2" />Enviar Imagem</>}</span>
                  </Button>
                </label>
                {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-20 w-32 object-cover rounded" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tecnologias</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Adicionar tecnologia"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                />
                <Button type="button" onClick={addTech} size="sm">Adicionar</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTech(tech)}>
                    {tech} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="featured" checked={formData.is_featured} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))} />
              <Label htmlFor="featured">Projeto em destaque</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : <><Save className="w-4 h-4 mr-2" />Salvar</>}
              </Button>
              <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      {isLoading ? (
        <p>Carregando projetos...</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                {project.image_url && <img src={project.image_url} alt={project.title} className="w-full sm:w-32 h-auto sm:h-20 object-cover rounded" />}
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{project.title} (Ordem: {project.order})</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
                  {project.is_featured && <Badge className="bg-yellow-100 text-yellow-800"><Star className="w-3 h-3 mr-1" />Destaque</Badge>}
                </div>
                <div className="flex gap-2 sm:flex-col sm:gap-2 self-start pt-2 sm:pt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}><Edit className="w-4 h-4 mr-1 sm:mr-0" /> <span className="sm:hidden">Editar</span></Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}><Trash2 className="w-4 h-4 mr-1 sm:mr-0" /> <span className="sm:hidden">Excluir</span></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}