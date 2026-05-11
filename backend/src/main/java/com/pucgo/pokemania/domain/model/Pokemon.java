package com.pucgo.pokemania.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pokemon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pokemon {

    /** Pokédex number is the primary key — a Pokémon's identity is its number. */
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, unique = true, length = 50)
    private String name;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "pokemon_type",
            joinColumns = @JoinColumn(name = "pokemon_id")
    )
    @Column(name = "type", nullable = false, length = 20)
    @Builder.Default
    private Set<String> types = new HashSet<>();
}
