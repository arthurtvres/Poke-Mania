package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Envelope padrão de resposta da API.")
public record ApiResponse<T>(
        @Schema(description = "Dado(s) de retorno.") T data,
        @Schema(description = "Mensagem amigável.") String message,
        @Schema(description = "Carimbo temporal UTC.") OffsetDateTime timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, "Operação realizada com sucesso.", OffsetDateTime.now());
    }

    public static <T> ApiResponse<T> ok(T data, String message) {
        return new ApiResponse<>(data, message, OffsetDateTime.now());
    }
}
