package com.example.solo_q_server.config;

import com.example.solo_q_server.interceptor.LoginCheckInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final LoginCheckInterceptor loginCheckInterceptor;

    // 1. CORS 설정 (프론트엔드와 통신을 위해 필수)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "https://solo-q-project.vercel.app") // React 개발 서버 주소
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    // 2. 인터셉터 등록
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckInterceptor)
                .addPathPatterns("/**") // 모든 경로 검사
                .excludePathPatterns(   // 검사 제외할 경로 (로그인 안 해도 되는 곳)
                        "/api/auth/**", // 로그인, 회원가입은 통과
                        "/api/health",  // 헬스 체크
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/error"
                );
    }
}