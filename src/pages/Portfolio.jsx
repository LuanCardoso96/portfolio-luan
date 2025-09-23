import React from 'react'
import { listPaged } from '../lib/firestoreRepo'

export default function Portfolio() {
  const [projects, setProjects] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadProjects() {
      try {
        const { items } = await listPaged('portfolio', 20)
        setProjects(items)
      } catch (error) {
        console.error('Erro ao carregar projetos:', error)
        // Fallback para projetos estáticos se Firestore falhar
        setProjects([
          {
            titulo: 'DS Obras — Portal',
            desc: 'Site institucional do DS Engenharia/Obras, vitrine de serviços e captação de leads.',
            tags: ['Web', 'Engenharia', 'SEO'],
            url: 'https://luancardoso96.github.io/dsobra/index.html'
          },
          {
            titulo: 'Elions Guincho',
            desc: 'Site comercial para Auto Socorro 24h, focado em conversão e WhatsApp.',
            tags: ['Web', 'Conversão', 'Local'],
            url: 'https://www.elionsguincho.com'
          },
          {
            titulo: 'Desafio Concurso — App',
            desc: 'Aplicativo Android focado em estudos e desafios diários. Disponível na Play Store.',
            tags: ['Mobile', 'Android', 'Educação'],
            url: 'https://play.google.com/store/search?q=Desafio%20Concurso&c=apps'
          },
          {
            titulo: 'Sistema Corporativo (em desenvolvimento)',
            desc: 'Plataforma web + mobile para gestão empresarial: módulos de clientes, serviços e relatórios.',
            tags: ['Web', 'iOS/Android', 'Corporativo', 'IA']
          }
        ])
      }
      setLoading(false)
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando projetos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Portfólio</h1>
        <p className="text-gray-600 mb-10">Meus projetos e trabalhos realizados.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition">
              <div className="p-5">
                <h3 className="text-lg font-bold">{p.titulo}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags?.map((t, j) => (
                    <span key={j} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 mt-5 text-indigo-600 font-semibold hover:text-indigo-700">
                    Ver projeto →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">Especialista em IA aplicada</h2>
          <p className="text-gray-600">
            Integro IA no ciclo completo: geração de conteúdo, automação de atendimento, análise de dados,
            validação de mídia paga e otimização de conversão. Soluções sob medida para web, mobile e corporativo.
          </p>
        </div>
      </div>
    </div>
  )
}