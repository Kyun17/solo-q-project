package com.example.solo_q_server.dto.comment;

import com.example.solo_q_server.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 댓글 응답 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {

    private Long commentId;
    private String content;
    private Long writerId;
    private LocalDateTime createdAt;

    // Comment Entity -> 상세 응답 DTO
    public static CommentResponse from(Comment comment) {
        return CommentResponse.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .writerId(comment.getMember().getMemberId())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}

