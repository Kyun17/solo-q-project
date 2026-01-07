package com.example.solo_q_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MainController {

    // 1. 서버 헬스 체크 API (GET /api/health)
    // 프론트엔드에서 이 주소로 요청을 보내서 200 OK가 오면 연동 성공!
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "ON");
        response.put("message", "Solo-Q Server is running!");
        return ResponseEntity.ok(response);
    }

    // 2. (선택) 서비스 통계 API (GET /api/stats)
    // 나중에 "현재 100명의 유저가 면접 연습 중입니다!" 같은 문구를
    // 메인 화면에 띄우고 싶을 때 여기에 기능을 추가하면 됩니다.
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getServiceStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", 120); // 나중에는 DB에서 count(*) 해오기
        stats.put("totalInterviews", 450);
        return ResponseEntity.ok(stats);
    }
}