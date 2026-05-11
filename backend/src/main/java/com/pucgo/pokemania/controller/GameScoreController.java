package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.request.GameScoreRequest;
import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.GameScoreResponse;
import com.pucgo.pokemania.service.GameScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Game Scores", description = "Pontuações do minigame 'Who's That Pokémon'.")
public class GameScoreController {

    private final GameScoreService scoreService;

    @GetMapping("/trainers/{trainerId}/scores")
    @Operation(summary = "Lista pontuações de um treinador (mais recentes primeiro).")
    public ResponseEntity<ApiResponse<List<GameScoreResponse>>> listByTrainer(
            @PathVariable Long trainerId) {
        return ResponseEntity.ok(ApiResponse.ok(scoreService.findByTrainer(trainerId)));
    }

    @PostMapping("/trainers/{trainerId}/scores")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registra uma nova pontuação.")
    public ApiResponse<GameScoreResponse> register(
            @PathVariable Long trainerId,
            @Valid @RequestBody GameScoreRequest request) {
        return ApiResponse.ok(scoreService.register(trainerId, request),
                "Pontuação registrada.");
    }

    @GetMapping("/scores/ranking")
    @Operation(summary = "Top global de pontuações.")
    public ResponseEntity<ApiResponse<List<GameScoreResponse>>> ranking(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(scoreService.ranking(limit)));
    }
}
