import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedMember from './components/ProtectedMember'
import AdminRoute from './components/AdminRoute'
import ErrorBoundary from './components/ErrorBoundary'

// Páginas existentes
import Home from '../home.jsx'
import Noticias from '../Noticias.jsx'
import Vendas from '../Vendas.jsx'
import Membro from '../Membro.jsx'
import Admin from '../Admin.jsx'

// Páginas que precisam ser criadas como stubs
import Portfolio from './pages/Portfolio.jsx'
import MarvelDC from './pages/MarvelDC.jsx'
import Fofocas from './pages/Fofocas.jsx'
import Contato from './pages/Contato.jsx'
import Login from './pages/Login.jsx'
import Membros from './pages/Membros.jsx'
import Privacidade from './pages/Privacidade.jsx'
import Termos from './pages/Termos.jsx'
import Sobre from './pages/Sobre.jsx'
import Assinatura from './pages/Assinatura.jsx'
import HomeSimplificado from './pages/HomeSimplificado.jsx'

// Novas páginas premium
import Planos from './pages/Planos.jsx'
import MinhaConta from './pages/MinhaConta.jsx'
import Premium from './pages/Premium.jsx'

// Páginas admin
import AdminNoticias from './pages/admin/Noticias.jsx'
import AdminVendas from './pages/admin/Vendas.jsx'
import AdminPortfolio from './pages/admin/Portfolio.jsx'
import AdminDownloads from './pages/admin/Downloads.jsx'

// Componente de teste
import TesteFirestore from './components/TesteFirestore.jsx'
import Diagnostico from './components/Diagnostico.jsx'
import DiagnosticoCompleto from './components/DiagnosticoCompleto.jsx'
import TesteAdmin from './components/TesteAdmin.jsx'
import TesteHome from './components/TesteHome.jsx'
import TesteAdminFirestore from './components/TesteAdminFirestore.jsx'
import AdminSimples from './components/AdminSimples.jsx'
import SeedManager from './components/SeedManager.jsx'
import TesteSeedDireto from './components/TesteSeedDireto.jsx'
import PopulaFirestore from './components/PopulaFirestore.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    future: {
      v7_startTransition: true
    },
    children: [
      // públicas
      { index: true, element: <Home /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'noticias', element: <Noticias /> },
      { path: 'marvel-dc', element: <MarvelDC /> },
      { path: 'fofocas', element: <Fofocas /> },
      { path: 'vendas', element: <Vendas /> },
      { path: 'contato', element: <Contato /> },
              { path: 'login', element: <Login /> },
              { path: 'planos', element: <Planos /> },
              { path: 'teste-firestore', element: <TesteFirestore /> },
              { path: 'diagnostico', element: <Diagnostico /> },
              { path: 'diagnostico-completo', element: <DiagnosticoCompleto /> },
              { path: 'teste-admin', element: <TesteAdmin /> },
              { path: 'teste-admin-firestore', element: <TesteAdminFirestore /> },
              { path: 'admin-simples', element: <AdminSimples /> },
              { path: 'seed-manager', element: <SeedManager /> },
              { path: 'teste-seed-direto', element: <TesteSeedDireto /> },
              { path: 'popula-firestore', element: <PopulaFirestore /> },
              { path: 'teste-home', element: <TesteHome /> },
              { path: 'home-simples', element: <HomeSimplificado /> },
              { path: 'privacidade', element: <Privacidade /> },
      { path: 'termos', element: <Termos /> },
      { path: 'sobre', element: <Sobre /> },
      { path: 'assinatura', element: <Assinatura /> },

      // membros
      { path: 'membros', element: <ProtectedMember><Premium /></ProtectedMember> },
      { path: 'minha-conta', element: <ProtectedRoute><MinhaConta /></ProtectedRoute> },

              // admin (somente o e-mail autorizado)
              { path: 'admin', element: <AdminRoute><Admin /></AdminRoute> },
              { path: 'admin/noticias', element: <AdminRoute><AdminNoticias /></AdminRoute> },
              { path: 'admin/vendas', element: <AdminRoute><AdminVendas /></AdminRoute> },
              { path: 'admin/portfolio', element: <AdminRoute><AdminPortfolio /></AdminRoute> },
              { path: 'admin/downloads', element: <AdminRoute><AdminDownloads /></AdminRoute> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
)

// Registrar service worker PWA (quando em produção)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
