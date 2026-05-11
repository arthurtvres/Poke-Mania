package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Pontuação no minigame 'Who's That Pokémon'.")
public record GameScoreResponse(
        Long id,
        Long trainerId,
        String trainerNickname,
        Integer score,
        Integer totalQuestions,
        double accuracy,
        OffsetDateTime playedAt
) {}
