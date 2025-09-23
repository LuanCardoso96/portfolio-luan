import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { Newspaper } from 'lucide-react'

export default function NewsForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image_url: '',
    category: '',
    source: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.url) return

    setIsSubmitting(true)
    try {
      // Simular criação de notícia
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay
      
      setFormData({
        title: '',
        description: '',
        url: '',
        image_url: '',
        category: '',
        source: ''
      })
      
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.url.trim()

  return (
    <Card title="Adicionar Nova Notícia" icon={Newspaper}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Digite o título da notícia"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Breve descrição da notícia"
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="url">URL da Notícia *</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://exemplo.com/noticia"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            placeholder="https://exemplo.com/imagem.jpg"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marvel_dc">Marvel & DC</SelectItem>
              <SelectItem value="fofocas">Fofocas</SelectItem>
              <SelectItem value="geral">Geral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="source">Fonte</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
            placeholder="Nome da fonte"
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Criando...' : 'Criar Notícia'}
        </Button>
      </form>
    </Card>
  )
}
