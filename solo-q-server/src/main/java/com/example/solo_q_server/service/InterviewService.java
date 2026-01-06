package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.InterviewResult;
import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.dto.interview.InterviewResultResponse;
import com.example.solo_q_server.dto.interview.InterviewSaveRequest;
import com.example.solo_q_server.repository.InterviewResultRepository;
import com.example.solo_q_server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterviewService {

    private final InterviewResultRepository interviewResultRepository;
    private final MemberRepository memberRepository;

    /**
     * 면접 결과 저장
     */
    @Transactional
    public Long saveResult(Long memberId, InterviewSaveRequest request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        InterviewResult result = InterviewResult.builder()
                .member(member)
                .totalSeconds(request.getTotalSeconds())
                .questionCount(request.getQuestionCount())
                .build();

        return interviewResultRepository.save(result).getResultId();
    }

    /**
     * 내 면접 기록 목록 조회
     */
    public List<InterviewResultResponse> getMyHistory(Long memberId) {
        return interviewResultRepository.findAllByMember_MemberIdOrderByCreatedAtDesc(memberId)
                .stream()
                .map(InterviewResultResponse::from)
                .collect(Collectors.toList());
    }
}