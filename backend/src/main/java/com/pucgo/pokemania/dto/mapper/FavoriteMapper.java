package com.pucgo.pokemania.dto.mapper;

import com.pucgo.pokemania.domain.model.Favorite;
import com.pucgo.pokemania.dto.response.FavoriteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FavoriteMapper {

    private final PokemonMapper pokemonMapper;

    public FavoriteResponse toResponse(Favorite favorite) {
        return new FavoriteResponse(
                favorite.getId(),
                favorite.getTrainer().getId(),
                pokemonMapper.toResponse(favorite.getPokemon()),
                favorite.getCreatedAt()
        );
    }
}
