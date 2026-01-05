import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Button from "../components/common/Button";

const MyPage = () => {
    const { user, fetchUser, logout, updateNickname } = useAuthStore();
    const [nicknameInput, setNicknameInput] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    const handleUpdateNickname = async () => {
        await updateNickname(nicknameInput);
        setNicknameInput("");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">마이페이지</h1>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>닉네임:</strong> {user.nickname}</p>
            <p><strong>레벨:</strong> {user.level}</p>
            <input
                type="text"
                placeholder="새 닉네임 입력"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="border p-1 mt-2 mr-2"
            />
            <Button onClick={handleUpdateNickname}>닉네임 변경</Button>
            <div className="mt-4">
                <Button onClick={logout}>로그아웃</Button>
            </div>
        </div>
    );
};

export default MyPage;
