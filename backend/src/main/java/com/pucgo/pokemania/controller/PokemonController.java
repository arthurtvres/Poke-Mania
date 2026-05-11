package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.PageResponse;
import com.pucgo.pokemania.dto.response.PokemonResponse;
import com.pucgo.pokemania.service.PokemonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pokemons")
@RequiredArgsConstructor
@Tag(name = "Pokemons", description = "Catálogo de pokémons (read-only).")
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping
    @Operation(summary = "Lista pokémons com filtros opcionais e paginação.")
    public ResponseEntity<ApiResponse<PageResponse<PokemonResponse>>> list(
            @Parameter(description = "Filtro por nome (busca parcial, case-insensitive).")
            @RequestParam(required = false) String name,
            @Parameter(description = "Filtro por tipo (ex.: electric, fire).")
            @RequestParam(required = false) String type,
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {

        var page = pokemonService.search(name, type, pageable);
        var body = new PageResponse<>(
                page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages(),
                page.isFirst(), page.isLast()
        );
        return ResponseEntity.ok(ApiResponse.ok(body));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um pokémon por número da pokédex.")
    public ResponseEntity<ApiResponse<PokemonResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(pokemonService.findById(id)));
    }
}
