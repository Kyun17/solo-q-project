package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일로 회원 찾기 (로그인 시 사용)
    Optional<Member> findByEmail(String email);

    // 이메일 중복 검사 (회원가입 시 사용)
    boolean existsByEmail(String email);

    // 참고: findById(Long id)는 JpaRepository에 이미 내장되어 있어서 안 적어도 됩니다!
}