import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, Atom } from '@phosphor-icons/react'; // 햄버거(List), 닫기(X), 로고(Atom) 아이콘
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 스크롤 감지 (배경색 변경용)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <Atom size={24} weight="fill" className="animate-spin-slow" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Solo-Q
          </span>
        </Link>

        {/* --- Desktop Menu (md 이상에서만 보임) --- */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/note" className="hover:text-white transition-colors">
              질문 노트
            </Link>
            <Link
              to="/interview"
              className="hover:text-white transition-colors"
            >
              모의 면접
            </Link>
            <Link
              to="/community"
              className="hover:text-white transition-colors"
            >
              커뮤니티
            </Link>
          </div>
          <div className="h-5 w-px bg-slate-700"></div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-white hover:text-purple-400 transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-full hover:bg-purple-50 transition-colors shadow-lg shadow-white/10"
            >
              무료로 시작하기
            </Link>
          </div>
        </div>

        {/* --- Mobile Toggle Button (md 미만에서만 보임) --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          {isOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {/* Navigation Links */}
              <div className="flex flex-col gap-4 text-lg font-medium text-slate-300">
                <Link
                  to="/note"
                  className="flex items-center justify-between p-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  질문 노트 <span className="text-xs text-slate-600">Note</span>
                </Link>
                <Link
                  to="/interview"
                  className="flex items-center justify-between p-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  모의 면접{' '}
                  <span className="text-xs text-slate-600">Interview</span>
                </Link>
                <Link
                  to="/community"
                  className="flex items-center justify-between p-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  커뮤니티{' '}
                  <span className="text-xs text-slate-600">Community</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

              {/* Mobile Actions (모바일 최적화: 세로 배치) */}
              <div className="flex flex-col gap-3">
                {/* 1. 로그인 버튼 */}
                <Link
                  to="/login"
                  className="w-full py-3 text-center text-slate-400 hover:text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  로그인
                </Link>

                {/* 2. 회원가입 버튼 (강조됨) */}
                <Link
                  to="/signup"
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-center rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98] transition-all"
                >
                  회원가입 {/* 모바일에서는 짧고 명확하게 변경 */}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
