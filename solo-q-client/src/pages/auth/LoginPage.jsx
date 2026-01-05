import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/authApi";
import useAuthStore from "../../store/useAuthStore";
import styles from "./Auth.module.css";

function LoginPage() {
    const navigate = useNavigate();
    const setLogin = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await loginApi({ email, password });
            setLogin(data.accessToken);
            alert("로그인 성공");
            navigate("/dashboard");
        } catch (e) {
            alert(e.response?.data?.message || "로그인 실패");
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>GYC</div>
                    <h2>AI 면접 플랫폼</h2>
                </div>

                <p className={styles.subtitle}>
                    다시 오셨군요! 면접을 시작해볼까요?
                </p>

                <div className={styles.form}>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleLogin}>
                        로그인
                    </button>
                </div>

                <div
                    className={styles.link}
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </div>
                <span className={styles.back} onClick={() => navigate("/")}>← 메인으로 돌아가기</span>

            </div>
        </div>
    );
}

export default LoginPage;
