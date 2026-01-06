package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Oracle DB에서 랜덤으로 1개의 질문 가져오기
    @Query(value = "SELECT * FROM (SELECT * FROM question ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1", nativeQuery = true)
    Optional<Question> findRandomQuestion();

    // ✅ 추가: 특정 멤버의 질문 개수 조회
    long countByMember_MemberId(Long memberId);

    // ✅ 3. [추가] 실전 면접용: 특정 카테고리의 질문을 랜덤으로 N개 조회
    @Query(value = "SELECT * FROM (SELECT * FROM QUESTION WHERE category = :category ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(@Param("category") String category, @Param("limit") int limit);

    // ✅ 4. [추가] 카테고리 상관없이 전체 랜덤 질문 (limit 개수만큼)
    @Query(value = "SELECT * FROM (SELECT * FROM QUESTION ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= :limit", nativeQuery = true)
    List<Question> findAllRandomQuestions(@Param("limit") int limit);
}