package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.request.TrainerRequest;
import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.PageResponse;
import com.pucgo.pokemania.dto.response.TrainerResponse;
import com.pucgo.pokemania.service.TrainerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/trainers")
@RequiredArgsConstructor
@Tag(name = "Trainers", description = "Gerenciamento de treinadores.")
public class TrainerController {

    private final TrainerService trainerService;

    @GetMapping
    @Operation(summary = "Lista treinadores (paginado).")
    public ResponseEntity<ApiResponse<PageResponse<TrainerResponse>>> list(
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        var page = trainerService.findAll(pageable);
        var body = new PageResponse<>(
                page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages(),
                page.isFirst(), page.isLast()
        );
        return ResponseEntity.ok(ApiResponse.ok(body));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um treinador pelo id.")
    public ResponseEntity<ApiResponse<TrainerResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(trainerService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Cria um novo treinador.")
    public ResponseEntity<ApiResponse<TrainerResponse>> create(
            @Valid @RequestBody TrainerRequest request,
            UriComponentsBuilder uriBuilder) {
        TrainerResponse created = trainerService.create(request);
        URI location = uriBuilder.path("/api/v1/trainers/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location)
                .body(ApiResponse.ok(created, "Treinador criado com sucesso."));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um treinador existente.")
    public ResponseEntity<ApiResponse<TrainerResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody TrainerRequest request) {
        return ResponseEntity.ok(
                ApiResponse.ok(trainerService.update(id, request), "Treinador atualizado."));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove um treinador (e seus times, favoritos e pontuações).")
    public void delete(@PathVariable Long id) {
        trainerService.delete(id);
    }
}
