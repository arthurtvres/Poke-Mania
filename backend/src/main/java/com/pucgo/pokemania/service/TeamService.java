package com.pucgo.pokemania.service;

import com.pucgo.pokemania.domain.exception.BusinessRuleException;
import com.pucgo.pokemania.domain.exception.ResourceNotFoundException;
import com.pucgo.pokemania.domain.model.Pokemon;
import com.pucgo.pokemania.domain.model.Team;
import com.pucgo.pokemania.domain.model.TeamPokemon;
import com.pucgo.pokemania.domain.model.Trainer;
import com.pucgo.pokemania.dto.mapper.TeamMapper;
import com.pucgo.pokemania.dto.request.TeamRequest;
import com.pucgo.pokemania.dto.response.TeamResponse;
import com.pucgo.pokemania.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;
    private final TrainerService trainerService;
    private final PokemonService pokemonService;
    private final TeamMapper teamMapper;

    @Transactional(readOnly = true)
    public List<TeamResponse> findAllByTrainer(Long trainerId) {
        // valida que o trainer existe — devolve 404 caso contrário
        trainerService.getEntity(trainerId);
        return teamRepository.findAllByTrainerIdOrderByCreatedAtAsc(trainerId).stream()
                .map(teamMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TeamResponse findById(Long id) {
        return teamMapper.toResponse(getEntity(id));
    }

    @Transactional
    public TeamResponse create(Long trainerId, TeamRequest request) {
        Trainer trainer = trainerService.getEntity(trainerId);
        Team team = Team.builder()
                .name(request.name().trim())
                .trainer(trainer)
                .build();
        team = teamRepository.save(team);
        log.info("Time criado: id={} trainerId={} name='{}'", team.getId(), trainerId, team.getName());
        return teamMapper.toResponse(team);
    }

    @Transactional
    public TeamResponse rename(Long id, TeamRequest request) {
        Team team = getEntity(id);
        team.setName(request.name().trim());
        return teamMapper.toResponse(team);
    }

    @Transactional
    public void delete(Long id) {
        Team team = getEntity(id);
        teamRepository.delete(team);
        log.info("Time removido: id={}", id);
    }

    @Transactional
    public TeamResponse addPokemon(Long teamId, Long pokemonId) {
        Team team = getEntity(teamId);

        if (team.getRoster().size() >= Team.MAX_POKEMONS) {
            throw new BusinessRuleException(
                    "O time já possui o máximo de " + Team.MAX_POKEMONS + " pokémons.");
        }

        boolean alreadyIn = team.getRoster().stream()
                .anyMatch(tp -> tp.getPokemon().getId().equals(pokemonId));
        if (alreadyIn) {
            throw new BusinessRuleException("Este pokémon já está no time.");
        }

        Pokemon pokemon = pokemonService.getEntity(pokemonId);
        short slot = nextAvailableSlot(team);

        TeamPokemon entry = TeamPokemon.builder()
                .id(new TeamPokemon.TeamPokemonId(team.getId(), pokemon.getId()))
                .team(team)
                .pokemon(pokemon)
                .slot(slot)
                .build();
        team.getRoster().add(entry);

        return teamMapper.toResponse(team);
    }

    @Transactional
    public TeamResponse removePokemon(Long teamId, Long pokemonId) {
        Team team = getEntity(teamId);
        boolean removed = team.getRoster().removeIf(tp -> tp.getPokemon().getId().equals(pokemonId));
        if (!removed) {
            throw new ResourceNotFoundException(
                    "Pokémon de id %s não está no time %s.".formatted(pokemonId, teamId));
        }
        reassignSlots(team);
        return teamMapper.toResponse(team);
    }

    public Team getEntity(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Time", id));
    }

    public long countByTrainer(Long trainerId) {
        return teamRepository.countByTrainerId(trainerId);
    }

    private short nextAvailableSlot(Team team) {
        Set<Short> used = new HashSet<>();
        team.getRoster().forEach(tp -> used.add(tp.getSlot()));
        for (short s = 1; s <= Team.MAX_POKEMONS; s++) {
            if (!used.contains(s)) return s;
        }
        throw new BusinessRuleException("Não há slots disponíveis neste time.");
    }

    private void reassignSlots(Team team) {
        short s = 1;
        for (TeamPokemon tp : team.getRoster()) {
            tp.setSlot(s++);
        }
    }
}
