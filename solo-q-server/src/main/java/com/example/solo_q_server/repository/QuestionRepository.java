package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long> {

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
}
