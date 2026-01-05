package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.dto.auth.LoginRequest;
import com.example.solo_q_server.dto.auth.LoginResponse;
import com.example.solo_q_server.dto.auth.SignupRequest;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(SignupRequest request) {
        if (memberRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("이미 사용 중인 이메일입니다.");

        if (memberRepository.existsByNickname(request.getNickname()))
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");

        Member member = Member.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .build();

        memberRepository.save(member);
    }

    public LoginResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("회원 정보가 존재하지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword()))
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");

        String token = jwtUtil.createToken(member.getId());
        return new LoginResponse(token);
    }
}
