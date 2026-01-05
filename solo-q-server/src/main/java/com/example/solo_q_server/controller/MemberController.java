package com.example.solo_q_server.controller;

import com.example.solo_q_server.domain.Member;
import com.example.solo_q_server.dto.member.MemberInfoResponse;
import com.example.solo_q_server.dto.member.MemberUpdateRequest;
import com.example.solo_q_server.repository.MemberRepository;
import com.example.solo_q_server.service.MemberService;
import com.example.solo_q_server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final MemberService memberService;

    // 기존 마이페이지 조회
    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> getMyInfo(@RequestHeader("Authorization") String token) {
        if(token.startsWith("Bearer ")) token = token.substring(7);

        Long memberId = jwtUtil.getMemberId(token);
        Member member = (Member) memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 정보가 존재하지 않습니다."));

        return ResponseEntity.ok(new MemberInfoResponse(
                member.getId(),
                member.getEmail(),
                member.getNickname(),
                member.getRole(),
                member.getLevel()
        ));
    }

    // 닉네임 업데이트
    @PatchMapping("/update-nickname")
    public ResponseEntity<String> updateNickname(
            @RequestHeader("Authorization") String token,
            @RequestBody MemberUpdateRequest request
    ) {
        memberService.updateNickname(token, request);
        return ResponseEntity.ok("닉네임이 성공적으로 변경되었습니다.");
    }
}

