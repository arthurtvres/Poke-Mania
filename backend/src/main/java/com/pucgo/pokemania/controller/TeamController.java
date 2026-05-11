package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.request.AddPokemonRequest;
import com.pucgo.pokemania.dto.request.TeamRequest;
import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.TeamResponse;
import com.pucgo.pokemania.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Teams", description = "Times montados pelos treinadores (até 6 pokémons cada).")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/trainers/{trainerId}/teams")
    @Operation(summary = "Lista todos os times de um treinador.")
    public ResponseEntity<ApiResponse<List<TeamResponse>>> listByTrainer(
            @PathVariable Long trainerId) {
        return ResponseEntity.ok(ApiResponse.ok(teamService.findAllByTrainer(trainerId)));
    }

    @GetMapping("/teams/{id}")
    @Operation(summary = "Busca um time pelo id.")
    public ResponseEntity<ApiResponse<TeamResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(teamService.findById(id)));
    }

    @PostMapping("/trainers/{trainerId}/teams")
    @Operation(summary = "Cria um novo time para o treinador.")
    public ResponseEntity<ApiResponse<TeamResponse>> create(
            @PathVariable Long trainerId,
            @Valid @RequestBody TeamRequest request,
            UriComponentsBuilder uriBuilder) {
        TeamResponse created = teamService.create(trainerId, request);
        URI location = uriBuilder.path("/api/v1/teams/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location)
                .body(ApiResponse.ok(created, "Time criado com sucesso."));
    }

    @PutMapping("/teams/{id}")
    @Operation(summary = "Renomeia um time.")
    public ResponseEntity<ApiResponse<TeamResponse>> rename(
            @PathVariable Long id,
            @Valid @RequestBody TeamRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(teamService.rename(id, request), "Time atualizado."));
    }

    @DeleteMapping("/teams/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove um time.")
    public void delete(@PathVariable Long id) {
        teamService.delete(id);
    }

    @PostMapping("/teams/{teamId}/pokemons")
    @Operation(summary = "Adiciona um pokémon ao time (máx. 6).")
    public ResponseEntity<ApiResponse<TeamResponse>> addPokemon(
            @PathVariable Long teamId,
            @Valid @RequestBody AddPokemonRequest request) {
        return ResponseEntity.ok(
                ApiResponse.ok(teamService.addPokemon(teamId, request.pokemonId()),
                        "Pokémon adicionado ao time."));
    }

    @DeleteMapping("/teams/{teamId}/pokemons/{pokemonId}")
    @Operation(summary = "Remove um pokémon do time.")
    public ResponseEntity<ApiResponse<TeamResponse>> removePokemon(
            @PathVariable Long teamId,
            @PathVariable Long pokemonId) {
        return ResponseEntity.ok(
                ApiResponse.ok(teamService.removePokemon(teamId, pokemonId),
                        "Pokémon removido do time."));
    }
}
