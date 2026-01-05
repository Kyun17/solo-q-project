package com.example.solo_q_server.dto.question;

public class QuestionListResponse {

    private final Long questionId;
    private final String category;
    private final String content;
    private final String tags;

    public QuestionListResponse(Long questionId, String category, String content, String tags) {
        this.questionId = questionId;
        this.category = category;
        this.content = content;
        this.tags = tags;
    }

    public Long getQuestionId() { return questionId; }
    public String getCategory() { return category; }
    public String getContent() { return content; }
    public String getTags() { return tags; }
}
