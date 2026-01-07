package com.example.solo_q_server.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    // 회원 1 : 게시글 N
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 게시판 타입 (FEEDBACK / STUDY / FREE)
    @Enumerated(EnumType.STRING)
    @Column(name = "board_type", nullable = false, length = 20)
    private BoardType boardType;

    // 제목, 필수값
    @Column(name = "title", nullable = false, length = 200)
    private String title;

    // 본문, 필수값 (TEXT)
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    // 조회수
    @Column(name = "view_count", nullable = false)
    private Integer viewCount;

    // 작성일 (insert 시 자동 세팅)
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 수정일 (update 시 자동 갱신)
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // insert 전 조회수 기본값 설정
    @PrePersist
    public void prePersist() {
        if (viewCount == null) viewCount = 0;
    }

    // 조회수 증가 메서드
    public void increaseViewCount() {
        this.viewCount++;
    }

    // 수정 메서드
    public void update(BoardType boardType, String title, String content) {
        this.boardType = boardType;
        this.title = title;
        this.content = content;
    }
}
