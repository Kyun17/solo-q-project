import axiosInstance from './axiosInstance';

// 1. 면접 질문지 생성 요청 (GET /api/interview/questions)
// 사용자가 선택한 카테고리와 개수에 맞춰 랜덤 질문을 받아옵니다.
export const getInterviewQuestions = async (category, count) => {
    try {
        const response = await axiosInstance.get('/interview/questions', {
            params: { category, count }
        });
        return response.data;
    } catch (error) {
        console.error("질문지 생성 실패:", error);
        throw error;
    }
};

// 2. 면접 결과 저장 (POST /api/interview/result)
export const saveInterviewResult = async (resultData) => {
    try {
        const response = await axiosInstance.post('/interview/result', resultData);
        return response.data;
    } catch (error) {
        console.error("면접 결과 저장 실패:", error);
        throw error;
    }
};

// 3. 내 면접 기록 조회 (GET /api/interview/history)
export const getInterviewHistory = async () => {
    try {
        const response = await axiosInstance.get('/interview/history');
        return response.data;
    } catch (error) {
        console.error("면접 기록 조회 실패:", error);
        throw error;
    }
};