import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    signup,
    checkEmail,
    checkNickname,
} from "../../api/authApi";
import styles from "./Auth.module.css";

function SignupPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
    });

    // 상태 관리
    const [emailStatus, setEmailStatus] = useState("idle"); // idle | checking | success | error
    const [emailError, setEmailError] = useState("");

    const [nicknameStatus, setNicknameStatus] = useState("idle");
    const [nicknameError, setNicknameError] = useState("");

    const [passwordError, setPasswordError] = useState("");

    /* ---------------- 공통 핸들러 ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    /* ---------------- 이메일 중복 체크 ---------------- */
    const handleEmailBlur = async () => {
        const email = form.email.trim();
        if (!email) {
            setEmailStatus("idle");
            setEmailError("");
            return;
        }

        setEmailStatus("checking");
        try {
            const res = await checkEmail(email);
            if (res.data.duplicated) {
                setEmailError("이미 사용 중인 이메일입니다.");
                setEmailStatus("error");
            } else {
                setEmailError("");
                setEmailStatus("success");
            }
        } catch {
            setEmailError("이메일 확인 중 오류가 발생했습니다.");
            setEmailStatus("error");
        }
    };

    /* ---------------- 닉네임 중복 체크 ---------------- */
    const handleNicknameBlur = async () => {
        const nickname = form.nickname.trim();
        if (!nickname) {
            setNicknameStatus("idle");
            setNicknameError("");
            return;
        }

        setNicknameStatus("checking");
        try {
            const res = await checkNickname(nickname);
            if (res.data.duplicated) {
                setNicknameError("이미 존재하는 닉네임입니다.");
                setNicknameStatus("error");
            } else {
                setNicknameError("");
                setNicknameStatus("success");
            }
        } catch {
            setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
            setNicknameStatus("error");
        }
    };

    /* ---------------- 비밀번호 검증 ---------------- */
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, password: value }));

        if (value.length < 8) {
            setPasswordError("비밀번호는 8자 이상이어야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    /* ---------------- 회원가입 ---------------- */
    const handleSubmit = async () => {
        if (passwordError) {
            alert("비밀번호 조건을 확인해주세요.");
            return;
        }

        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (emailStatus !== "success" || nicknameStatus !== "success") {
            alert("이메일/닉네임 중복 확인을 완료해주세요.");
            return;
        }

        try {
            await signup({
                email: form.email,
                password: form.password,
                nickname: form.nickname,
            });
            alert("회원가입 성공!");
            navigate("/login");
        } catch (e) {
            alert(e.response?.data || "회원가입 실패");
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
                    환영합니다! 회원가입을 시작해볼까요?
                </p>

                <div className={styles.form}>
                    {/* 이메일 */}
                    <input
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                    />
                    {emailStatus === "checking" && (
                        <p className={styles.checking}>확인 중...</p>
                    )}
                    {emailStatus === "success" && (
                        <p className={styles.success}>✔ 사용 가능한 이메일입니다.</p>
                    )}
                    {emailError && <p className={styles.error}>{emailError}</p>}

                    {/* 비밀번호 */}
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호 (8자 이상)"
                        onChange={handlePasswordChange}
                    />
                    {passwordError && (
                        <p className={styles.error}>{passwordError}</p>
                    )}

                    {/* 비밀번호 확인 */}
                    <input
                        name="passwordConfirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        onChange={handleChange}
                    />

                    {/* 닉네임 */}
                    <input
                        name="nickname"
                        placeholder="닉네임"
                        onChange={handleChange}
                        onBlur={handleNicknameBlur}
                    />
                    {nicknameStatus === "checking" && (
                        <p className={styles.checking}>확인 중...</p>
                    )}
                    {nicknameStatus === "success" && (
                        <p className={styles.success}>
                            ✔ 사용 가능한 닉네임입니다.
                        </p>
                    )}
                    {nicknameError && (
                        <p className={styles.error}>{nicknameError}</p>
                    )}

                    <button className={styles.button} onClick={handleSubmit}>
                        가입하기
                    </button>
                    <span className={styles.back} onClick={() => navigate("/")}>← 메인으로 돌아가기</span>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
