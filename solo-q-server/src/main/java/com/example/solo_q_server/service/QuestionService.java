package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.domain.Question;
import com.example.solo_q_server.dto.question.QuestionDetailResponse;
import com.example.solo_q_server.dto.question.QuestionListResponse;
import com.example.solo_q_server.dto.question.QuestionSaveRequest;
import com.example.solo_q_server.dto.question.QuestionUpdateRequest;
import com.example.solo_q_server.exception.CustomException;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository,
                           MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public QuestionDetailResponse create(Long memberId, QuestionSaveRequest req) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(404, "회원이 존재하지 않습니다."));

        Question q = new Question(
                member,
                req.getCategory(),
                req.getContent(),
                normalize(req.getAnswer()),
                normalize(req.getTags())
        );

        Question saved = questionRepository.save(q);
        return toDetail(saved);
    }

    @Transactional(readOnly = true)
    public QuestionPageResult listMy(
            Long memberId, String category, String keyword, String tag, int page, int size
    ) {
        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), 50)
        );

        Page<Question> result =
                questionRepository.searchMyQuestions(memberId, category, keyword, tag, pageable);

        List<QuestionListResponse> items = result.getContent()
                .stream()
                .map(this::toList)
                .toList();

        return new QuestionPageResult(
                items,
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages(),
                result.isLast()
        );
    }

    @Transactional(readOnly = true)
    public QuestionDetailResponse getMyOne(Long memberId, Long questionId) {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new CustomException(404, "질문이 존재하지 않습니다."));

        // ✅ getMemberId() -> getId()
        if (!q.getMember().getMemberId().equals(memberId)) {
            throw new CustomException(403, "내 질문만 조회할 수 있습니다.");
        }
        return toDetail(q);
    }

    @Transactional
    public QuestionDetailResponse update(
            Long memberId, Long questionId, QuestionUpdateRequest req
    ) {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new CustomException(404, "질문이 존재하지 않습니다."));

        // ✅ getMemberId() -> getId()
        if (!q.getMember().getMemberId().equals(memberId)) {
            throw new CustomException(403, "내 질문만 수정할 수 있습니다.");
        }

        q.update(
                req.getCategory(),
                req.getContent(),
                normalize(req.getAnswer()),
                normalize(req.getTags())
        );
        return toDetail(q);
    }

    @Transactional
    public void delete(Long memberId, Long questionId) {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new CustomException(404, "질문이 존재하지 않습니다."));

        // ✅ getMemberId() -> getId()
        if (!q.getMember().getMemberId().equals(memberId)) {
            throw new CustomException(403, "내 질문만 삭제할 수 있습니다.");
        }

        questionRepository.delete(q);
    }

    /* ================== mapper ================== */

    private QuestionListResponse toList(Question q) {
        return new QuestionListResponse(
                q.getQuestionId(),
                q.getCategory(),
                q.getContent(),
                q.getAnswer(),
                q.getTags()
        );
    }

    private QuestionDetailResponse toDetail(Question q) {
        return new QuestionDetailResponse(
                q.getQuestionId(),
                q.getCategory(),
                q.getContent(),
                q.getAnswer(),
                q.getTags()
        );
    }

    private String normalize(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }

    /* ================== page dto ================== */
    public static class QuestionPageResult {
        private final List<QuestionListResponse> items;
        private final int page;
        private final int size;
        private final long totalElements;
        private final int totalPages;
        private final boolean last;

        public QuestionPageResult(
                List<QuestionListResponse> items,
                int page,
                int size,
                long totalElements,
                int totalPages,
                boolean last
        ) {
            this.items = items;
            this.page = page;
            this.size = size;
            this.totalElements = totalElements;
            this.totalPages = totalPages;
            this.last = last;
        }

        public List<QuestionListResponse> getItems() { return items; }
        public int getPage() { return page; }
        public int getSize() { return size; }
        public long getTotalElements() { return totalElements; }
        public int getTotalPages() { return totalPages; }
        public boolean isLast() { return last; }
    }
}
