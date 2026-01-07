package com.example.solo_q_server.util;

import java.time.Duration;
import java.time.LocalDateTime;

// "방금 전", "N분 전", "N시간 전", "N일 전" 변환
public class TimeUtil {

    private TimeUtil() {
        // 유틸 클래스는 객체 생성 방지
    }

    // createdAt 기준으로 상대 시간 문자열 생성
    public static String toTimeAgo(LocalDateTime createdAt) {

        if (createdAt == null) {
            return "";
        }

        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(createdAt, now);

        long seconds = duration.getSeconds();

        if (seconds < 0) {
            return "방금 전";
        }

        if (seconds < 60) {
            return "방금 전";
        }

        long minutes = seconds / 60;
        if (minutes < 60) {
            return minutes + "분 전";
        }

        long hours = minutes / 60;
        if (hours < 24) {
            return hours + "시간 전";
        }

        long days = hours / 24;
        return days + "일 전";
    }
}
