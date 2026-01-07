package com.example.solo_q_server.dto.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 댓글 작성 요청 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentSaveRequest {

    @NotBlank(message = "댓글 내용을 입력해야 합니다.")
    private String content;

}
