package com.pucgo.pokemania.repository;

import com.pucgo.pokemania.domain.model.Pokemon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

    /**
     * Busca paginada com filtros opcionais por nome (substring case-insensitive)
     * e por tipo (match exato em qualquer um dos tipos do pokémon).
     * Passar string vazia em um filtro o ignora.
     *
     * <p><b>Importante:</b> {@code name} e {@code type} devem chegar já em lowercase
     * e nunca {@code null}. Use string vazia para "sem filtro".</p>
     *
     * <p>Por que não aceitar {@code null}: o PostgreSQL infere parâmetros null como
     * {@code bytea} (o Hibernate liga via {@code setNull(Types.OTHER)}), o que
     * quebra qualquer função/operador de texto adjacente
     * ({@code lower(bytea)}, {@code position(text, bytea)}, etc.). Usar uma
     * sentinela {@code ""} mantém o parâmetro sempre tipado como {@code varchar}.</p>
     *
     * <p>Usamos {@code LOCATE} (vira {@code position()} no PostgreSQL) em vez de
     * {@code LIKE} porque o Hibernate sempre anexa uma cláusula {@code ESCAPE}
     * ao {@code LIKE} e o caractere de escape também sofre com a inferência
     * para {@code bytea}.</p>
     */
    @Query("""
            SELECT DISTINCT p FROM Pokemon p
            LEFT JOIN p.types t
            WHERE (:name = '' OR LOCATE(:name, LOWER(p.name)) > 0)
              AND (:type = '' OR LOWER(t) = :type)
            """)
    Page<Pokemon> search(@Param("name") String name,
                         @Param("type") String type,
                         Pageable pageable);
}
