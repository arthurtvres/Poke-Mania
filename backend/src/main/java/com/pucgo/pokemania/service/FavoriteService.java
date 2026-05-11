package com.pucgo.pokemania.service;

import com.pucgo.pokemania.domain.exception.DuplicateResourceException;
import com.pucgo.pokemania.domain.exception.ResourceNotFoundException;
import com.pucgo.pokemania.domain.model.Favorite;
import com.pucgo.pokemania.domain.model.Pokemon;
import com.pucgo.pokemania.domain.model.Trainer;
import com.pucgo.pokemania.dto.mapper.FavoriteMapper;
import com.pucgo.pokemania.dto.response.FavoriteResponse;
import com.pucgo.pokemania.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final TrainerService trainerService;
    private final PokemonService pokemonService;
    private final FavoriteMapper favoriteMapper;

    @Transactional(readOnly = true)
    public List<FavoriteResponse> findAllByTrainer(Long trainerId) {
        trainerService.getEntity(trainerId);
        return favoriteRepository.findAllByTrainerIdOrderByCreatedAtDesc(trainerId).stream()
                .map(favoriteMapper::toResponse)
                .toList();
    }

    @Transactional
    public FavoriteResponse add(Long trainerId, Long pokemonId) {
        if (favoriteRepository.existsByTrainerIdAndPokemonId(trainerId, pokemonId)) {
            throw new DuplicateResourceException("Este pokémon já está nos favoritos do treinador.");
        }
        Trainer trainer = trainerService.getEntity(trainerId);
        Pokemon pokemon = pokemonService.getEntity(pokemonId);

        Favorite fav = Favorite.builder()
                .trainer(trainer)
                .pokemon(pokemon)
                .build();
        fav = favoriteRepository.save(fav);
        log.info("Favorito adicionado: trainerId={} pokemonId={}", trainerId, pokemonId);
        return favoriteMapper.toResponse(fav);
    }

    @Transactional
    public void remove(Long trainerId, Long pokemonId) {
        Favorite fav = favoriteRepository.findByTrainerIdAndPokemonId(trainerId, pokemonId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Favorito não encontrado para pokémon %s do treinador %s."
                                .formatted(pokemonId, trainerId)));
        favoriteRepository.delete(fav);
        log.info("Favorito removido: trainerId={} pokemonId={}", trainerId, pokemonId);
    }

    public long countByTrainer(Long trainerId) {
        return favoriteRepository.countByTrainerId(trainerId);
    }
}
