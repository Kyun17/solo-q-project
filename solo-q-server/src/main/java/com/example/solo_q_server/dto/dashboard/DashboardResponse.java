package com.example.solo_q_server.dto.dashboard;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardResponse {
    private String nickname;
    private Integer level;
    private Long totalPractice;
    // weekly 삭제 -> exp 관련 필드 추가
    private Long currentExp; // 현재 경험치 (예: 2)
    private Long maxExp;     // 다음 레벨업 조건 (예: 5)
    private TodayQuestionDto todayQuestion;
    private Long questionCount; // ✅ 추가: 나의 질문 노트 개수

    @Getter
    @Builder
    public static class TodayQuestionDto {
        private Long id;
        private String category;
        private String content;
        private String[] tags;
    }
}