import React from "react"

const testimonials = [
  { quote: "O app desenvolvido pelo Luan aumentou nossas vendas em 250%.", name: "Maria Silva", role: "CEO, Fashion Store" },
  { quote: "Landing page incrível que converteu 12% dos visitantes.", name: "João Santos", role: "Fundador, Tech Startup" },
  { quote: "Tráfego pago que realmente funciona. ROI mês a mês.", name: "Ana Costa", role: "Dir. de Marketing" },
  { quote: "App estável, bonito e rápido. Excelente comunicação.", name: "Rafael Lima", role: "PM, Fintech" },
  { quote: "Automação com IA reduziu 60% de tempo operacional.", name: "Beatriz Nunes", role: "COO, Logística" },
  { quote: "SEO + performance = +120% de orgânico em 3 meses.", name: "Carlos Melo", role: "Growth" },
  { quote: "App híbrido iOS/Android entregando tudo que pedimos.", name: "Patrícia Reis", role: "CTO, Educação" },
  { quote: "Suporte 24h de verdade — salva-vidas.", name: "Daniel Moreira", role: "Founder" },
  { quote: "Sistema corporativo sob medida, sem gambiarra.", name: "Juliana Rocha", role: "Gerente TI" },
  { quote: "Setup de analytics impecável, decisões com dados.", name: "Eduardo Teixeira", role: "CRO" },
  { quote: "Integração com gateway + antifraude perfeita.", name: "Luísa Prado", role: "E-commerce Lead" },
  { quote: "Dashboard lindo e útil, diretoria amou.", name: "Felipe Souza", role: "C-Level" },
  { quote: "PWA instalável aumentou retenção em 30%.", name: "Aline Ramos", role: "Produto" },
  { quote: "Entrega no prazo e documentação top.", name: "Ricardo Lopes", role: "Tech Lead" },
  { quote: "Estratégia de mídia escalou lucro, não só gasto.", name: "Vanessa Dias", role: "Mídia Paga" },
]

function Card({ t }) {
  return (
    <div className="min-w-[320px] max-w-[360px] md:min-w-[380px] md:max-w-[420px]
                    bg-white/10 border border-white/20 rounded-2xl p-6 text-white
                    backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
      <div className="text-yellow-300 mb-3">★★★★★</div>
      <p className="opacity-95 leading-relaxed">{t.quote}</p>
      <div className="mt-4 font-semibold">{t.name}</div>
      <div className="text-sm opacity-80">{t.role}</div>
    </div>
  )
}

export default function TestimonialMarquee() {
  const loop = [...testimonials, ...testimonials] // duplicar lista para loop infinito

  return (
    <section className="w-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] py-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold text-center mb-10">
          O que nossos clientes dizem
        </h2>
      </div>
      <div className="pause-on-hover">
        <div className="flex gap-6 w-[200%] animate-marquee">
          {loop.map((t, i) => (
            <div key={i} className="pl-4 first:pl-6">
              <Card t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
