import axios from 'axios';

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
    const token = localStorage.getItem('token'); // 로그인 시 저장한 토큰
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
