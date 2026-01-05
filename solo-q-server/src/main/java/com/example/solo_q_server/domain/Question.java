package com.example.solo_q_server.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(name = "fk_question_member"))
    private Member member;

    @Column(nullable = false, length = 20)
    private String category; // 인성/기술/CS

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column(length = 255)
    private String tags; // "java,sql,cs" 등

    protected Question() {}

    public Question(Member member, String category, String content, String answer, String tags) {
        this.member = member;
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
    }

    public Long getQuestionId() { return questionId; }
    public Member getMember() { return member; }
    public String getCategory() { return category; }
    public String getContent() { return content; }
    public String getAnswer() { return answer; }
    public String getTags() { return tags; }

    public void update(String category, String content, String answer, String tags) {
        this.category = category;
        this.content = content;
        this.answer = answer;
        this.tags = tags;
    }
}
