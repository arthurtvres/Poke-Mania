# PokéMania

Aplicação web para explorar Pokémons, favoritar criaturas, montar times e jogar o modo Quem é esse Pokémon?.

O projeto foi desenvolvido com React + TypeScript + Vite e consome dados da PokeAPI.

## Desenvolvedores

- Arthur Moraes Tavares
- Igor de Oliveira Bittencourt Moreira

## Funcionalidades

### Dashboard

- Exibe o total de Pokémons carregados.
- Exibe o total de favoritos.
- Exibe o total de times criados.
- Cada card é clicável e direciona para sua área correspondente.

### Catálogo de Pokémons

- Lista todos os Pokémons com imagem, nome, número e tipos.
- Busca por nome em tempo real.
- Filtro por tipo com ícones visuais.
- Ações por card:
	- favoritar ou desfavoritar;
	- adicionar ao time.

### Favoritos

- Página dedicada aos Pokémons favoritados.
- Reutiliza os cards com ações de desfavoritar e adicionar ao time.

### Gestão de times

- Criação de times com nome sequencial (Time 1, Time 2, ...).
- Exclusão de times.
- Remoção individual de Pokémons dentro de cada time.
- Regra de negócio: máximo de 6 Pokémons por time.
- Validações:
	- impede adicionar Pokémon se não houver time criado;
	- impede selecionar time inválido;
	- impede exceder 6 Pokémons no time.

### 🧭 Navegação
- Rotas com React Router:
	- `/` Dashboard
	- `/pokemons` Catálogo
	- `/my-team` Meus Times
	- `/favorites` Pokémons Favoritados
	- `/who-is-that-pokemon` Mini Game de acertar o pokémon.

### 📱 Layout
- Layout responsivo com grid e utilitários Bootstrap.
- Ícones com Bootstrap Icons e Png Icons.

## Rotas da aplicação

- / Dashboard
- /pokemons Catálogo de Pokémons
- /favorites Favoritos
- /my-team Meus Times
- /who-is-that-pokemon Mini game

## Stack e dependências

- React 19
- TypeScript 6
- Vite 8
- React Router DOM 7
- ESLint 9
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3 (CDN)

## Fonte de dados

- Endpoint base: https://pokeapi.co/api/v2/pokemon?limit=1028
- Fluxo atual:
	- busca a listagem principal;
	- para cada item, busca detalhes individuais (imagem, id e tipos).

## Estrutura do projeto

src/
	components/
		dashboardCards/
		header/
		pokemonCard/
		sidebar/
	interfaces/
		IDashBoardProps.ts
		IPokemon.ts
		IPokemonCardProps.ts
		ITeam.ts
		WhoIsThatPokemonProps.ts
	pages/
		Dashboard.tsx
		Favorites.tsx
		MyTeam.tsx
		Pokemons.tsx
		WhoIsThatPokemon.tsx
	services/
		pokemonService.ts
	utils/
		typeIcons.ts
	App.tsx
	App.css
	index.css
	main.tsx

public/
	iconpokemania.png
	types/

## Como executar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

npm install

### Ambiente de desenvolvimento

npm run dev

A aplicação abre em http://localhost:5173

### Build de produção

npm run build

### Preview do build

npm run preview

### Lint

npm run lint

## Observações técnicas

- Favoritos, times e pontuação do mini game ficam apenas em memória (estado React).
- Ao recarregar a página, esses dados são perdidos.
- O carregamento inicial faz muitas requisições paralelas (1 listagem + detalhes por Pokémon), o que pode impactar tempo de carregamento em conexões lentas.
