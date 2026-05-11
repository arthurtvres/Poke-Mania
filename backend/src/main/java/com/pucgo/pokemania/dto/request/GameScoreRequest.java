package com.pucgo.pokemania.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Schema(description = "Pontuação registrada após uma partida do minigame.")
public record GameScoreRequest(
        @NotNull @Min(0)
        @Schema(example = "8")
        Integer score,

        @NotNull @Positive
        @Schema(example = "10")
        Integer totalQuestions
) {}
