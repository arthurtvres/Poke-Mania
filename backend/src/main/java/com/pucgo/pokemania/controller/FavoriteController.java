package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.request.AddPokemonRequest;
import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.FavoriteResponse;
import com.pucgo.pokemania.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trainers/{trainerId}/favorites")
@RequiredArgsConstructor
@Tag(name = "Favorites", description = "Pokémons favoritados por treinador.")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    @Operation(summary = "Lista favoritos do treinador.")
    public ResponseEntity<ApiResponse<List<FavoriteResponse>>> list(@PathVariable Long trainerId) {
        return ResponseEntity.ok(ApiResponse.ok(favoriteService.findAllByTrainer(trainerId)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Adiciona um pokémon aos favoritos.")
    public ApiResponse<FavoriteResponse> add(
            @PathVariable Long trainerId,
            @Valid @RequestBody AddPokemonRequest request) {
        return ApiResponse.ok(favoriteService.add(trainerId, request.pokemonId()),
                "Favorito adicionado.");
    }

    @DeleteMapping("/{pokemonId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove um favorito.")
    public void remove(@PathVariable Long trainerId, @PathVariable Long pokemonId) {
        favoriteService.remove(trainerId, pokemonId);
    }
}
