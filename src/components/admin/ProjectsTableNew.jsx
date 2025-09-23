import React from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { 
  ShoppingCart, 
  Plus, 
  Download, 
  UploadCloud,
  Edit3,
  Trash2 
} from 'lucide-react'

export default function ProjectsTable({ 
  projects = [], 
  onDelete, 
  onEdit 
}) {
  const handleDelete = (id, title) => {
    if (window.confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
      onDelete(id)
    }
  }

  return (
    <Card 
      title="Projetos" 
      icon={ShoppingCart}
      actions={
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="ghost" size="sm">
            <UploadCloud className="w-4 h-4 mr-2" />
            Importar
          </Button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Título
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum projeto encontrado</p>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.category}</div>
                  </td>
                  <td className="px-4 py-4">
                    {project.featured ? (
                      <Badge variant="indigo">Destaque</Badge>
                    ) : (
                      <Badge variant="default">Normal</Badge>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(project)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id, project.title)}
                        className="w-8 h-8 p-0 rounded-full text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
