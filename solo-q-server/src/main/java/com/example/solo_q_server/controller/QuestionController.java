package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.question.QuestionDetailResponse;
import com.example.solo_q_server.dto.question.QuestionSaveRequest;
import com.example.solo_q_server.dto.question.QuestionUpdateRequest;
import com.example.solo_q_server.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // GET /api/questions?category=인성&q=키워드&tag=java&page=0&size=10
    @GetMapping
    public QuestionService.QuestionPageResult list(
            HttpServletRequest request,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, name = "q") String keyword,
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Long memberId = (Long) request.getAttribute("memberId");
        return questionService.listMy(memberId, category, keyword, tag, page, size);
    }

    @PostMapping
    public QuestionDetailResponse create(
            HttpServletRequest request,
            @Valid @RequestBody QuestionSaveRequest req
    ) {
        Long memberId = (Long) request.getAttribute("memberId");
        return questionService.create(memberId, req);
    }

    @GetMapping("/{questionId}")
    public QuestionDetailResponse getOne(HttpServletRequest request, @PathVariable Long questionId) {
        Long memberId = (Long) request.getAttribute("memberId");
        return questionService.getMyOne(memberId, questionId);
    }

    @PutMapping("/{questionId}")
    public QuestionDetailResponse update(
            HttpServletRequest request,
            @PathVariable Long questionId,
            @Valid @RequestBody QuestionUpdateRequest req
    ) {
        Long memberId = (Long) request.getAttribute("memberId");
        return questionService.update(memberId, questionId, req);
    }

    @DeleteMapping("/{questionId}")
    public void delete(HttpServletRequest request, @PathVariable Long questionId) {
        Long memberId = (Long) request.getAttribute("memberId");
        questionService.delete(memberId, questionId);
    }
}
