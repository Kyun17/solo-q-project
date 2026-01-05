package com.example.solo_q_server.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    // application.properties에서 값 가져오기
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key key;

    // 객체 생성 후 키 초기화
    @PostConstruct
    public void init() {
        // 🔥 수정된 부분: Base64 Decode를 하지 않고, 문자열을 바로 바이트로 변환합니다.
        // 이렇게 하면 application.properties에 적은 영어 문장을 그대로 키로 쓸 수 있습니다.
        byte[] bytes = secretKey.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(bytes);
    }

    // 1. 토큰 생성 (로그인 성공 시)
    public String createToken(Long memberId, String email, String nickname) {
        Date now = new Date();

        return Jwts.builder()
                .setSubject(email) // 토큰 제목 (보통 이메일)
                .claim("memberId", memberId) // 비공개 클레임 (PK)
                .claim("nickname", nickname) // 비공개 클레임 (닉네임)
                .setIssuedAt(now) // 발행 시간
                .setExpiration(new Date(now.getTime() + expiration)) // 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) // 암호화 알고리즘
                .compact();
    }

    // 2. 토큰 검증 (인터셉터에서 사용)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("유효하지 않은 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    // 3. 토큰에서 사용자 정보(memberId) 추출
    public Long getMemberId(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .get("memberId", Long.class);
    }
}