package com.pucgo.pokemania.config;

import com.pucgo.pokemania.service.seed.PokeApiSeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeederRunner implements CommandLineRunner {

    private final PokeApiSeedService seedService;

    @Value("${pokemania.seed.enabled:true}")
    private boolean enabled;

    @Override
    public void run(String... args) {
        if (!enabled) {
            log.info("Seed desativado (pokemania.seed.enabled=false).");
            return;
        }
        seedService.seedIfEmpty();
    }
}
