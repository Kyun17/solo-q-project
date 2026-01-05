import { loginApi, signupApi } from "../api/authApi";
import useAuthStore from "../store/useAuthStore";

const useAuth = () => {
    const { setAuth, clearAuth } = useAuthStore();

    const login = async (email, password) => {
        const res = await loginApi({ email, password });

        setAuth({
            accessToken: res.accessToken,
            user: res.user,
        });
    };

    const signup = async (data) => {
        await signupApi(data);
    };

    const logout = () => {
        clearAuth();
    };

    return {
        login,
        signup,
        logout,
    };
};

export default useAuth;
