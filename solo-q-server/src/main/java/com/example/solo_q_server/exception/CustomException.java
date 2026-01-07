package com.example.solo_q_server.exception;

public class CustomException extends RuntimeException {

    private final int status;
    private final String message;

    // 기본 생성자 (필요하면 유지)
    public CustomException() {
        super();
        this.status = 500;
        this.message = "서버 오류";
    }

    // ⭐ 지금 네가 쓰고 있는 생성자
    public CustomException(int status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
