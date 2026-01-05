package com.example.solo_q_server.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;

    public LoginResponse(String accessToken) { this.accessToken = accessToken; }
}

