package com.pucgo.pokemania.dto.mapper;

import com.pucgo.pokemania.domain.model.Team;
import com.pucgo.pokemania.dto.response.TeamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeamMapper {

    private final PokemonMapper pokemonMapper;

    public TeamResponse toResponse(Team team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getTrainer().getId(),
                team.getRoster().stream()
                        .map(tp -> pokemonMapper.toResponse(tp.getPokemon()))
                        .toList(),
                team.getCreatedAt(),
                team.getUpdatedAt()
        );
    }
}
