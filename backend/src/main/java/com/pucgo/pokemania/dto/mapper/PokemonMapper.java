package com.pucgo.pokemania.dto.mapper;

import com.pucgo.pokemania.domain.model.Pokemon;
import com.pucgo.pokemania.dto.response.PokemonResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PokemonMapper {

    public PokemonResponse toResponse(Pokemon pokemon) {
        return new PokemonResponse(
                pokemon.getId(),
                pokemon.getName(),
                pokemon.getImageUrl(),
                pokemon.getTypes().stream().sorted().toList()
        );
    }

    public List<PokemonResponse> toResponse(List<Pokemon> pokemons) {
        return pokemons.stream().map(this::toResponse).toList();
    }
}
