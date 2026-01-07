package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    // 키워드 포함 검색
    Page<Post> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
}

