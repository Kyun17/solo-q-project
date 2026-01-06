package com.example.solo_q_server.dto.interview;

import com.example.solo_q_server.domain.Question;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InterviewQuestionResponse {
    private Long questionId;
    private String category;
    private String content;

    // Entity -> DTO 변환 메서드
    public static InterviewQuestionResponse from(Question question) {
        return InterviewQuestionResponse.builder()
                .questionId(question.getQuestionId())
                .category(question.getCategory())
                .content(question.getContent())
                .build();
    }
}