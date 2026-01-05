import API from "./axiosInstance";

// 내 정보 조회
export const getMe = async () => {
    const response = await API.get("/api/member/me");
    return response.data; // { id, email, nickname, role, level }
};

// 닉네임 업데이트
export const updateNickname = async (nickname) => {
    const response = await API.patch("/api/member/update-nickname", { nickname });
    return response.data; // 문자열 "닉네임이 성공적으로 변경되었습니다."
};
