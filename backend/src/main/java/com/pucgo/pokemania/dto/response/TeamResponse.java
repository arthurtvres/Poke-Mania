package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

@Schema(description = "Time montado por um treinador (até 6 pokémons).")
public record TeamResponse(
        Long id,
        String name,
        Long trainerId,
        List<PokemonResponse> pokemons,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}
