import React from 'react'
import { listPaged } from '../lib/firestoreRepo'

export default function Premium() {
  const [downloads, setDownloads] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadDownloads() {
      try {
        const { items } = await listPaged('downloads', 20)
        setDownloads(items)
      } catch (error) {
        console.error('Erro ao carregar downloads:', error)
        // Fallback para downloads estáticos se Firestore falhar
        setDownloads([
          { 
            titulo: 'App Desafio Concurso (APK)', 
            desc: 'Build Android para membros premium.', 
            url: 'https://drive.google.com/file/d/SEU-LINK-APK-1/view' 
          },
          { 
            titulo: 'Template React PWA', 
            desc: 'Base pronta com Tailwind e Service Worker.', 
            url: 'https://github.com/luancardoso96/template-react-pwa' 
          },
          { 
            titulo: 'Automação Ads/Planilha', 
            desc: 'Script e planilha para gestão de tráfego.', 
            url: 'https://docs.google.com/spreadsheets/d/SEU-LINK-SCRIPT' 
          },
          { 
            titulo: 'Cursor APKs Collection', 
            desc: 'Coleção de APKs otimizados para desenvolvimento.', 
            url: 'https://drive.google.com/drive/folders/SEU-LINK-CURSOR' 
          },
          { 
            titulo: 'Templates IA Prompts', 
            desc: 'Prompts otimizados para ChatGPT/Claude.', 
            url: 'https://notion.so/SEU-LINK-PROMPTS' 
          },
          { 
            titulo: 'Sistema CRM Básico', 
            desc: 'Template de CRM em React + Node.js.', 
            url: 'https://github.com/luancardoso96/crm-template' 
          }
        ])
      }
      setLoading(false)
    }
    loadDownloads()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando downloads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">Conteúdo Premium</h1>
      <p className="text-gray-600 mb-8">Downloads exclusivos (APK), templates e tutoriais avançados.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-lg transition">
            <h3 className="font-bold">{d.titulo}</h3>
            <p className="text-gray-600 mt-1">{d.desc}</p>
            <a 
              className="inline-flex mt-4 text-indigo-600 font-semibold hover:text-indigo-700"
              href={d.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Baixar →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2">Sistemas corporativos (Web + iOS/Android)</h2>
        <p className="text-gray-600">
          Em desenvolvimento: CRM leve, ordens de serviço, relatórios e integrações de IA. 
          Membros premium terão acesso antecipado aos betas.
        </p>
      </div>

      <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2 text-emerald-800">🎉 Bem-vindo ao Premium!</h2>
        <p className="text-gray-700">
          Você agora tem acesso a todos os recursos exclusivos. Novos conteúdos são adicionados 
          semanalmente. Mantenha-se atualizado!
        </p>
      </div>
    </div>
  )
}