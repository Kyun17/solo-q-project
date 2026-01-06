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
        // 인터셉터에서 검증 후 넣어준 memberId 꺼내기
        // Long memberId = (Long) request.getAttribute("memberId");

        Long memberId = 1L;

        // 개발 중 로그인 없이 테스트할 때를 위한 안전장치 (나중엔 삭제 가능)
        if (memberId == null) memberId = 1L;

        DashboardResponse response = dashboardService.getDashboardData(memberId);
        return ResponseEntity.ok(response);
    }
}