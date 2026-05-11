package com.pucgo.pokemania.service;

import com.pucgo.pokemania.domain.exception.BusinessRuleException;
import com.pucgo.pokemania.domain.model.GameScore;
import com.pucgo.pokemania.domain.model.Trainer;
import com.pucgo.pokemania.dto.mapper.GameScoreMapper;
import com.pucgo.pokemania.dto.request.GameScoreRequest;
import com.pucgo.pokemania.dto.response.GameScoreResponse;
import com.pucgo.pokemania.repository.GameScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameScoreService {

    private final GameScoreRepository repository;
    private final TrainerService trainerService;
    private final GameScoreMapper mapper;

    @Transactional(readOnly = true)
    public List<GameScoreResponse> findByTrainer(Long trainerId) {
        trainerService.getEntity(trainerId);
        return repository.findAllByTrainerIdOrderByPlayedAtDesc(trainerId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public GameScoreResponse register(Long trainerId, GameScoreRequest request) {
        if (request.score() > request.totalQuestions()) {
            throw new BusinessRuleException(
                    "Pontuação não pode ser maior que o total de perguntas.");
        }
        Trainer trainer = trainerService.getEntity(trainerId);
        GameScore score = GameScore.builder()
                .trainer(trainer)
                .score(request.score())
                .totalQuestions(request.totalQuestions())
                .build();
        score = repository.save(score);
        log.info("Score salvo: trainerId={} score={}/{}", trainerId, score.getScore(), score.getTotalQuestions());
        return mapper.toResponse(score);
    }

    @Transactional(readOnly = true)
    public List<GameScoreResponse> ranking(int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 100));
        return repository.findTopRanking(PageRequest.of(0, safeLimit)).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public Optional<Integer> bestScore(Long trainerId) {
        return repository.findBestScore(trainerId);
    }

    public Optional<Double> averageScore(Long trainerId) {
        return repository.findAverageScore(trainerId);
    }

    public long countByTrainer(Long trainerId) {
        return repository.findAllByTrainerIdOrderByPlayedAtDesc(trainerId).size();
    }
}
