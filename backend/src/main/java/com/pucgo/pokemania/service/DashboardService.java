package com.pucgo.pokemania.service;

import com.pucgo.pokemania.dto.response.DashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PokemonService pokemonService;
    private final TeamService teamService;
    private final FavoriteService favoriteService;
    private final GameScoreService scoreService;
    private final TrainerService trainerService;

    @Transactional(readOnly = true)
    public DashboardResponse buildFor(Long trainerId) {
        trainerService.getEntity(trainerId);
        long totalPokemons   = pokemonService.countAll();
        long totalFavorites  = favoriteService.countByTrainer(trainerId);
        long totalTeams      = teamService.countByTrainer(trainerId);
        long gamesPlayed     = scoreService.countByTrainer(trainerId);
        Integer best         = scoreService.bestScore(trainerId).orElse(null);
        Double avg           = scoreService.averageScore(trainerId).orElse(null);

        return new DashboardResponse(
                totalPokemons,
                totalFavorites,
                totalTeams,
                best,
                avg == null ? null : Math.round(avg * 100.0) / 100.0,
                gamesPlayed
        );
    }
}
