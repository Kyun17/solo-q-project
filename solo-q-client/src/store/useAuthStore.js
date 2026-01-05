import { create } from "zustand";
import { login as loginApi, signup as signupApi, logout } from "../api/authApi";
import { getMe, updateNickname as updateNicknameApi } from "../api/userApi";

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,

    setUser: (user) => set({ user }),
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    login: async (credentials) => {
        set({ loading: true });
        try {
            const data = await loginApi(credentials);
            localStorage.setItem("token", data.accessToken);
            set({ token: data.accessToken });
            const user = await getMe();
            set({ user });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Login failed" };
        } finally {
            set({ loading: false });
        }
    },

    signup: async (credentials) => {
        set({ loading: true });
        try {
            await signupApi(credentials);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Signup failed" };
        } finally {
            set({ loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },

    fetchUser: async () => {
        try {
            const user = await getMe();
            set({ user });
        } catch (err) {
            console.error(err);
        }
    },

    updateNickname: async (nickname) => {
        try {
            await updateNicknameApi(nickname);
            const user = await getMe();
            set({ user });
        } catch (err) {
            console.error(err);
        }
    }
}));

export default useAuthStore;
