import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function Navbar() {
    const navigate = useNavigate();
    const { token, logout } = useAuthStore();

    if (!token) return null; // 로그인 안 하면 Navbar 숨김

    return (
        <nav style={{ display: "flex", gap: 12 }}>
            <button onClick={() => navigate("/dashboard")}>
                대시보드
            </button>

            <button onClick={() => navigate("/mypage")}>
                마이페이지
            </button>

            <button
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
            >
                로그아웃
            </button>
        </nav>
    );
}

export default Navbar;
