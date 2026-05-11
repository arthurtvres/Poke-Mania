package com.pucgo.pokemania.dto.mapper;

import com.pucgo.pokemania.domain.model.GameScore;
import com.pucgo.pokemania.dto.response.GameScoreResponse;
import org.springframework.stereotype.Component;

@Component
public class GameScoreMapper {

    public GameScoreResponse toResponse(GameScore score) {
        double accuracy = score.getTotalQuestions() == 0
                ? 0.0
                : (double) score.getScore() / score.getTotalQuestions();
        return new GameScoreResponse(
                score.getId(),
                score.getTrainer().getId(),
                score.getTrainer().getNickname(),
                score.getScore(),
                score.getTotalQuestions(),
                Math.round(accuracy * 10000.0) / 10000.0,
                score.getPlayedAt()
        );
    }
}
