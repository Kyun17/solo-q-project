import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand Store: 로그인 상태 관리 (새로고침 해도 유지되도록 persist 사용)
const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null, // { memberId, nickname, email }
            token: null,

            // 로그인 성공 시 호출
            login: (userData, token) => {
                localStorage.setItem('token', token); // axiosInstance에서 쓰기 위해 저장
                set({ isLoggedIn: true, user: userData, token });
            },

            // 로그아웃 시 호출
            logout: () => {
                localStorage.removeItem('token');
                set({ isLoggedIn: false, user: null, token: null });
            },
        }),
        {
            name: 'auth-storage', // localStorage에 저장될 키 이름
        }
    )
);

export default useAuthStore;


