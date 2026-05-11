package com.pucgo.pokemania.service;

import com.pucgo.pokemania.domain.exception.ResourceNotFoundException;
import com.pucgo.pokemania.domain.model.Pokemon;
import com.pucgo.pokemania.dto.mapper.PokemonMapper;
import com.pucgo.pokemania.dto.response.PokemonResponse;
import com.pucgo.pokemania.repository.PokemonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final PokemonMapper pokemonMapper;

    @Transactional(readOnly = true)
    public Page<PokemonResponse> search(String name, String type, Pageable pageable) {
        // Lowercase aqui em vez de no SQL — assim a query não precisa chamar LOWER(?)
        // sobre um parâmetro possivelmente nulo, o que o PostgreSQL não consegue tipar.
        // String vazia (e não null) como sentinela de "sem filtro": param null é
        // ligado como Types.OTHER pelo Hibernate e o PostgreSQL infere bytea.
        String normalizedName = (name == null || name.isBlank()) ? "" : name.trim().toLowerCase();
        String normalizedType = (type == null || type.isBlank()) ? "" : type.trim().toLowerCase();
        return pokemonRepository.search(normalizedName, normalizedType, pageable)
                .map(pokemonMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public PokemonResponse findById(Long id) {
        return pokemonMapper.toResponse(getEntity(id));
    }

    public Pokemon getEntity(Long id) {
        return pokemonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pokémon", id));
    }

    public long countAll() {
        return pokemonRepository.count();
    }
}
