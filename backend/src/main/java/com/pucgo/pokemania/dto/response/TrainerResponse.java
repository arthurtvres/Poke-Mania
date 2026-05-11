package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Treinador (dono de times, favoritos e pontuações).")
public record TrainerResponse(
        Long id,
        String nickname,
        String avatarUrl,
        OffsetDateTime createdAt,
        long teamsCount,
        long favoritesCount
) {}
