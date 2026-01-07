package com.example.solo_q_server.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String token;      // JWT 토큰
    private Long memberId;     // 사용자 PK
    private String nickname;   // 사용자 닉네임
}