package com.pucgo.pokemania.repository;

import com.pucgo.pokemania.domain.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findAllByTrainerIdOrderByCreatedAtAsc(Long trainerId);

    long countByTrainerId(Long trainerId);
}
