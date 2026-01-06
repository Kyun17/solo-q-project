package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.dashboard.DashboardResponse;
import com.example.solo_q_server.service.DashboardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(HttpServletRequest request) {

        Long memberId = (Long) request.getAttribute("memberId");

        DashboardResponse response = dashboardService.getDashboardData(memberId);
        return ResponseEntity.ok(response);
    }
}