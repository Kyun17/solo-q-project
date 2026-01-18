package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.InterviewResult;
import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.domain.Question;
import com.example.solo_q_server.dto.interview.InterviewQuestionResponse;
import com.example.solo_q_server.dto.interview.InterviewResultResponse;
import com.example.solo_q_server.dto.interview.InterviewSaveRequest;
import com.example.solo_q_server.repository.InterviewResultRepository;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.repository.QuestionRepository;
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
    private final QuestionRepository questionRepository;

    /**
     * 모의 면접 질문지 생성 (랜덤)
     */
    public List<InterviewQuestionResponse> createInterviewQuestions(Long memberId, String category, int count) {
        List<Question> questions;

        // ✅ 수정: 카테고리가 '랜덤'이면 전체에서 조회, 아니면 해당 카테고리에서 조회
        if ("랜덤".equals(category)) {
            questions = questionRepository.findAllRandomQuestions(memberId, count);
        } else {
            questions = questionRepository.findRandomQuestionsByCategory(memberId, category, count);
        }

        return questions.stream()
                .map(InterviewQuestionResponse::from)
                .collect(Collectors.toList());
    }

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

    /**
     * [추가] 특정 면접 기록 상세 조회
     */
    public InterviewResultResponse getInterviewDetail(Long resultId) {
        InterviewResult result = interviewResultRepository.findById(resultId)
                .orElseThrow(() -> new IllegalArgumentException("해당 면접 기록을 찾을 수 없습니다."));

        return InterviewResultResponse.from(result);
    }
}