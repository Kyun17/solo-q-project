package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Comment;
import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.domain.Post;
import com.example.solo_q_server.dto.comment.CommentResponse;
import com.example.solo_q_server.dto.comment.CommentSaveRequest;
import com.example.solo_q_server.dto.comment.CommentUpdateRequest;
import com.example.solo_q_server.repository.CommentRepository;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;


    // 로그인 여부 체크
    private void loginCheck(Long memberId) {
        if (memberId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
    }


    // 댓글 목록 조회
    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.")
                );

        List<Comment> comments = commentRepository.findByPostOrderByCreatedAtAsc(post);

        return comments.stream()
                .map(CommentResponse::from)
                .toList();
    }

    // 댓글 작성
    public CommentResponse create(Long memberId, Long postId, CommentSaveRequest request) {

        loginCheck(memberId);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.")
                );

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.")
                );

        // DTO -> Entity
        Comment comment = Comment.builder()
                .post(post)
                .member(member)
                .content(request.getContent())
                .build();

        Comment saved = commentRepository.save(comment);

        return CommentResponse.from(saved);
    }

    // 댓글 수정
    public CommentResponse update(Long memberId, Long commentId, CommentUpdateRequest request) {

        loginCheck(memberId);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다.")
                );

        // 작성자 권한 체크
        if (!comment.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 수정 권한이 없습니다.");
        }

        // 댓글 수정
        comment.updateContent(request.getContent());

        return CommentResponse.from(comment);
    }

    // 댓글 삭제
    public void delete(Long memberId, Long commentId) {

        loginCheck(memberId);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다.")
                );

        // 작성자 권한 체크
        if (!comment.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }
}

