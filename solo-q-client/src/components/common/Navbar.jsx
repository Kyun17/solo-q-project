import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, LogOut, User } from 'lucide-react'; // User 아이콘 추가 확인
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuthStore();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
      setIsMenuOpen(false); // 로그아웃 시 메뉴 닫기
    }
  };

  const getLinkClass = (path) => {
    const isActive =
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path));

    return isActive
      ? 'text-purple-400 font-bold transition-colors'
      : 'text-slate-300 hover:text-white transition-colors';
  };

  // ✅ 모바일 메뉴 아이템 스타일 (터치 영역 확보 및 시각적 피드백)
  const mobileMenuItemClass = (path) => {
    const isActive =
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path));

    return `block px-4 py-3 rounded-xl transition-all ${
      isActive
        ? 'bg-purple-500/10 text-purple-400 font-bold'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* 1. Logo */}
        <Link
          to={isLoggedIn ? '/dashboard' : '/'}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/50 transition-all">
            H
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Hitori<span className="text-purple-400">demo</span>
          </span>
        </Link>

        {/* 2. Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                대시보드
              </Link>
              <Link to="/interview" className={getLinkClass('/interview')}>
                모의면접
              </Link>
              <Link to="/note" className={getLinkClass('/note')}>
                질문노트
              </Link>
              <Link to="/community" className={getLinkClass('/community')}>
                커뮤니티
              </Link>
            </>
          ) : (
            <>
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                기능소개
              </a>
              <a
                href="#how-it-works"
                className="text-slate-300 hover:text-white transition-colors"
              >
                이용방법
              </a>
              <Link to="/community" className={getLinkClass('/community')}>
                커뮤니티
              </Link>
            </>
          )}
        </div>

        {/* 3. Desktop CTA & User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                  {user?.nickname ? user.nickname[0] : 'U'}
                </div>
                <span className="text-sm font-medium text-white">
                  {user?.nickname}님
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-slate-800"
                title="로그아웃"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/auth/signup"
                className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                무료로 시작하기 <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </>
          )}
        </div>

        {/* 4. Mobile Menu Button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 5. Mobile Menu Dropdown (Refactored) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl flex flex-col">
          {/* A. Menu Content Area */}
          <div className="p-5 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                {/* User Profile Card */}
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-white/5 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                    {user?.nickname ? user.nickname[0] : 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base">
                      {user?.nickname}님
                    </p>
                    <p className="text-xs text-slate-400">
                      오늘도 화이팅하세요!
                    </p>
                  </div>
                </div>

                {/* Nav Links */}
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('/dashboard')}
                >
                  대시보드
                </Link>
                <Link
                  to="/interview"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('/interview')}
                >
                  모의면접
                </Link>
                <Link
                  to="/note"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('/note')}
                >
                  질문노트
                </Link>
                <Link
                  to="/community"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('/community')}
                >
                  커뮤니티
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('#features')}
                >
                  기능소개
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('#how-it-works')}
                >
                  이용방법
                </a>
                <Link
                  to="/community"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileMenuItemClass('/community')}
                >
                  커뮤니티
                </Link>
              </>
            )}
          </div>

          {/* B. Bottom Action Area (Separator + 50:50 Buttons) */}
          <div className="p-4 border-t border-white/10 bg-slate-900/50">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-slate-800 text-red-400 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> 로그아웃
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* 50:50 배치: flex-1 사용 */}
                <Link
                  to="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 bg-slate-800 text-slate-200 py-3.5 rounded-xl font-bold text-sm text-center hover:bg-slate-700 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 bg-white text-slate-900 py-3.5 rounded-xl font-bold text-sm text-center hover:bg-slate-100 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
