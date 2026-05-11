package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Pokémon do catálogo (formato consumido pelo front-end).")
public record PokemonResponse(
        Long number,
        String name,
        String image,
        List<String> types
) {}
