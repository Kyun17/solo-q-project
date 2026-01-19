import axios from 'axios';

import useAuthStore from '../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 백엔드 주소
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 1. 스토어의 로그아웃 함수 실행 (상태 초기화)
      useAuthStore.getState().logout();

      // 2. 알림
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');

      // 3. 강제 페이지 이동
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
