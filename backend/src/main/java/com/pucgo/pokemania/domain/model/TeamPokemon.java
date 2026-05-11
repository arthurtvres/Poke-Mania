package com.pucgo.pokemania.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "team_pokemon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamPokemon {

    @EmbeddedId
    private TeamPokemonId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("teamId")
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @MapsId("pokemonId")
    @JoinColumn(name = "pokemon_id")
    private Pokemon pokemon;

    @Column(name = "slot", nullable = false)
    private Short slot;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TeamPokemonId implements Serializable {

        @Column(name = "team_id")
        private Long teamId;

        @Column(name = "pokemon_id")
        private Long pokemonId;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof TeamPokemonId that)) return false;
            return Objects.equals(teamId, that.teamId) && Objects.equals(pokemonId, that.pokemonId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(teamId, pokemonId);
        }
    }
}
