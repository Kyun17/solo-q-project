package com.example.solo_q_server.controller;

import com.example.solo_q_server.dto.post.PostDetailResponse;
import com.example.solo_q_server.dto.post.PostListResponse;
import com.example.solo_q_server.dto.post.PostSaveRequest;
import com.example.solo_q_server.dto.post.PostUpdateRequest;
import com.example.solo_q_server.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 작성 (회원만)
    @PostMapping
    public ResponseEntity<PostDetailResponse> create(
            @Valid @RequestBody PostSaveRequest request,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        return ResponseEntity.ok(postService.createPost(memberId, request));
    }

    // 게시글 목록 조회 + 검색 + 페이징
    @GetMapping
    public ResponseEntity<Page<PostListResponse>> list(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(postService.getPostList(page, size, keyword));
    }

    // 게시글 상세 조회 + 조회수 증가
    @GetMapping("/{id}")
    public ResponseEntity<PostDetailResponse> detail(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostDetail(id));
    }

    // 게시글 수정 (회원만)
    @PatchMapping("/{id}")
    public ResponseEntity<PostDetailResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody PostUpdateRequest request,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        return ResponseEntity.ok(postService.updatePost(memberId, id, request));
    }

    // 게시글 삭제 (회원만)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestAttribute(name = "memberId", required = false) Long memberId
    ) {
        postService.deletePost(memberId, id);
        return ResponseEntity.noContent().build();
    }
}

