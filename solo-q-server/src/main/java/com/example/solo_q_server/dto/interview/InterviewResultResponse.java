package com.example.solo_q_server.dto.interview;

import com.example.solo_q_server.domain.InterviewResult;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class InterviewResultResponse {
    private Long resultId;
    private Integer totalSeconds;
    private Integer questionCount;
    private String date; // "2025-01-06" 형태로 포맷팅

    // 엔티티 -> DTO 변환 편의 메서드
    public static InterviewResultResponse from(InterviewResult entity) {
        return InterviewResultResponse.builder()
                .resultId(entity.getResultId())
                .totalSeconds(entity.getTotalSeconds())
                .questionCount(entity.getQuestionCount())
                .date(entity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }
}