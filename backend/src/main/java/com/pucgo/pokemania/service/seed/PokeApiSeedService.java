package com.pucgo.pokemania.service.seed;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pucgo.pokemania.domain.model.Pokemon;
import com.pucgo.pokemania.repository.PokemonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Popula a tabela {@code pokemon} na primeira subida da aplicação.
 *
 * <p>Estratégia: tenta primeiro carregar o JSON pré-baixado em
 * {@code classpath:db/seed/pokemon_seed.json} (rápido e offline).
 * Se o arquivo não existir, faz fallback para a PokéAPI pública.</p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PokeApiSeedService {

    private static final String POKEAPI_LIST_URL =
            "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";

    private final PokemonRepository pokemonRepository;
    private final ResourceLoader resourceLoader;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${pokemania.seed.source:classpath:db/seed/pokemon_seed.json}")
    private String seedSource;

    @Transactional
    public void seedIfEmpty() {
        long existing = pokemonRepository.count();
        if (existing > 0) {
            log.info("Catálogo de pokémons já populado ({} registros). Pulando seed.", existing);
            return;
        }

        log.info("Catálogo vazio — iniciando seed do catálogo de pokémons.");

        List<Pokemon> pokemons = loadFromLocalSeed();
        if (pokemons.isEmpty()) {
            log.info("Seed local indisponível. Buscando da PokéAPI (pode levar alguns minutos)...");
            pokemons = loadFromPokeApi();
        }

        if (pokemons.isEmpty()) {
            log.warn("Nenhum pokémon foi carregado.");
            return;
        }

        pokemonRepository.saveAll(pokemons);
        log.info("Seed concluído: {} pokémons inseridos.", pokemons.size());
    }

    private List<Pokemon> loadFromLocalSeed() {
        try {
            Resource resource = resourceLoader.getResource(seedSource);
            if (!resource.exists()) {
                log.debug("Arquivo de seed não encontrado em {}", seedSource);
                return List.of();
            }
            try (InputStream in = resource.getInputStream()) {
                JsonNode root = objectMapper.readTree(in);
                List<Pokemon> result = new ArrayList<>();
                for (JsonNode node : root) {
                    result.add(toEntity(node));
                }
                log.info("Seed local carregado ({} registros).", result.size());
                return result;
            }
        } catch (Exception ex) {
            log.warn("Falha ao ler seed local: {}", ex.getMessage());
            return List.of();
        }
    }

    private List<Pokemon> loadFromPokeApi() {
        try {
            RestClient client = RestClient.create();
            JsonNode list = client.get().uri(POKEAPI_LIST_URL)
                    .retrieve().body(JsonNode.class);
            if (list == null || !list.has("results")) {
                return List.of();
            }
            List<Pokemon> result = new ArrayList<>();
            for (JsonNode item : list.get("results")) {
                String url = item.get("url").asText();
                try {
                    JsonNode detail = client.get().uri(url).retrieve().body(JsonNode.class);
                    if (detail != null) {
                        result.add(toEntity(detail));
                    }
                } catch (Exception itemEx) {
                    log.debug("Falha ao buscar {}: {}", url, itemEx.getMessage());
                }
            }
            return result;
        } catch (Exception ex) {
            log.error("Erro ao buscar pokémons da PokéAPI: {}", ex.getMessage());
            return List.of();
        }
    }

    private Pokemon toEntity(JsonNode node) {
        long id = node.get("id").asLong();
        String name = node.get("name").asText();

        String image = null;
        JsonNode sprites = node.get("sprites");
        if (sprites != null && sprites.hasNonNull("front_default")) {
            image = sprites.get("front_default").asText();
        }
        if (image == null || image.isBlank()) {
            image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        }

        Set<String> types = new HashSet<>();
        JsonNode typesNode = node.get("types");
        if (typesNode != null && typesNode.isArray()) {
            for (JsonNode t : typesNode) {
                JsonNode typeObj = t.get("type");
                if (typeObj != null && typeObj.hasNonNull("name")) {
                    types.add(typeObj.get("name").asText());
                }
            }
        }

        return Pokemon.builder()
                .id(id)
                .name(name)
                .imageUrl(image)
                .types(types)
                .build();
    }
}
