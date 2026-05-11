package com.pucgo.pokemania.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Payload de criação ou renomeação de time.")
public record TeamRequest(
        @NotBlank
        @Size(min = 1, max = 100)
        @Schema(example = "Time Elétrico")
        String name
) {}
