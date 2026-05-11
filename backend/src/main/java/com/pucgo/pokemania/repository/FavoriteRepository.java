package com.pucgo.pokemania.repository;

import com.pucgo.pokemania.domain.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findAllByTrainerIdOrderByCreatedAtDesc(Long trainerId);

    Optional<Favorite> findByTrainerIdAndPokemonId(Long trainerId, Long pokemonId);

    boolean existsByTrainerIdAndPokemonId(Long trainerId, Long pokemonId);

    long countByTrainerId(Long trainerId);

    void deleteByTrainerIdAndPokemonId(Long trainerId, Long pokemonId);
}
