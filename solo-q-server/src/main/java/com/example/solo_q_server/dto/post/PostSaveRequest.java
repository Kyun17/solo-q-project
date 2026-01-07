package com.example.solo_q_server.dto.post;

import com.example.solo_q_server.domain.BoardType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 게시글 작성 요청 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostSaveRequest {

    @NotNull(message = "게시판 타입 필수")
    private BoardType boardType;

    @NotBlank(message = "제목 필수")
    @Size(max = 200, message = "제목은 200자 이내로 작성")
    private String title;

    @NotBlank(message = "내용 필수")
    private String content;
}

