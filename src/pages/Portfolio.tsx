import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { ProjectCard } from "@/components/ProjectCard";
import { AdSlot } from "@/components/AdSlot";
import { Filter } from "lucide-react";

export default function Portfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>("all");

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedTech === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => 
        item.technologies?.some((tech: string) => 
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        )
      ));
    }
  }, [items, selectedTech]);

  const loadProjects = async () => {
    try {
      const projects = await Project.filter({}, "order", 20);
      setItems(projects);
      setFilteredItems(projects);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    }
  };

  // Get unique technologies
  const technologies = Array.from(
    new Set(items.flatMap(item => item.technologies || []))
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Meu <span className="text-indigo-600">Portfólio</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Projetos desenvolvidos com foco em resultados e experiência do usuário
        </p>
      </div>

      {/* Technology Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedTech("all")}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedTech === "all"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Todos
        </button>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTech === tech
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Ad Slot */}
      <AdSlot size="728x90" label="Espaço Publicitário" />

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {filteredItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Nenhum projeto encontrado com essa tecnologia.</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">{items.length}+</div>
          <div className="text-sm text-slate-500">Projetos</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{technologies.length}+</div>
          <div className="text-sm text-slate-500">Tecnologias</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
          <div className="text-sm text-slate-500">Satisfação</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-600 mb-1">24h</div>
          <div className="text-sm text-slate-500">Suporte</div>
        </div>
      </div>
    </div>
  );
}
