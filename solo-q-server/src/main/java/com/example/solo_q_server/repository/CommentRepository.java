package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Comment;
import com.example.solo_q_server.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 댓글 작성일 기준 오름차순 정렬
    List<Comment> findByPostOrderByCreatedAtAsc(Post post);

    // 댓글 삭제 메서드
    void deleteByPostId(Long postId);

    // 댓글 갯수 조회 메서드
    int countByPostId(Long postId);
}
