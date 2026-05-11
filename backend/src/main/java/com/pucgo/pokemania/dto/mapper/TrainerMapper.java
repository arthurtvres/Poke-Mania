package com.pucgo.pokemania.dto.mapper;

import com.pucgo.pokemania.domain.model.Trainer;
import com.pucgo.pokemania.dto.response.TrainerResponse;
import org.springframework.stereotype.Component;

@Component
public class TrainerMapper {

    public TrainerResponse toResponse(Trainer trainer) {
        return new TrainerResponse(
                trainer.getId(),
                trainer.getNickname(),
                trainer.getAvatarUrl(),
                trainer.getCreatedAt(),
                trainer.getTeams() == null ? 0 : trainer.getTeams().size(),
                trainer.getFavorites() == null ? 0 : trainer.getFavorites().size()
        );
    }
}
