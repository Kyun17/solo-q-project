package com.example.solo_q_server.interceptor;

import com.example.solo_q_server.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginCheckInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        // 1. CORS Preflight 요청(OPTIONS 메서드)은 검사 없이 통과시킴
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        // ✅ 2. 게시글/댓글 조회(GET)는 인증 없이 허용
        if (HttpMethod.GET.matches(request.getMethod())
                && request.getRequestURI().startsWith("/api/posts")) {
            return true;
        }

        // 2. 헤더에서 토큰 추출
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("토큰이 없거나 잘못된 형식입니다.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인이 필요합니다."); // 401 에러 리턴
            return false; // 컨트롤러 진입 차단
        }

        String token = authHeader.substring(7); // "Bearer " 이후 문자열만 추출

        // 3. 토큰 검증
        if (jwtUtil.validateToken(token)) {
            // 4. 유효하면 request에 memberId를 담아서 컨트롤러로 보냄 (중요!)
            Long memberId = jwtUtil.getMemberId(token);
            request.setAttribute("memberId", memberId);
            return true; // 통과
        } else {
            log.warn("유효하지 않은 토큰입니다.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
            return false; // 차단
        }
    }
}
