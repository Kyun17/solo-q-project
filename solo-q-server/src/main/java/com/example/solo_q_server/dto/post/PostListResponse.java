package com.example.solo_q_server.dto.post;

import com.example.solo_q_server.domain.BoardType;
import com.example.solo_q_server.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 게시글 목록 응답 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostListResponse {

    private Long postId;
    private BoardType boardType;

    private String title;
    private String content;

    private Long writerId;

    private LocalDateTime createdAt;
    private String timeAgo;

    private Integer viewCount;
    private Integer commentCount;

    // Post entity -> 리스트 DTO
    public static PostListResponse from(Post post, int commentCount, String timeAgo) {
        return PostListResponse.builder()
                .postId(post.getId())
                .boardType(post.getBoardType())
                .title(post.getTitle())
                .content(post.getContent())
                .writerId(post.getMember().getMemberId())
                .viewCount(post.getViewCount())
                .commentCount(commentCount)
                .createdAt(post.getCreatedAt())
                .timeAgo(timeAgo)
                .build();
    }

}

