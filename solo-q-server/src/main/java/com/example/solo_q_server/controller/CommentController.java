package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.comment.CommentResponse;
import com.example.solo_q_server.dto.comment.CommentSaveRequest;
import com.example.solo_q_server.dto.comment.CommentUpdateRequest;
import com.example.solo_q_server.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 작성 (회원만)
    @PostMapping("/api/posts/{postId}/comments")
    public ResponseEntity<CommentResponse> create(
            @PathVariable Long postId,
            @Valid @RequestBody CommentSaveRequest request,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        return ResponseEntity.ok(commentService.create(memberId, postId, request));
    }

    // 댓글 목록 조회
    @GetMapping("/api/posts/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    // 댓글 수정 (회원만)
    @PatchMapping("/api/comments/{commentId}")
    public ResponseEntity<CommentResponse> update(
            @PathVariable Long commentId,
            @Valid @RequestBody CommentUpdateRequest request,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        return ResponseEntity.ok(commentService.update(memberId, commentId, request));
    }

    // 댓글 삭제 (회원만)
    @DeleteMapping("/api/comments/{commentId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long commentId,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        commentService.delete(memberId, commentId);
        return ResponseEntity.noContent().build();
    }
}

