package com.pucgo.pokemania.controller;

import com.pucgo.pokemania.dto.response.ApiResponse;
import com.pucgo.pokemania.dto.response.DashboardResponse;
import com.pucgo.pokemania.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/trainers/{trainerId}/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Métricas agregadas por treinador.")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Retorna contadores e métricas para o dashboard do treinador.")
    public ResponseEntity<ApiResponse<DashboardResponse>> get(@PathVariable Long trainerId) {
        return ResponseEntity.ok(ApiResponse.ok(dashboardService.buildFor(trainerId)));
    }
}
