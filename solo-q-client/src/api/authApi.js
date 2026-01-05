import API from "./axiosInstance";

// 회원가입
export const signup = (data) =>
    API.post("/auth/signup", data);

// 로그인
export const login = async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};

// 이메일 중복 체크
export const checkEmail = (email) =>
    API.get(`/auth/check-email?email=${email}`);

// 닉네임 중복 체크
export const checkNickname = (nickname) =>
    API.get(`/auth/check-nickname?nickname=${nickname}`);

// 로그아웃
export const logout = () =>
    API.post("/auth/logout");
