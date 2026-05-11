package com.pucgo.pokemania.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

@Schema(description = "Payload de criação ou atualização de um treinador.")
public record TrainerRequest(
        @NotBlank
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[A-Za-z0-9_\\- ]+$", message = "use apenas letras, números, espaço, '_' ou '-'")
        @Schema(example = "AshKetchum")
        String nickname,

        @URL
        @Size(max = 500)
        @Schema(example = "https://i.pravatar.cc/150?u=ash")
        String avatarUrl
) {}
