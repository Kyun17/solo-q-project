package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.domain.Question;
import com.example.solo_q_server.dto.dashboard.DashboardResponse;
import com.example.solo_q_server.repository.InterviewResultRepository;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final MemberRepository memberRepository;
    private final InterviewResultRepository interviewResultRepository;
    private final QuestionRepository questionRepository;

    public DashboardResponse getDashboardData(Long memberId) {

        // 오늘의 0시 0분 구하기
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();

        // 1. 회원 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 오늘 연습 횟수
        long todayCount = interviewResultRepository.countTodayPractice(memberId,startOfDay  );

        // 2. 총 연습 횟수 조회
        long totalCount = interviewResultRepository.countByMemberId(memberId);

        // 3. 레벨 및 경험치 계산 로직 (5판마다 레벨업)
        // 예: 12판 했으면 -> 레벨 3, 경험치 2/5 (12 % 5)
        long levelUpUnit = 5;
        long currentExp = totalCount % levelUpUnit;

        // (선택사항) DB의 레벨과 계산된 레벨이 다르면 업데이트하는 로직을 추가할 수 있습니다.
        // 현재는 DB에 저장된 level 값을 그대로 사용합니다.

        // 4. 오늘의 추천 질문 (랜덤) 조회
        Question randomQ = questionRepository.findRandomQuestion(memberId).orElse(null);

        // ✅ 추가: 내 질문 개수 조회
        long myQuestionCount = questionRepository.countByMember_MemberId(memberId);

        DashboardResponse.TodayQuestionDto questionDto = null;
        if (randomQ != null) {
            questionDto = DashboardResponse.TodayQuestionDto.builder()
                    .id(randomQ.getQuestionId())
                    .category(randomQ.getCategory())
                    .content(randomQ.getContent())
                    // 태그가 존재하면 콤마(,)로 분리하여 배열로 변환, 없으면 빈 배열
                    .tags(randomQ.getTags() != null ? randomQ.getTags().split(",") : new String[]{})
                    .build();
        }

        // 5. 응답 생성
        return DashboardResponse.builder()
                .nickname(member.getNickname())
                .level(member.getLevel())
                .todayPractice(todayCount)
                .totalPractice(totalCount)
                .currentExp(currentExp)   // 현재 경험치 (예: 2)
                .maxExp(levelUpUnit)      // 목표 경험치 (예: 5)
                .todayQuestion(questionDto)
                .questionCount(myQuestionCount)
                .build();
    }
}