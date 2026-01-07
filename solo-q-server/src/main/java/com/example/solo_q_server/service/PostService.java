package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.domain.Post;
import com.example.solo_q_server.dto.post.PostDetailResponse;
import com.example.solo_q_server.dto.post.PostListResponse;
import com.example.solo_q_server.dto.post.PostSaveRequest;
import com.example.solo_q_server.dto.post.PostUpdateRequest;
import com.example.solo_q_server.repository.CommentRepository;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.repository.PostRepository;
import com.example.solo_q_server.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;


    // 로그인 여부 체크
    private void loginCheck(Long memberId) {
        if (memberId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
    }

    // 게시글 작성
    public PostDetailResponse createPost(Long memberId, PostSaveRequest request) {

        loginCheck(memberId);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.")
                );

        // DTO -> Entity (우리 방식: Service에서 직접 생성)
        Post post = Post.builder()
                .member(member)
                .boardType(request.getBoardType())
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        Post saved = postRepository.save(post);

        int commentCount = 0;
        String timeAgo = TimeUtil.toTimeAgo(saved.getCreatedAt());

        return PostDetailResponse.from(saved, commentCount, timeAgo);
    }

    // 게시글 목록 조회 + 검색 + 페이징
    @Transactional(readOnly = true)
    public Page<PostListResponse> getPostList(int page, int size, String keyword) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "id")
        );

        Page<Post> postPage = findPostPage(keyword, pageable);

        // Page.map(...) 사용
        return postPage.map(post -> {
            int commentCount = commentRepository.countByPostId(post.getId());
            String timeAgo = TimeUtil.toTimeAgo(post.getCreatedAt());
            return PostListResponse.from(post, commentCount, timeAgo);
        });
    }


    // 게시글 검색 분기 처리
    private Page<Post> findPostPage(String keyword, Pageable pageable) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return postRepository.findAll(pageable);
        }
        return postRepository.findByTitleContainingIgnoreCase(keyword.trim(), pageable);

    }

    // 게시글 상세 조회 + 조회수 증가
    public PostDetailResponse getPostDetail(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.")
                );

        // 조회수 증가 (JPA Dirty Checking)
        post.increaseViewCount();

        int commentCount = commentRepository.countByPostId(postId);
        String timeAgo = TimeUtil.toTimeAgo(post.getCreatedAt());

        return PostDetailResponse.from(post, commentCount, timeAgo);
    }

    // 게시글 수정
    public PostDetailResponse updatePost(Long memberId, Long postId, PostUpdateRequest request) {

        loginCheck(memberId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.")
                );

        // 작성자 권한 체크
        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 수정 권한이 없습니다.");
        }

        post.update(
                request.getBoardType(),
                request.getTitle(),
                request.getContent()
        );

        int commentCount = commentRepository.countByPostId(postId);
        String timeAgo = TimeUtil.toTimeAgo(post.getCreatedAt());

        return PostDetailResponse.from(post, commentCount, timeAgo);
    }

    // 게시글 삭제
    public void deletePost(Long memberId, Long postId) {

        loginCheck(memberId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.")
                );

        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 삭제 권한이 없습니다.");
        }

        // 댓글 먼저 삭제
        commentRepository.deleteByPostId(postId);

        // 게시글 삭제
        postRepository.delete(post);
    }
}

