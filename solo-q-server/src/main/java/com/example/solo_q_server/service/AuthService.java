package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.dto.auth.LoginRequest;
import com.example.solo_q_server.dto.auth.LoginResponse;
import com.example.solo_q_server.dto.auth.SignupRequest;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    /**
     * 로그인
     */
    public LoginResponse login(LoginRequest request) {
        // 1. 이메일 검증
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        // 2. 비밀번호 검증 (단순 문자열 비교)
        if (!member.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3. JWT 토큰 생성
        String token = jwtUtil.createToken(member.getMemberId(), member.getEmail(), member.getNickname());

        // 4. 응답 객체 생성 및 반환
        return LoginResponse.builder()
                .token(token)
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .build();
    }

    /**
     * 회원가입
     */
    @Transactional // 데이터 저장 시 읽기전용 해제
    public void signup(SignupRequest request) {
        // 1. 중복 검사
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        // 2. 회원 엔티티 생성
        Member member = Member.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .nickname(request.getNickname())
                .role("USER") // 기본 권한
                .level(1) // 기본 레벨
                .createdAt(LocalDateTime.now())
                .build();

        // 3. DB 저장
        memberRepository.save(member);
    }
}