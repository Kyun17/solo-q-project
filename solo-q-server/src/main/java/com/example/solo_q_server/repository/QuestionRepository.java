package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Oracle DB에서 랜덤으로 1개의 질문 가져오기
    @Query(value = "SELECT * FROM (SELECT * FROM question ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1", nativeQuery = true)
    Optional<Question> findRandomQuestion();

    // ✅ 추가: 특정 멤버의 질문 개수 조회
    long countByMember_MemberId(Long memberId);
}