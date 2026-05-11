package com.pucgo.pokemania.repository;

import com.pucgo.pokemania.domain.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    Optional<Trainer> findByNicknameIgnoreCase(String nickname);

    boolean existsByNicknameIgnoreCase(String nickname);
}
