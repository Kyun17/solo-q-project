package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.interview.InterviewQuestionResponse;
import com.example.solo_q_server.dto.interview.InterviewResultResponse;
import com.example.solo_q_server.dto.interview.InterviewSaveRequest;
import com.example.solo_q_server.service.InterviewService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    // ✅ [추가] 면접 질문지 생성 API
    // 요청 예시: GET /api/interview/questions?category=기술&count=5
    @GetMapping("/questions")
    public ResponseEntity<List<InterviewQuestionResponse>> getInterviewQuestions(
            HttpServletRequest httpRequest,
            @RequestParam String category,
            @RequestParam(defaultValue = "5") int count
    ) {
        Long memberId = (Long) httpRequest.getAttribute("memberId");
        List<InterviewQuestionResponse> questions = interviewService.createInterviewQuestions(memberId,category, count);
        return ResponseEntity.ok(questions);
    }

    // 1. 면접 결과 저장 (POST /api/interview/result)
    @PostMapping("/result")
    public ResponseEntity<String> saveResult(@RequestBody InterviewSaveRequest request, HttpServletRequest httpRequest) {
        Long memberId = (Long) httpRequest.getAttribute("memberId");
        interviewService.saveResult(memberId, request);
        return ResponseEntity.ok("면접 결과가 저장되었습니다.");
    }

    // 2. 내 면접 기록 조회 (GET /api/interview/history)
    @GetMapping("/history")
    public ResponseEntity<List<InterviewResultResponse>> getMyHistory(HttpServletRequest httpRequest) {
        Long memberId = (Long) httpRequest.getAttribute("memberId");
        List<InterviewResultResponse> history = interviewService.getMyHistory(memberId);
        return ResponseEntity.ok(history);
    }

    // ✅ [추가] 특정 면접 기록 상세 조회 (GET /api/interview/result/{id})
    @GetMapping("/result/{id}")
    public ResponseEntity<InterviewResultResponse> getInterviewDetail(@PathVariable Long id) {
        InterviewResultResponse response = interviewService.getInterviewDetail(id);
        return ResponseEntity.ok(response);
    }
}