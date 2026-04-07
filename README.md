# 🎮 PokéMania

Uma aplicação web moderna para gerenciar e explorar Pokémon. Construída com React, TypeScript e Vite, oferece uma experiência rápida e intuitiva para descobrir novos Pokémon e montar seu time personalizado.

## ✨ Funcionalidades

- 📊 **Dashboard** - Visualize estatísticas e informações resumidas
- 🔍 **Explorar Pokémon** - Navegue e descubra todos os Pokémon disponíveis
- ❤️ **Favoritos** - Marque seus Pokémon favoritos
- 👥 **Meu Time** - Crie e gerencie seu time personalizado de Pokémon
- 🎨 **Interface Responsiva** - Funciona perfeitamente em desktop e mobile
- ⚡ **Performance de Primeiro Nível** - Compilação rápida com Vite

## 🛠️ Tecnologias Utilizadas

- **React 19.2** - Biblioteca UI moderna
- **TypeScript 6.0** - Tipagem estática para maior segurança
- **Vite 8.0** - Build tool ultrarrápido
- **React Router DOM 7.14** - Roteamento de aplicação single-page
- **ESLint** - Linting de código com regras de qualidade

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── dashboardCards/      # Cards exibidos no dashboard
│   ├── header/              # Cabeçalho da aplicação
│   ├── pokemonCard/         # Card individual de Pokémon
│   └── sidebar/             # Menu lateral de navegação
├── interfaces/
│   ├── IDashBoardProps.ts   # Props do dashboard
│   ├── IPokemon.ts          # Interface do Pokémon
│   └── IPokemonCardProps.ts # Props do card de Pokémon
├── pages/
│   ├── Dashboard.tsx        # Página principal
│   ├── MyTeam.tsx           # Página do meu time
│   └── Pokemons.tsx         # Página de exploração de Pokémon
├── services/                # Serviços e API calls
├── styles/                  # Arquivos CSS globais
├── App.tsx                  # Componente raiz
├── main.tsx                 # Entrada da aplicação
└── index.css               # Estilos globais
```

## 🚀 Começando

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd PokéMania
```

2. Instale as dependências:
```bash
npm install
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

Para compilar a aplicação para produção:

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`

### Preview do Build

Para visualizar o build de produção localmente:

```bash
npm run preview
```

### Linting

Para verificar a qualidade do código:

```bash
npm run lint
```

## 🎯 Componentes Principais

### Header
Cabeçalho da aplicação com navegação e branding

### Sidebar
Menu lateral com links para as principais páginas:
- Dashboard
- Explorar Pokémon
- Meu Time

### PokemonCard
Card individual mostrando informações do Pokémon:
- Imagem
- Nome
- Tipos
- Número da Pokédex
- Botão de favoritos

### DashboardCards
Componentes de exibição para estatísticas e resumos no dashboard
