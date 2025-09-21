# Portfolio Luan Cardoso

Projeto React com Vite, Tailwind CSS e dados locais (modo offline).

## 🚀 Funcionalidades

- **Homepage**: Apresentação profissional com serviços, projetos e notícias em destaque
- **Notícias**: Página de notícias com categorias Marvel/DC e Fofocas
- **Vendas**: Produtos afiliados com tracking de cliques
- **Login**: Sistema de autenticação local (localStorage)
- **PWA**: Progressive Web App com Service Worker
- **Responsivo**: Design adaptável para mobile e desktop

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router** (navegação)
- **Lucide React** (ícones)
- **Dados JSON locais** (sem backend)

## 📁 Estrutura

```
src/
├── components/ui/          # Componentes UI básicos
├── entities/              # Entidades de dados (News, Product, Project, User)
├── pages/                 # Páginas da aplicação
├── utils/                 # Utilitários
└── lib/                   # Helpers (cn function)

public/
├── assets/
│   ├── config/           # Arquivos JSON de dados
│   └── img/              # Imagens (produtos, projetos, notícias)
├── manifest.webmanifest  # PWA manifest
└── sw.js                 # Service Worker
```

## 🚀 Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar em desenvolvimento
```bash
npm run dev
```

### 3. Build para produção
```bash
npm run build
```

### 4. Preview da build
```bash
npm run preview
```

## 📊 Dados

Os dados são carregados de arquivos JSON em `public/assets/config/`:

- `site.config.json` - Configurações do site
- `news.json` - Notícias
- `products.json` - Produtos afiliados
- `projects.json` - Projetos do portfólio

## 🔧 Configuração

### Alias @
O projeto usa alias `@` para imports relativos ao `src/`:
```typescript
import { News } from "@/entities/News";
import { Button } from "@/components/ui/button";
```

### Tailwind CSS
Configurado com classes customizadas:
- `.line-clamp-3` - Truncar texto em 3 linhas

### PWA
- Manifest configurado para instalação
- Service Worker para cache offline
- Ícones em `public/assets/img/icons/`

## 📱 PWA

O projeto é um Progressive Web App:
- Instalável no dispositivo
- Funciona offline (cache básico)
- Ícone na tela inicial

## 🎨 Personalização

### Cores e tema
Edite `tailwind.config.js` para personalizar cores e espaçamentos.

### Dados
Modifique os arquivos JSON em `public/assets/config/` para atualizar conteúdo.

### Imagens
Adicione imagens nas pastas:
- `public/assets/img/produtos/`
- `public/assets/img/portfolio/`
- `public/assets/img/news/`
- `public/assets/img/icons/`

## 🔄 Migração para Backend

Para migrar para um backend real (Firebase, Supabase, etc.), apenas substitua as implementações nas entidades mantendo a mesma API:

```typescript
// Exemplo: substituir News.ts
export const News = {
  async filter(filterObj, sort, limit) {
    // Trocar getJSON por chamada para API
    const data = await fetch('/api/news').then(r => r.json());
    // ... resto da lógica igual
  }
}
```

## 📞 Contato

- **WhatsApp**: [5511960990726](https://wa.me/5511960990726)
- **Email**: luancr72024@gmail.com

---

Desenvolvido por **Luan Cardoso** - Soluções digitais que geram lucro 💰
"# luanxport" 
