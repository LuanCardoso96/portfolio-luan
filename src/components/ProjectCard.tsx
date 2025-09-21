import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {project.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
      )}
      <CardContent className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 pt-2">
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ver projeto
            </a>
          )}
          {project.github_url && (
            <a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 font-medium text-sm transition-colors"
            >
              <Github className="w-4 h-4" />
              Código
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
