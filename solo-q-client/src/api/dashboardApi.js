import axiosInstance from './axiosInstance';

// 대시보드 데이터 조회 (GET /api/dashboard)
export const getDashboardData = async () => {
    try {
        const response = await axiosInstance.get('/dashboard');
        return response.data; // DashboardResponse 객체 반환
    } catch (error) {
        console.error("대시보드 데이터 로드 실패:", error);
        throw error;
    }
};