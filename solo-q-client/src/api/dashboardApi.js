import axiosInstance from './axiosInstance';

export const getDashboardData = async () => {
    try {
        console.log("📡 Axios 요청 보냄..."); // 👈 여기도 로그 추가
        const response = await axiosInstance.get('/dashboard');
        console.log("백엔드 응답 성공:", response.data); // 👈 콘솔 로그 추가!
        return response.data;
    } catch (error) {
        console.error("데이터 로드 실패 (백엔드 꺼져있거나 에러):", error);
        throw error; // 에러를 던져야 페이지에서 알 수 있음
    }
};
