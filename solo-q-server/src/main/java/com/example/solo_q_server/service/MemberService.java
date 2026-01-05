package com.example.solo_q_server.service;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.dto.member.MemberUpdateRequest;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public void updateNickname(String token, MemberUpdateRequest request) {
        if(token.startsWith("Bearer ")) token = token.substring(7);

        Long memberId = jwtUtil.getMemberId(token);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 정보가 존재하지 않습니다."));

        member.setNickname(request.getNickname());
        // JPA @Transactional + 엔티티 변경감지(dirty checking)로 update 자동 적용
    }
}
