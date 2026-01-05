package com.example.solo_q_server.dto.member;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class MemberUpdateRequest {
    @NotBlank(message = "닉네임을 입력해주세요")
    private String nickname;
}