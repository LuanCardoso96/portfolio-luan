import React, { useState } from 'react'
import { create } from '../lib/firestoreRepo'

export default function PopulaFirestore() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  // Seus links de afiliado Shopee
  const afiliados = [
    { titulo: 'Oferta Shopee #1', url: 'https://s.shopee.com.br/10tleGRlGV' },
    { titulo: 'Oferta Shopee #2', url: 'https://s.shopee.com.br/5AjKbwbtSn' },
    { titulo: 'Oferta Shopee #3', url: 'https://s.shopee.com.br/11ESSm11C' },
    { titulo: 'Oferta Shopee #4', url: 'https://s.shopee.com.br/4LADcRIG8r' },
    { titulo: 'Oferta Shopee #5', url: 'https://s.shopee.com.br/9zoaMrn8jF' },
  ]

  // Thumbs para os produtos
  const thumbs = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512499617640-c2f999098c01?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  ]

  // Links de fofocas
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

  // Links Marvel & DC
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

  async function popularFirestore() {
    setLoading(true)
    setStatus('Iniciando...')
    
    try {
      // 1. Enviar Afiliados Shopee
      setStatus('Enviando afiliados Shopee...')
      for (let i = 0; i < afiliados.length; i++) {
        const a = afiliados[i]
        const docId = await create('vendas', {
          titulo: a.titulo,
          url: a.url,
          imagem: thumbs[i % thumbs.length],
          categoria: 'Afiliado',
          descricao: `Oferta especial da Shopee - ${a.titulo}`,
          status: 'Ativo',
          destaque: i === 0
        }, 'luancr71996@gmail.com')
        
        console.log(`✅ ${a.titulo} criado com ID: ${docId}`)
        setStatus(`✅ ${a.titulo} enviado!`)
      }
      
      // 2. Enviar Fofocas
      setStatus('Enviando fofocas...')
      for (let i = 0; i < fofocas.length; i++) {
        const f = fofocas[i]
        const docId = await create('noticias', {
          titulo: f.titulo,
          url: f.url,
          categoria: f.categoria,
          fonte: f.fonte,
          descricao: `Acesse ${f.fonte} para as últimas ${f.categoria.toLowerCase()}`,
          imagem: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800&auto=format&fit=crop'
        }, 'luancr71996@gmail.com')
        
        console.log(`✅ ${f.titulo} criado com ID: ${docId}`)
        setStatus(`✅ ${f.titulo} enviado!`)
      }
      
      // 3. Enviar Marvel & DC
      setStatus('Enviando Marvel & DC...')
      for (let i = 0; i < marvelDC.length; i++) {
        const m = marvelDC[i]
        const docId = await create('noticias', {
          titulo: m.titulo,
          url: m.url,
          categoria: m.categoria,
          fonte: m.fonte,
          descricao: `Acesse ${m.fonte} para as últimas notícias de ${m.categoria}`,
          imagem: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop'
        }, 'luancr71996@gmail.com')
        
        console.log(`✅ ${m.titulo} criado com ID: ${docId}`)
        setStatus(`✅ ${m.titulo} enviado!`)
      }
      
      setStatus('🎉 FIRESTORE POPULADO COM SUCESSO! Verifique o console.')
    } catch (error) {
      console.error('Erro:', error)
      setStatus('❌ Erro: ' + error.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔥 Popular Firestore</h1>
      
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="font-bold text-red-800 mb-2">🚨 Problema Identificado:</h3>
        <p className="text-red-700">Firestore está vazio - nenhum dado foi enviado</p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-bold text-blue-800 mb-2">📋 O que será enviado:</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• <strong>5 Afiliados Shopee</strong> → Coleção 'vendas'</li>
          <li>• <strong>10 Fofocas</strong> → Coleção 'noticias'</li>
          <li>• <strong>10 Marvel & DC</strong> → Coleção 'noticias'</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={popularFirestore}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : '🚀 POPULAR FIRESTORE'}
        </button>
      </div>

      {status && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <p className="text-gray-800">{status}</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">⚠️ Se não funcionar:</h3>
        <ol className="text-yellow-700 space-y-1 text-sm">
          <li>1. Configure as regras do Firestore primeiro</li>
          <li>2. Acesse: https://console.firebase.google.com/project/portfolio-ee5e8/firestore/rules</li>
          <li>3. Cole as regras e publique</li>
          <li>4. Tente novamente</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-bold text-green-800 mb-2">✅ Regras do Firestore:</h3>
        <pre className="text-green-700 text-xs bg-green-100 p-2 rounded overflow-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email == 'luancr71996@gmail.com';
    }
    match /{document=**} {
      allow read: if true;
      allow write, update, delete, create: if isAdmin();
    }
  }
}`}
        </pre>
      </div>
    </div>
  )
}
