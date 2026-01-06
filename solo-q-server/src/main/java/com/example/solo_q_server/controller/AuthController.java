package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.auth.LoginRequest;
import com.example.solo_q_server.dto.auth.LoginResponse;
import com.example.solo_q_server.dto.auth.SignupRequest;
import com.example.solo_q_server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 로그인 (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // 회원가입 (POST /api/auth/signup)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
    }
}