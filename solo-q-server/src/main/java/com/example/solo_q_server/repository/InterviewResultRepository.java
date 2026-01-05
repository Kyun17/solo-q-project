package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface InterviewResultRepository extends JpaRepository<InterviewResult, Long> {

    // member.memberId 필드를 명확하게 지정하여 count 수행
    @Query("SELECT COUNT(i) FROM InterviewResult i WHERE i.member.memberId = :memberId")
    long countByMemberId(@Param("memberId") Long memberId);

    // 기간 조회 쿼리에서도 member.memberId를 명시적으로 지정
    @Query("SELECT COUNT(i) FROM InterviewResult i WHERE i.member.memberId = :memberId AND i.createdAt BETWEEN :start AND :end")
    long countByMemberIdAndCreatedAtBetween(
            @Param("memberId") Long memberId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}