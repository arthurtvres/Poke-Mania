# 🎮 PokéMania

Aplicação web para explorar Pokémon, favoritar criaturas e montar times personalizados.
O projeto foi construído com React + TypeScript + Vite e utiliza dados da PokeAPI.

## 👨‍💻 Desenvolvedores Responsáveis

- Arthur Moraes Tavares
- Igor de Oliveira Bittencourt Moreira


## ✨ Funcionalidades Implementadas

### 📊 Dashboard
- Exibe total de Pokémon carregados da API.
- Exibe total de favoritos marcados pelo usuário.
- Exibe total de times criados.

### 🔎 Catálogo de Pokémon
- Lista Pokémon com imagem, nome, número da Pokédex e tipos.
- Busca por nome (filtro por texto em tempo real).
- Filtro por tipo (grass, fire, water, electric, etc.).
- Ícones visuais para tipos de Pokémon.

### ❤️ Favoritos
- Cada card permite alternar favorito com ícone de coração.
- O contador de favoritos no dashboard é atualizado dinamicamente.

### 👥 Gestão de Times
- Criação de times com nome sequencial (Time 1, Time 2, ...).
- Adição de Pokémon ao time selecionado.
- Remoção de Pokémon de um time.
- Exclusão de time.
- Regra de negócio: máximo de 6 Pokémon por time.
- Validações de uso:
	- alerta ao tentar adicionar Pokémon sem existir time criado;
	- alerta ao selecionar time inválido;
	- alerta ao tentar ultrapassar 6 Pokémon no time.

### 🧭 Navegação
- Rotas com React Router:
	- `/` Dashboard
	- `/pokemons` Catálogo
	- `/my-team` Meus Times
- Menu lateral com destaque automático da rota ativa.

### 📱 Layout
- Layout responsivo com grid e utilitários Bootstrap.
- Ícones com Bootstrap Icons.

## 🛠️ Stack do Projeto

- React 19
- TypeScript 6
- Vite 8
- React Router DOM 7
- ESLint 9
- Bootstrap 5 (via CDN)
- Bootstrap Icons (via CDN)

## 🌐 Fonte de Dados

- API usada: https://pokeapi.co/api/v2/pokemon?limit=1028
- Fluxo atual:
	- busca lista principal de Pokémon;
	- busca detalhes de cada Pokémon para montar o modelo usado na interface.

## 📁 Estrutura Atual

```text
src/
├── components/
│   ├── dashboardCards/
│   ├── header/
│   ├── pokemonCard/
│   └── sidebar/
├── interfaces/
│   ├── IDashBoardProps.ts
│   ├── IPokemon.ts
│   ├── IPokemonCardProps.ts
│   └── ITeam.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── MiniGame.tsx
│   ├── MyTeam.tsx
│   └── Pokemons.tsx
├── services/
│   └── pokemonService.ts
├── styles/
├── utils/
│   └── typeIcons.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm

### Instalação

```bash
npm install
```

### Ambiente de Desenvolvimento

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📌 Observações

- Os estados de favoritos e times são mantidos em memória (estado React) durante a sessão.
- Ao recarregar a página, os dados voltam ao estado inicial.
