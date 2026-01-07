import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. 백엔드 로그인 API 호출
            // (아직 axiosInstance에는 토큰이 없으므로 axios 직접 사용 or create 별도 분리)
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);

            const { token, memberId, nickname } = response.data;

            // 2. Zustand 스토어에 저장 (로그인 처리)
            login({ memberId, nickname, email: formData.email }, token);

            // 3. 대시보드로 이동
            alert(`${nickname}님, 환영합니다!`);
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* 로고 & 홈 버튼 */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={16} /> 메인으로 돌아가기
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">다시 오셨군요! 👋</h1>
                    <p className="text-slate-400">Solo-Q와 함께 면접을 정복해보세요.</p>
                </div>

                {/* 로그인 폼 */}
                <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">이메일</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="example@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="비밀번호 입력"
                                required
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                        >
                            {loading ? '로그인 중...' : '로그인하기'}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-6">
                        아직 계정이 없으신가요? <Link to="/auth/signup" className="text-purple-400 font-bold hover:underline">회원가입</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
