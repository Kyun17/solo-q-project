package com.example.solo_q_server.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class QuestionSaveRequest {

    @NotBlank(message = "category는 필수입니다.")
    @Size(max = 20, message = "category는 20자 이하여야 합니다.")
    private String category;   // 인성 / 기술 / CS

    @NotBlank(message = "content는 필수입니다.")
    private String content;    // 질문 내용

    private String answer;     // 답변 (선택)

    @Size(max = 255, message = "tags는 255자 이하여야 합니다.")
    private String tags;       // 예: "java, cs, network"

    // ===== getter =====
    public String getCategory() {
        return category;
    }

    public String getContent() {
        return content;
    }

    public String getAnswer() {
        return answer;
    }

    public String getTags() {
        return tags;
    }
}
