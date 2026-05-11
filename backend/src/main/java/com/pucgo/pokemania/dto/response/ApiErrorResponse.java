package com.pucgo.pokemania.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

@Schema(description = "Estrutura padronizada de erro retornada pela API.")
public record ApiErrorResponse(
        @Schema(example = "400") int status,
        @Schema(example = "Bad Request") String error,
        @Schema(example = "Dados inválidos.") String message,
        @Schema(example = "/api/v1/trainers") String path,
        OffsetDateTime timestamp,
        List<FieldError> fieldErrors
) {

    public static ApiErrorResponse of(int status, String error, String message, String path) {
        return new ApiErrorResponse(status, error, message, path, OffsetDateTime.now(), null);
    }

    public static ApiErrorResponse of(int status, String error, String message,
                                      String path, List<FieldError> fieldErrors) {
        return new ApiErrorResponse(status, error, message, path, OffsetDateTime.now(), fieldErrors);
    }

    @Schema(description = "Erro de validação em um campo específico.")
    public record FieldError(
            @Schema(example = "nickname") String field,
            @Schema(example = "não pode estar em branco") String message,
            @Schema(example = "") Object rejectedValue
    ) {}
}
