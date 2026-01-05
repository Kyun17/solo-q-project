package com.example.solo_q_server.repository;

import com.example.solo_q_server.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    /*
     * 회원가입 시 이메일 중복 체크
     * @return 이메일이 존재하면 true, 아니면 false
     */
    boolean existsByEmail(String email);


    /*
     * 회원가입 시 닉네임 중복 체크
     * @return 닉네임이 존재하면 true, 아니면 false
     */
    boolean existsByNickname(String nickname);


}