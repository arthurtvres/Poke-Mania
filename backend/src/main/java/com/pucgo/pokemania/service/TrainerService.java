package com.pucgo.pokemania.service;

import com.pucgo.pokemania.domain.exception.DuplicateResourceException;
import com.pucgo.pokemania.domain.exception.ResourceNotFoundException;
import com.pucgo.pokemania.domain.model.Trainer;
import com.pucgo.pokemania.dto.request.TrainerRequest;
import com.pucgo.pokemania.dto.response.TrainerResponse;
import com.pucgo.pokemania.dto.mapper.TrainerMapper;
import com.pucgo.pokemania.repository.TrainerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrainerService {

    private final TrainerRepository trainerRepository;
    private final TrainerMapper trainerMapper;

    @Transactional(readOnly = true)
    public Page<TrainerResponse> findAll(Pageable pageable) {
        return trainerRepository.findAll(pageable).map(trainerMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public TrainerResponse findById(Long id) {
        return trainerMapper.toResponse(getEntity(id));
    }

    @Transactional
    public TrainerResponse create(TrainerRequest request) {
        if (trainerRepository.existsByNicknameIgnoreCase(request.nickname())) {
            throw new DuplicateResourceException(
                    "Já existe um treinador com o apelido '%s'.".formatted(request.nickname()));
        }
        Trainer trainer = Trainer.builder()
                .nickname(request.nickname().trim())
                .avatarUrl(request.avatarUrl())
                .build();
        trainer = trainerRepository.save(trainer);
        log.info("Trainer criado: id={} nickname={}", trainer.getId(), trainer.getNickname());
        return trainerMapper.toResponse(trainer);
    }

    @Transactional
    public TrainerResponse update(Long id, TrainerRequest request) {
        Trainer trainer = getEntity(id);
        if (!trainer.getNickname().equalsIgnoreCase(request.nickname())
                && trainerRepository.existsByNicknameIgnoreCase(request.nickname())) {
            throw new DuplicateResourceException(
                    "Já existe um treinador com o apelido '%s'.".formatted(request.nickname()));
        }
        trainer.setNickname(request.nickname().trim());
        trainer.setAvatarUrl(request.avatarUrl());
        return trainerMapper.toResponse(trainer);
    }

    @Transactional
    public void delete(Long id) {
        Trainer trainer = getEntity(id);
        trainerRepository.delete(trainer);
        log.info("Trainer removido: id={}", id);
    }

    public Trainer getEntity(Long id) {
        return trainerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Treinador", id));
    }
}
