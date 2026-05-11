package com.pucgo.pokemania.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Schema(description = "Adiciona um pokémon a um time ou aos favoritos do treinador.")
public record AddPokemonRequest(
        @NotNull @Positive
        @Schema(example = "25", description = "Número da pokédex.")
        Long pokemonId
) {}
