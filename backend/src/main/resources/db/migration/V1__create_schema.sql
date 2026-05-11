-- =====================================================================
-- Poke-Mania — Schema inicial
-- =====================================================================
-- Cria todas as tabelas do domínio com chaves estrangeiras,
-- constraints de integridade e índices para consultas frequentes.

CREATE TABLE trainer (
    id          BIGSERIAL    PRIMARY KEY,
    nickname    VARCHAR(50)  NOT NULL UNIQUE,
    avatar_url  VARCHAR(500),
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE pokemon (
    id         BIGINT       PRIMARY KEY,            -- número da pokédex
    name       VARCHAR(50)  NOT NULL UNIQUE,
    image_url  VARCHAR(500) NOT NULL
);

CREATE TABLE pokemon_type (
    pokemon_id BIGINT      NOT NULL,
    type       VARCHAR(20) NOT NULL,
    PRIMARY KEY (pokemon_id, type),
    CONSTRAINT fk_pokemon_type_pokemon
        FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE
);

CREATE TABLE team (
    id          BIGSERIAL    PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    trainer_id  BIGINT       NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_team_trainer
        FOREIGN KEY (trainer_id) REFERENCES trainer(id) ON DELETE CASCADE
);

CREATE TABLE team_pokemon (
    team_id    BIGINT   NOT NULL,
    pokemon_id BIGINT   NOT NULL,
    slot       SMALLINT NOT NULL,
    PRIMARY KEY (team_id, pokemon_id),
    CONSTRAINT fk_team_pokemon_team
        FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE CASCADE,
    CONSTRAINT fk_team_pokemon_pokemon
        FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    CONSTRAINT ck_team_pokemon_slot CHECK (slot BETWEEN 1 AND 6),
    CONSTRAINT uk_team_pokemon_slot UNIQUE (team_id, slot)
);

CREATE TABLE favorite (
    id          BIGSERIAL PRIMARY KEY,
    trainer_id  BIGINT    NOT NULL,
    pokemon_id  BIGINT    NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_favorite_trainer
        FOREIGN KEY (trainer_id) REFERENCES trainer(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorite_pokemon
        FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    CONSTRAINT uk_favorite_trainer_pokemon UNIQUE (trainer_id, pokemon_id)
);

CREATE TABLE game_score (
    id               BIGSERIAL PRIMARY KEY,
    trainer_id       BIGINT    NOT NULL,
    score            INTEGER   NOT NULL,
    total_questions  INTEGER   NOT NULL,
    played_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_game_score_trainer
        FOREIGN KEY (trainer_id) REFERENCES trainer(id) ON DELETE CASCADE,
    CONSTRAINT ck_game_score_non_negative CHECK (score >= 0 AND total_questions > 0),
    CONSTRAINT ck_game_score_consistent CHECK (score <= total_questions)
);

CREATE INDEX idx_favorite_trainer    ON favorite(trainer_id);
CREATE INDEX idx_team_trainer        ON team(trainer_id);
CREATE INDEX idx_pokemon_type_type   ON pokemon_type(type);
CREATE INDEX idx_game_score_trainer  ON game_score(trainer_id);
CREATE INDEX idx_game_score_played   ON game_score(played_at DESC);
