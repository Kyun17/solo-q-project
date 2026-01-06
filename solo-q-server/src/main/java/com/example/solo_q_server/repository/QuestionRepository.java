package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // ✅ 내 질문 목록 검색(카테고리/키워드/태그)
    @Query("""
        select q
        from Question q
        where q.member.memberId = :memberId
          and (:category is null or :category = '' or q.category = :category)
          and (:keyword is null or :keyword = ''
                or lower(q.content) like lower(concat('%', :keyword, '%'))
                or lower(coalesce(q.answer, '')) like lower(concat('%', :keyword, '%'))
              )
          and (:tag is null or :tag = ''
                or lower(coalesce(q.tags, '')) like lower(concat('%', :tag, '%'))
              )
        order by q.questionId desc
    """)
    Page<Question> searchMyQuestions(
            @Param("memberId") Long memberId,
            @Param("category") String category,
            @Param("keyword") String keyword,
            @Param("tag") String tag,
            Pageable pageable
    );

    // ✅ Oracle DB에서 랜덤 질문 1개 가져오기 (nativeQuery)
    // ⚠️ 테이블명이 실제로 QUESTION이면 아래처럼 대문자로 두는 게 안전
    @Query(value = "SELECT * FROM (SELECT * FROM QUESTION ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1", nativeQuery = true)
    Optional<Question> findRandomQuestion();

    // ✅ 특정 멤버의 질문 개수 조회
    long countByMember_MemberId(Long memberId);
}
