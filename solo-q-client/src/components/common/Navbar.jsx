import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, Atom, SignIn, UserPlus } from '@phosphor-icons/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transition-all">
            <Atom size={24} weight="fill" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Solo-Q
          </span>
        </Link>

        {/* Desktop Menu */}
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

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          {isOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay (드롭다운 방식) */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-slate-950 border-b border-white/5 shadow-2xl md:hidden">
          <div className="px-6 py-8 flex flex-col gap-6">
            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link
                to="/note"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group"
              >
                <span className="text-base font-medium text-slate-300 group-hover:text-white">
                  질문 노트
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Note
                </span>
              </Link>
              <Link
                to="/interview"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group"
              >
                <span className="text-base font-medium text-slate-300 group-hover:text-white">
                  모의 면접
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Interview
                </span>
              </Link>
              <Link
                to="/community"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group"
              >
                <span className="text-base font-medium text-slate-300 group-hover:text-white">
                  커뮤니티
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Community
                </span>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800"></div>

            {/* Bottom Actions (깔끔한 50:50) */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white transition-all text-sm"
              >
                <SignIn size={18} />
                로그인
              </Link>

              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all text-sm shadow-md"
              >
                <UserPlus size={18} />
                회원가입
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
