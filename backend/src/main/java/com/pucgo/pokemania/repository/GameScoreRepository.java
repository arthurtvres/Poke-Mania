package com.pucgo.pokemania.repository;

import com.pucgo.pokemania.domain.model.GameScore;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameScoreRepository extends JpaRepository<GameScore, Long> {

    List<GameScore> findAllByTrainerIdOrderByPlayedAtDesc(Long trainerId);

    @Query("SELECT MAX(g.score) FROM GameScore g WHERE g.trainer.id = :trainerId")
    Optional<Integer> findBestScore(@Param("trainerId") Long trainerId);

    @Query("SELECT AVG(g.score) FROM GameScore g WHERE g.trainer.id = :trainerId")
    Optional<Double> findAverageScore(@Param("trainerId") Long trainerId);

    @Query("""
            SELECT g FROM GameScore g
            JOIN FETCH g.trainer
            ORDER BY g.score DESC, g.playedAt ASC
            """)
    List<GameScore> findTopRanking(Pageable pageable);
}
