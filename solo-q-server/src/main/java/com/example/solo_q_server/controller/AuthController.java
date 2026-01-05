package com.example.solo_q_server.controller;


import com.example.solo_q_server.dto.auth.LoginRequest;
import com.example.solo_q_server.dto.auth.LoginResponse;
import com.example.solo_q_server.dto.auth.SignupRequest;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")

public class AuthController {

    private final AuthService authService;
    private final MemberRepository memberRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        SignupRequest SignupRequest;
        authService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String email) {
        boolean duplicated = memberRepository.existsByEmail(email.trim());
        return ResponseEntity.ok(Map.of("duplicated", duplicated));
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Boolean>> checkNickname(@RequestParam String nickname) {
        boolean duplicated = memberRepository.existsByNickname(nickname.trim());
        return ResponseEntity.ok(Map.of("duplicated", duplicated));
    }


    public AuthService getAuthService() {
        return authService;
    }
}

