# 🔴 Poke-Mania

> Sistema de gerenciamento de treinadores Pokémon — montagem de times, favoritos, catálogo e minigame "Quem é esse Pokémon?", com ranking persistido.
>
> Trabalho final da disciplina **Desenvolvimento de Software para Web** — PUC-GO, 2026.

![Java](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

---

## 👥 Integrantes

- **Arthur Moraes Tavares**
- **Igor de Oliveira Bittencourt**

**Disciplina:** Desenvolvimento de Software para Web · **Professor:** Fernando · **2026**

---

## 🎯 Tema escolhido

Sistema temático Pokémon, batizado de **Poke-Mania**. Implementa um domínio com cinco entidades inter-relacionadas (Treinador, Pokémon, Time, Favorito, Pontuação), permitindo cadastros, montagem de times de até 6 pokémons (regra de negócio do universo Pokémon), favoritos e um minigame de adivinhação com ranking competitivo.

---

## ✨ Funcionalidades

- ✅ **CRUD completo** de Treinadores e Times
- ✅ **Catálogo** de pokémons com busca por nome e filtro por tipo
- ✅ **Favoritar/desfavoritar** pokémons
- ✅ **Montagem de times** (regra: máx. 6 pokémons por time, slots únicos 1-6)
- ✅ **Dashboard** com métricas agregadas (total de pokémons, favoritos, times, melhor pontuação, jogos jogados)
- ✅ **Minigame "Quem é esse Pokémon?"** com pontuação persistida e ranking global
- ✅ **Multi-usuário** (várias contas de treinador, sem necessidade de login)
- ✅ **Tema dark/light** alternável
- ✅ **Toasts** de feedback (sucesso/erro/aviso)
- ✅ **Validações** no front e back-end
- ✅ **Tratamento global de exceções** com payload padronizado
- ✅ **Swagger UI** documentando todos os endpoints
- ✅ **Seed automático** do catálogo de pokémons (offline ou via PokéAPI)
- ✅ **Docker Compose** para subir o PostgreSQL com um único comando

---

## 🏗️ Arquitetura

```
┌──────────────────────┐  HTTP/JSON  ┌──────────────────────┐  JDBC  ┌──────────────┐
│  React + TypeScript  │ ──────────► │  Spring Boot (Java)  │ ─────► │  PostgreSQL  │
│     (Vite, port 5173)│ ◄────────── │       (port 8080)    │ ◄───── │   (port 5432)│
└──────────────────────┘    CORS     └──────────────────────┘ Hibern.└──────────────┘
```

### Camadas do back-end

```
controller   → recebe HTTP, valida payload (DTO Request)
   ↓
service      → regras de negócio (ex.: máx. 6 pokémons/time)
   ↓
repository   → Spring Data JPA (Hibernate)
   ↓
entity       → mapeamento ORM (@Entity)
```

### Estrutura de pastas

```
Poke-Mania/
├── backend/
│   └── src/main/java/com/pucgo/pokemania/
│       ├── PokemaniaApplication.java
│       ├── config/                  ← CORS, OpenAPI, DataSeederRunner
│       ├── controller/              ← REST endpoints + GlobalExceptionHandler
│       ├── domain/
│       │   ├── model/               ← entidades JPA
│       │   └── exception/           ← exceções de domínio
│       ├── dto/
│       │   ├── request/             ← payloads de entrada (com @Valid)
│       │   ├── response/            ← payloads de saída (ApiResponse envelope)
│       │   └── mapper/              ← conversão Entity ↔ DTO
│       ├── repository/              ← Spring Data JPA
│       └── service/                 ← regras de negócio
│   └── src/main/resources/
│       ├── application.yaml         ← config principal
│       └── db/
│           ├── migration/           ← scripts Flyway
│           └── seed/                ← seed inicial do catálogo
│
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── contexts/                ← TrainerContext
│       ├── components/
│       │   ├── modals/              ← Modals Bootstrap (substituem prompt/alert)
│       │   ├── trainerSelector/
│       │   ├── pokemonCard/
│       │   ├── sidebar/
│       │   ├── footer/
│       │   └── pageContent/
│       ├── pages/
│       ├── services/                ← chamadas ao back-end via axios
│       ├── interfaces/              ← tipos TypeScript
│       ├── style/                   ← CSS
│       └── utils/
│
├── docker-compose.yml               ← PostgreSQL + Adminer
└── trabalho.md                      ← requisitos da atividade
```

---

## 🚀 Como rodar

### Modo "tudo-em-um" com Docker (recomendado)

Apenas Docker é necessário:

```bash
docker compose up -d --build
```

Isso constrói e sobe **4 containers**:

| Serviço | Porta | URL |
| --- | --- | --- |
| 🐘 PostgreSQL 16 | 5432 | `localhost:5432` |
| ☕ Backend Spring Boot | 8080 | [API](http://localhost:8080) · [Swagger](http://localhost:8080/swagger-ui.html) |
| ⚛️ Frontend (nginx) | 5173 | [App](http://localhost:5173) |
| 🗄️ Adminer (DB UI) | 8081 | [Adminer](http://localhost:8081) |

Na primeira subida, o **DataSeederRunner** popula o catálogo de pokémons.

Para parar tudo:

```bash
docker compose down
```

Para parar e apagar os dados do banco também:

```bash
docker compose down -v
```

### Modo desenvolvimento local

Útil para iterar com hot-reload.

**Pré-requisitos:** Java 21+, Node.js 20+, Docker (apenas para o banco).

```bash
# 1) sobe só o banco
docker compose up -d postgres

# 2) backend (terminal A)
cd backend
./mvnw spring-boot:run          # Linux/Mac
mvnw.cmd spring-boot:run         # Windows

# 3) frontend (terminal B)
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

---

## 📚 Endpoints principais

Documentação interativa completa em **Swagger UI** (`http://localhost:8080/swagger-ui.html`).

### Treinadores (CRUD completo)
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/trainers` | Lista (paginado) |
| GET | `/api/v1/trainers/{id}` | Busca por id |
| POST | `/api/v1/trainers` | Cria |
| PUT | `/api/v1/trainers/{id}` | Atualiza |
| DELETE | `/api/v1/trainers/{id}` | Remove (cascata em times/favoritos/scores) |

### Pokémons (catálogo)
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/pokemons?name=pika&type=electric&page=0&size=20` | Lista com filtros |
| GET | `/api/v1/pokemons/{id}` | Busca por pokédex number |

### Times
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/trainers/{trainerId}/teams` | Lista times do treinador |
| POST | `/api/v1/trainers/{trainerId}/teams` | Cria time |
| PUT | `/api/v1/teams/{id}` | Renomeia |
| DELETE | `/api/v1/teams/{id}` | Remove |
| POST | `/api/v1/teams/{teamId}/pokemons` | Adiciona pokémon (máx. 6) |
| DELETE | `/api/v1/teams/{teamId}/pokemons/{pokemonId}` | Remove pokémon |

### Favoritos
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/trainers/{trainerId}/favorites` | Lista |
| POST | `/api/v1/trainers/{trainerId}/favorites` | Adiciona |
| DELETE | `/api/v1/trainers/{trainerId}/favorites/{pokemonId}` | Remove |

### Pontuações (minigame)
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/trainers/{trainerId}/scores` | Histórico |
| POST | `/api/v1/trainers/{trainerId}/scores` | Registra pontuação |
| GET | `/api/v1/scores/ranking?limit=10` | Top global |

### Dashboard
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/v1/trainers/{trainerId}/dashboard` | Métricas agregadas |

---

## 🧪 Exemplos de requisições

### Criar treinador

```bash
curl -X POST http://localhost:8080/api/v1/trainers \
  -H "Content-Type: application/json" \
  -d '{"nickname":"AshKetchum","avatarUrl":"https://i.pravatar.cc/150?u=ash"}'
```

### Buscar pokémons elétricos

```bash
curl 'http://localhost:8080/api/v1/pokemons?type=electric&page=0&size=10'
```

### Criar time e adicionar Pikachu

```bash
# 1) criar time (resposta traz o id, ex.: 1)
curl -X POST http://localhost:8080/api/v1/trainers/1/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Time Elétrico"}'

# 2) adicionar Pikachu (pokédex #25)
curl -X POST http://localhost:8080/api/v1/teams/1/pokemons \
  -H "Content-Type: application/json" \
  -d '{"pokemonId":25}'
```

### Registrar pontuação no minigame

```bash
curl -X POST http://localhost:8080/api/v1/trainers/1/scores \
  -H "Content-Type: application/json" \
  -d '{"score":8,"totalQuestions":10}'
```

### Resposta padronizada (envelope)

```json
{
  "data": { "id": 1, "nickname": "AshKetchum", "teamsCount": 0, "favoritesCount": 0, "createdAt": "..." },
  "message": "Treinador criado com sucesso.",
  "timestamp": "2026-05-11T10:00:00Z"
}
```

### Resposta de erro padronizada

```json
{
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "O time já possui o máximo de 6 pokémons.",
  "path": "/api/v1/teams/1/pokemons",
  "timestamp": "2026-05-11T10:00:00Z"
}
```

---

## 🌐 CORS

O React (em `localhost:5173`) e o Java (em `localhost:8080`) rodam em **origens diferentes**. Por padrão o navegador bloqueia esse tipo de chamada (Same-Origin Policy). O back-end **explicitamente permite** origens específicas em `backend/src/main/java/com/pucgo/pokemania/config/CorsConfig.java`:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:4173")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

Origens adicionais podem ser configuradas via `application.yaml` (`pokemania.cors.allowed-origins`).

---

## 🧱 Banco de dados

Schema gerenciado por **Flyway** (`backend/src/main/resources/db/migration/V1__create_schema.sql`).

```
trainer ──┬─< team ──< team_pokemon >── pokemon
          ├─< favorite ─────────────────┘
          └─< game_score
                                          pokemon ──< pokemon_type
```

| Tabela | Campos principais | Constraints |
|---|---|---|
| `trainer` | id (PK), nickname (UK), avatar_url, created_at | nickname UNIQUE |
| `pokemon` | id (PK = pokédex), name (UK), image_url | — |
| `pokemon_type` | pokemon_id, type | PK composta, FK cascata |
| `team` | id (PK), name, trainer_id (FK), timestamps | FK cascata |
| `team_pokemon` | team_id, pokemon_id, slot | PK composta, slot CHECK 1-6, UNIQUE(team_id, slot) |
| `favorite` | id (PK), trainer_id, pokemon_id, created_at | UNIQUE(trainer_id, pokemon_id) |
| `game_score` | id, trainer_id, score, total_questions, played_at | CHECK score ≤ total_questions |

---

## 🎬 Vídeo explicativo

🔗 *Link a ser adicionado após gravação.*

---

## 🧠 Decisões arquiteturais

| Decisão | Por quê |
|---|---|
| **Spring Boot + JPA/Hibernate** ao invés de Servlets puros | Stack moderno, padrão de mercado. Hibernate é uma das opções permitidas pelo enunciado (Opção A). Spring MVC é a evolução natural de Servlets — o `DispatcherServlet` continua presente por baixo. |
| **DTOs separados (Request/Response)** | Isola o contrato da API do modelo interno; permite evoluir entidades sem quebrar clientes. |
| **Envelope `ApiResponse`** | Resposta consistente (`data`/`message`/`timestamp`) — facilita parsing no front e fica profissional no Postman. |
| **Flyway** | Versiona o schema do banco. Setup determinístico em qualquer máquina. |
| **Seed configurável** | Lê primeiro JSON local (rápido, offline); fallback para PokéAPI. Configurável via `pokemania.seed.*`. |
| **Multi-trainer sem login** | Demonstra modelagem relacional sem complexidade de Spring Security. Foco do trabalho é CRUD e integração. |
| **GlobalExceptionHandler** | Centraliza tratamento de erros, retorna sempre o mesmo formato. Permite mapear `BusinessRuleException → 422`, `ResourceNotFoundException → 404`, etc. |
| **CommandLineRunner para seed** | Roda apenas se a tabela estiver vazia — idempotente, seguro para múltiplas subidas. |
| **TeamPokemon como entidade associativa** | Permite armazenar `slot` (posição 1-6) na relação ManyToMany, característica do domínio Pokémon. |

---

## 🛠️ Tecnologias

### Back-end
- Java 21
- Spring Boot 4.0 (Web MVC, Data JPA, Validation, DevTools)
- Hibernate 6+
- PostgreSQL 16
- Flyway (migrations)
- SpringDoc OpenAPI 2.6 (Swagger UI)
- Lombok
- Maven

### Front-end
- React 19
- TypeScript 6
- Vite 8
- React Router 7
- Axios
- React Toastify
- Bootstrap 5.3 + Bootstrap Icons

### Infra
- Docker Compose (PostgreSQL + Adminer)

---

## 📄 Licença

Trabalho acadêmico — uso restrito à disciplina.
