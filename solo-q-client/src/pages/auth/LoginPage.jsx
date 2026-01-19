import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import useAuthStore from '../../store/useAuthStore';
import { ArrowLeft, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'; // Loader2 아이콘 추가

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
      // [UX 개선] 최소 로딩 시간 보장 (0.8초)
      // API가 아무리 빨라도 이 시간만큼은 로딩 애니메이션을 보여줍니다.
      // Promise.all을 사용하여 "API 요청"과 "0.8초 타이머" 중 더 늦게 끝나는 것을 기다립니다.
      const [response] = await Promise.all([
        axiosInstance.post('/auth/login', formData),
        new Promise((resolve) => setTimeout(resolve, 800)), // 0.8초 대기 (숫자를 조절하여 시간 변경 가능)
      ]);

      const { token, memberId, nickname } = response.data; // token 소문자 확인!

      login({ memberId, nickname, email: formData.email }, token);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // 에러가 났을 때도 너무 빨리 뜨면 어색하므로 약간의 딜레이 후 메시지 표시 (선택사항)
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 font-sans text-white relative overflow-hidden bg-[#0a0a1a]">
      {/* 배경 효과 1 */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 배경 효과 2 */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* 메인 컨테이너 */}
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* 1. 상단 로고 */}
        <Link
          to="/"
          className="flex items-center gap-3 mb-10 group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center font-bold text-3xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            Q
          </div>
          <span className="font-bold text-4xl tracking-tight drop-shadow-lg">
            Solo<span className="text-purple-400">-Q</span>
          </span>
        </Link>

        {/* 2. 환영 인사말 */}
        <div className="text-center mb-8">
          <p className="text-slate-300 text-lg drop-shadow-md">
            다시 오셨군요! 면접 준비를 시작해볼까요?
          </p>
        </div>

        {/* 3. 로그인/회원가입 탭 */}
        <div className="w-full bg-slate-900/60 backdrop-blur-md p-1.5 rounded-xl flex mb-8 border border-slate-700/50">
          <button className="flex-1 py-3 rounded-lg bg-slate-800 text-white font-medium shadow-sm border border-slate-700">
            로그인
          </button>
          <Link
            to="/auth/signup"
            className="flex-1 py-3 rounded-lg text-slate-400 font-medium hover:text-white transition-all text-center hover:bg-slate-800/50"
          >
            회원가입
          </Link>
        </div>

        {/* 4. 입력 폼 */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              이메일
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-slate-900/80 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              비밀번호
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-slate-900/80 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-80 disabled:cursor-wait flex items-center justify-center gap-2 text-lg border border-white/10"
          >
            {loading ? (
              <>
                {/* 로딩 중일 때: 텍스트 변경 + 빙글빙글 도는 아이콘 */}
                <Loader2 size={20} className="animate-spin" />
                로그인 중...
              </>
            ) : (
              <>
                {/* 평상시 */}
                로그인하기
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* 5. 하단 링크 */}
        <div className="mt-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors opacity-80 hover:opacity-100"
          >
            <ArrowLeft size={16} />
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
