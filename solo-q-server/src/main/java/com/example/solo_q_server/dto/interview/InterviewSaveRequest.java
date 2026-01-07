package com.example.solo_q_server.dto.interview;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InterviewSaveRequest {
    private Integer totalSeconds;  // 총 소요 시간 (초)
    private Integer questionCount; // 연습한 질문 개수
}