import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  CheckCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. 클라이언트단 유효성 검사 (비밀번호 일치 여부)
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      // 2. 백엔드 DTO 구조에 맞춰 데이터 준비
      const requestBody = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      };

      // 3. API 호출 + 최소 로딩 시간(0.8초) 보장 (로그인 페이지와 UX 통일)
      const [response] = await Promise.all([
        axiosInstance.post('auth/signup', requestBody),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      // 4. 성공 처리
      // 백엔드에서 보낸 메시지("회원가입이 성공적으로 완료되었습니다.")를 알림으로 표시
      alert(response.data);
      navigate('/auth/login'); // 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      // 에러 응답이 있을 경우 그 메시지를, 없으면 기본 메시지 출력
      const errorMessage =
        err.response?.data || '회원가입 중 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 font-sans text-white relative overflow-hidden bg-[#0a0a1a]">
      {/* 배경 효과 */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* 메인 컨테이너 */}
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* 1. 상단 로고 */}
        <Link
          to="/"
          className="flex items-center gap-3 mb-10 group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center font-bold text-3xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            H
          </div>
          <span className="font-bold text-4xl tracking-tight drop-shadow-lg">
            HITORI<span className="text-purple-400"></span>
          </span>
        </Link>

        {/* 2. 안내 문구 */}
        <div className="text-center mb-8">
          <p className="text-slate-300 text-lg drop-shadow-md">
            새로운 도전을 시작해보세요! 🚀
          </p>
        </div>

        {/* 3. 탭 스위처 (회원가입 활성화) */}
        <div className="w-full bg-slate-900/60 backdrop-blur-md p-1.5 rounded-xl flex mb-8 border border-slate-700/50">
          <Link
            to="/auth/login"
            className="flex-1 py-3 rounded-lg text-slate-400 font-medium hover:text-white transition-all text-center hover:bg-slate-800/50"
          >
            로그인
          </Link>
          <button className="flex-1 py-3 rounded-lg bg-slate-800 text-white font-medium shadow-sm border border-slate-700">
            회원가입
          </button>
        </div>

        {/* 4. 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              이름 (닉네임)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="사용하실 닉네임을 입력하세요"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-slate-900/80 transition-all"
                required
              />
            </div>
          </div>

          {/* 이메일 */}
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

          {/* 비밀번호 */}
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
                placeholder="8자 이상 입력해주세요"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-slate-900/80 transition-all"
                required
              />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              비밀번호 확인
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                <CheckCircle size={20} />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 한 번 더 입력하세요"
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/60 border text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:bg-slate-900/80 transition-all
                                    ${
                                      formData.confirmPassword &&
                                      formData.password !==
                                        formData.confirmPassword
                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
                                        : 'border-slate-700/50 focus:border-purple-500 focus:ring-purple-500'
                                    }`}
                required
              />
            </div>
            {/* 비밀번호 불일치 시 메시지 표시 */}
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-80 disabled:cursor-wait flex items-center justify-center gap-2 text-lg border border-white/10 mt-4"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                가입 처리 중...
              </>
            ) : (
              <>
                계정 생성하기
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* 5. 하단 링크 */}
        <div className="mt-8 mb-8">
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

export default SignupPage;
