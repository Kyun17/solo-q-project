package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface InterviewResultRepository extends JpaRepository<InterviewResult, Long> {

    // 사용자의 총 연습 횟수 조회
    long countByMemberId(Long memberId);

    // 이번 주(특정 기간) 연습 횟수 조회
    long countByMemberIdAndCreatedAtBetween(Long memberId, LocalDateTime start, LocalDateTime end);
}