package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Favorito de um treinador.")
public record FavoriteResponse(
        Long id,
        Long trainerId,
        PokemonResponse pokemon,
        OffsetDateTime createdAt
) {}
