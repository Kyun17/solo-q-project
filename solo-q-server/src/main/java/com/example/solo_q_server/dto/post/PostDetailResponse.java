package com.example.solo_q_server.dto.post;

import com.example.solo_q_server.domain.BoardType;
import com.example.solo_q_server.domain.Post;
import com.example.solo_q_server.dto.comment.CommentResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

// 게시글 상세 응답 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDetailResponse {

    private Long postId;
    private BoardType boardType;

    private String title;
    private String content;

    private Long writerId;

    private LocalDateTime createdAt;
    private String timeAgo;

    private Integer viewCount;
    private Integer commentCount;

    private List<CommentResponse> comments;

    // Post Entity -> 상세 응답 DTO
    public static PostDetailResponse from(
            Post post,
            int commentCount,
            String timeAgo
    ) {
        return PostDetailResponse.builder()
                .postId(post.getId())
                .boardType(post.getBoardType())
                .title(post.getTitle())
                .content(post.getContent())
                .writerId(post.getMember().getMemberId())
                .viewCount(post.getViewCount())
                .commentCount(commentCount)
                .createdAt(post.getCreatedAt())
                .timeAgo(timeAgo)
                .comments(List.of()) // 댓글 목록은 비워서 내려줌
                .build();
    }

}
