// 목업 데이터 * 나중에 지워야함

export const useAuth = () => {
    // 원래는 토큰 검사 로직이 있어야 하지만...
    // 지금은 무조건 "나 로그인 했어! 내 이름은 김개발이야!" 라고 거짓말 침
    return {
        isLoggedIn: true,  // ⭐ 핵심
        user: {
            memberId: 1,
            nickname: "김개발",
            email: "test@test.com",
            level: 3
        }
    };
};