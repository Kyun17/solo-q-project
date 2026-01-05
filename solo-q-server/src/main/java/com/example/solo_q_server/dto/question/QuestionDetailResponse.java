package com.example.solo_q_server.dto.question;

public class QuestionDetailResponse {

    private final Long questionId;
    private final String category;
    private final String content;
    private final String answer;
    private final String tags;

    public QuestionDetailResponse(Long questionId, String category, String content, String answer, String tags) {
        this.questionId = questionId;
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
    }

    public Long getQuestionId() { return questionId; }
    public String getCategory() { return category; }
    public String getContent() { return content; }
    public String getAnswer() { return answer; }
    public String getTags() { return tags; }
}
