package com.example.solo_q_server.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberInfoResponse {
    private Long id;
    private String email;
    private String nickname;
    private String role;
    private int level;
}