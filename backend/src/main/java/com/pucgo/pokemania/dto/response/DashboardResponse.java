package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Métricas agregadas exibidas no dashboard do treinador.")
public record DashboardResponse(
        long totalPokemons,
        long totalFavorites,
        long totalTeams,
        Integer bestScore,
        Double averageScore,
        long gamesPlayed
) {}
