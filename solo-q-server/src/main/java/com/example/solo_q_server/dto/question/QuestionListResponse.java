package com.example.solo_q_server.dto.question;

import java.time.LocalDateTime;

public class QuestionListResponse {

    private final Long questionId;
    private final String category;
    private final String content;
    private final String answer;
    private final String tags;
    private final LocalDateTime createdAt; // ✅ 등록일 추가

    public QuestionListResponse(Long questionId, String category, String content, String answer, String tags, LocalDateTime createdAt) {
        this.questionId = questionId;
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
        this.createdAt = createdAt; // ✅ 생성일 초기화
    }

    public Long getQuestionId() { return questionId; }
    public String getCategory() { return category; }
    public String getContent() { return content; }
    public String getAnswer() { return answer; }
    public String getTags() { return tags; }
    public LocalDateTime getCreatedAt() { return createdAt; } // ✅ getter 추가
}
