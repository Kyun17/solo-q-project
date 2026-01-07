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
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "QUESTION")
public class Question {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long questionId;

// 연관 관계 매핑 (Member N:1)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "member_id", nullable = false)
private Member member;

@Column(nullable = false)
private String category; // 기술, 인성, CS 등

<<<<<<< HEAD
    @Column(nullable = false, length = 4000)
=======
    @Column(nullable = false)
    private String category; // 기술, 인성, CS 등

    @Column(nullable = false, length = 4000) // 오라클 CLOB 타입 매핑
>>>>>>> 88024603d22475b9dd55dc4f162741ba987ebd7b
    private String content;

    @Column(length = 4000)
    private String answer;

    @Column(length = 1000)
<<<<<<< HEAD
    private String tags;
=======
    private String tags; // "Java,Spring" 처럼 콤마로 구분
>>>>>>> 88024603d22475b9dd55dc4f162741ba987ebd7b

@CreationTimestamp
private LocalDateTime createdAt;

@UpdateTimestamp
private LocalDateTime updatedAt;
    // ✅ 서비스에서 쓰는 “필수 값만 받는 생성자” 추가
    public Question(Member member, String category, String content, String answer, String tags) {
        this.member = member;
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
    }

    // ✅ 수정 로직(QuestionService에서 q.update(...) 쓰고 있으니 필요)
    public void update(String category, String content, String answer, String tags) {
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
    }
}