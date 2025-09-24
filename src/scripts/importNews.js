import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

const newsData = [
  {
    "categoria": "Fofocas",
    "titulo": "Arie Luyendyk Jr. e Lauren Burnham dão as boas-vindas ao 4º filho",
    "url": "https://www.eonline.com/news/1422906/arie-luyendyk-jr-lauren-burnham-welcome-baby-no-4",
    "descricao": "O casal de The Bachelor anunciou o nascimento de Livvy Rowe com fotos no hospital.",
    "fonte": "E! News",
    "imagem": ""
  },
  {
    "categoria": "Fofocas",
    "titulo": "Alexandra Rose (Selling the OC) está grávida de um menino",
    "url": "https://www.eonline.com/news/1422902/selling-the-ocs-alexandra-rose-pregnant-expecting-baby-boy",
    "descricao": "A estrela de Selling the OC revelou estar com 8 meses e esperando um menino.",
    "fonte": "E! News",
    "imagem": ""
  },
  {
    "categoria": "Fofocas",
    "titulo": "Luke Combs e a esposa Nicole esperam o 3º filho",
    "url": "https://people.com/luke-combs-wife-nicole-is-pregnant-and-expecting-baby-no-3-11815653",
    "descricao": "O cantor country anunciou a gravidez com vídeo fofo no Instagram.",
    "fonte": "PEOPLE",
    "imagem": ""
  },
  {
    "categoria": "Fofocas",
    "titulo": "'Selling the OC': Alexandra Rose revela gravidez de 8 meses",
    "url": "https://people.com/selling-the-oc-star-alexandra-rose-8-months-pregnant-expecting-baby-boy-11815154",
    "descricao": "A corretora contou que manteve a gestação em segredo e agora espera um menino.",
    "fonte": "PEOPLE",
    "imagem": ""
  },
  {
    "categoria": "Fofocas",
    "titulo": "A$AP Rocky dá pista do nome do 3º bebê com Rihanna",
    "url": "https://people.com/asap-rocky-teases-name-of-his-and-rihannas-third-baby-on-the-way-11815552",
    "descricao": "O rapper brincou sobre o possível nome do próximo filho durante aparição recente.",
    "fonte": "PEOPLE",
    "imagem": ""
  },
  {
    "categoria": "Marvel & DC",
    "titulo": "Produção de 'Spider-Man: Brand New Day' pausa após concussão de Tom Holland",
    "url": "https://variety.com/2025/film/news/tom-holland-concussion-spider-man-brand-new-day-1236525814/",
    "descricao": "Gravações param por uma semana depois de o ator sofrer concussão no set.",
    "fonte": "Variety",
    "imagem": ""
  },
  {
    "categoria": "Marvel & DC",
    "titulo": "'Spider-Man: Brand New Day' adia gravações por uma semana",
    "url": "https://au.variety.com/2025/film/global/spider-man-brand-new-day-tom-holland-concussion-delays-production-28025/",
    "descricao": "Nota internacional reforça a pausa temporária após o incidente com Holland.",
    "fonte": "Variety (AU)",
    "imagem": ""
  },
  {
    "categoria": "Marvel & DC",
    "titulo": "'Daredevil: Born Again' é renovada para a 3ª temporada no Disney+",
    "url": "https://variety.com/2025/tv/news/daredevil-born-again-renewed-season-3-1236523428/",
    "descricao": "Marvel confirma continuação da série estrelada por Charlie Cox.",
    "fonte": "Variety",
    "imagem": ""
  },
  {
    "categoria": "Marvel & DC",
    "titulo": "DCU de James Gunn domina o streaming com #1 em filme e série",
    "url": "https://comicbook.com/movies/news/james-gunns-dcu-dominates-streaming-1-movie-tv-show-right-now-superman-peacemaker/",
    "descricao": "Relatório aponta 'Superman' e 'Peacemaker' liderando as paradas.",
    "fonte": "ComicBook.com",
    "imagem": ""
  },
  {
    "categoria": "Marvel & DC",
    "titulo": "As 5 melhores versões de uniforme da Batgirl (ranqueadas)",
    "url": "https://comicbook.com/comics/news/5-best-batgirl-costumes-in-60-years-of-dc-comics-lore-ranked/",
    "descricao": "Matéria celebra 60 anos da personagem e elege os trajes mais icônicos.",
    "fonte": "ComicBook.com",
    "imagem": ""
  }
]

export async function importNewsToFirestore() {
  try {
    console.log('Iniciando importação de notícias...')
    
    const promises = newsData.map(async (news) => {
      const docRef = await addDoc(collection(db, 'noticias'), {
        ...news,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        authorEmail: 'luancr71996@gmail.com' // Admin email
      })
      console.log(`Notícia adicionada: ${news.titulo} (ID: ${docRef.id})`)
      return docRef.id
    })
    
    const ids = await Promise.all(promises)
    console.log(`✅ ${ids.length} notícias importadas com sucesso!`)
    return ids
    
  } catch (error) {
    console.error('❌ Erro ao importar notícias:', error)
    throw error
  }
}

// Executar se chamado diretamente
if (typeof window !== 'undefined') {
  window.importNewsToFirestore = importNewsToFirestore
}
