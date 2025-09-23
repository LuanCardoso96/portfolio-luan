import { create } from '../lib/firestoreRepo'

// thumbs livres (pode trocar depois pelos seus)
const thumbs = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512499617640-c2f999098c01?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
]

// seus links
const afiliados = [
  { titulo: 'Oferta Shopee #1', url: 'https://s.shopee.com.br/10tleGRlGV' },
  { titulo: 'Oferta Shopee #2', url: 'https://s.shopee.com.br/5AjKbwbtSn' },
  { titulo: 'Oferta Shopee #3', url: 'https://s.shopee.com.br/11ESSm11C' },
  { titulo: 'Oferta Shopee #4', url: 'https://s.shopee.com.br/4LADcRIG8r' },
  { titulo: 'Oferta Shopee #5', url: 'https://s.shopee.com.br/9zoaMrn8jF' },
]

export async function seedVendas(authorEmail = 'luancr71996@gmail.com') {
  console.log('🌱 Iniciando seed dos afiliados Shopee...')
  
  for (let i = 0; i < afiliados.length; i++) {
    const a = afiliados[i]
    try {
      const docId = await create('vendas', {
        titulo: a.titulo,
        url: a.url,                 // link de afiliado
        imagem: thumbs[i % thumbs.length],
        preco: null,                // opcional
        destaque: i === 0,          // deixa o 1º em destaque
        categoria: 'Afiliado',
        descricao: `Oferta especial da Shopee - ${a.titulo}`,
        status: 'Ativo'
      }, authorEmail)
      
      console.log(`✅ ${a.titulo} criado com ID: ${docId}`)
    } catch (error) {
      console.error(`❌ Erro ao criar ${a.titulo}:`, error)
    }
  }
  
  console.log('🎉 Seed dos afiliados concluído!')
  return true
}

// Função para popular notícias de fofocas
export async function seedFofocas(authorEmail = 'luancr71996@gmail.com') {
  console.log('🌱 Iniciando seed das fofocas...')
  
  const fofocas = [
    { titulo: 'Últimas Fofocas de Celebridades', url: 'https://people.com/celebrity/', categoria: 'Fofocas', fonte: 'People' },
    { titulo: 'Notícias Quentes do Entretenimento', url: 'https://www.eonline.com/news', categoria: 'Fofocas', fonte: 'E! Online' },
    { titulo: 'Fofocas Exclusivas do TMZ', url: 'https://www.tmz.com/', categoria: 'Fofocas', fonte: 'TMZ' },
    { titulo: 'Celebridades em Destaque', url: 'https://www.usmagazine.com/celebrity-news/', categoria: 'Fofocas', fonte: 'US Magazine' },
    { titulo: 'Fofocas do Page Six', url: 'https://pagesix.com/', categoria: 'Fofocas', fonte: 'Page Six' },
    { titulo: 'Entretenimento Hoje', url: 'https://www.etonline.com/news', categoria: 'Fofocas', fonte: 'ET Online' },
    { titulo: 'Just Jared - Celebridades', url: 'https://www.justjared.com/', categoria: 'Fofocas', fonte: 'Just Jared' },
    { titulo: 'BuzzFeed Celebridades', url: 'https://www.buzzfeed.com/celebrity', categoria: 'Fofocas', fonte: 'BuzzFeed' },
    { titulo: 'Hollywood Reporter News', url: 'https://www.hollywoodreporter.com/celebrity-news/', categoria: 'Fofocas', fonte: 'Hollywood Reporter' },
    { titulo: 'Variety Celebrity News', url: 'https://variety.com/v/celebrity/', categoria: 'Fofocas', fonte: 'Variety' }
  ]
  
  for (let i = 0; i < fofocas.length; i++) {
    const f = fofocas[i]
    try {
      const docId = await create('noticias', {
        titulo: f.titulo,
        url: f.url,
        categoria: f.categoria,
        fonte: f.fonte,
        descricao: `Acesse ${f.fonte} para as últimas ${f.categoria.toLowerCase()}`,
        imagem: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800&auto=format&fit=crop'
      }, authorEmail)
      
      console.log(`✅ ${f.titulo} criado com ID: ${docId}`)
    } catch (error) {
      console.error(`❌ Erro ao criar ${f.titulo}:`, error)
    }
  }
  
  console.log('🎉 Seed das fofocas concluído!')
  return true
}

// Função para popular notícias Marvel & DC
export async function seedMarvelDC(authorEmail = 'luancr71996@gmail.com') {
  console.log('🌱 Iniciando seed Marvel & DC...')
  
  const marvelDC = [
    { titulo: 'Notícias Oficiais da Marvel', url: 'https://www.marvel.com/news', categoria: 'Marvel & DC', fonte: 'Marvel.com' },
    { titulo: 'Artigos da Marvel', url: 'https://www.marvel.com/articles', categoria: 'Marvel & DC', fonte: 'Marvel.com' },
    { titulo: 'Notícias da DC Comics', url: 'https://www.dc.com/news', categoria: 'Marvel & DC', fonte: 'DC.com' },
    { titulo: 'Marvel no IGN', url: 'https://www.ign.com/marvel', categoria: 'Marvel & DC', fonte: 'IGN' },
    { titulo: 'DC no IGN', url: 'https://www.ign.com/dc', categoria: 'Marvel & DC', fonte: 'IGN' },
    { titulo: 'Marvel ComicBook', url: 'https://www.comicbook.com/marvel/', categoria: 'Marvel & DC', fonte: 'ComicBook.com' },
    { titulo: 'DC ComicBook', url: 'https://www.comicbook.com/dc/', categoria: 'Marvel & DC', fonte: 'ComicBook.com' },
    { titulo: 'CBR Comics News', url: 'https://www.cbr.com/category/comics-news/', categoria: 'Marvel & DC', fonte: 'CBR' },
    { titulo: 'Superhero Hype', url: 'https://www.superherohype.com/', categoria: 'Marvel & DC', fonte: 'SuperheroHype' },
    { titulo: 'Comic Book Movie', url: 'https://www.comicbookmovie.com/', categoria: 'Marvel & DC', fonte: 'ComicBookMovie' }
  ]
  
  for (let i = 0; i < marvelDC.length; i++) {
    const m = marvelDC[i]
    try {
      const docId = await create('noticias', {
        titulo: m.titulo,
        url: m.url,
        categoria: m.categoria,
        fonte: m.fonte,
        descricao: `Acesse ${m.fonte} para as últimas notícias de ${m.categoria}`,
        imagem: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop'
      }, authorEmail)
      
      console.log(`✅ ${m.titulo} criado com ID: ${docId}`)
    } catch (error) {
      console.error(`❌ Erro ao criar ${m.titulo}:`, error)
    }
  }
  
  console.log('🎉 Seed Marvel & DC concluído!')
  return true
}
