package com.pucgo.pokemania.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "game_score")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trainer_id", nullable = false)
    private Trainer trainer;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "played_at", nullable = false, updatable = false)
    private OffsetDateTime playedAt;

    @PrePersist
    void onCreate() {
        if (playedAt == null) {
            playedAt = OffsetDateTime.now();
        }
    }
}
