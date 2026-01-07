import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { ArrowRight, Menu, X, User, LogOut } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로 정보 가져오기
    const { isLoggedIn, user, logout } = useAuthStore();

    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        if (confirm("정말 로그아웃 하시겠습니까?")) {
            logout();
            navigate('/');
        }
    };

    // ✅ 현재 경로와 링크 경로가 일치하는지 확인하여 클래스 반환
    const getLinkClass = (path) => {
        // 정확히 일치하거나, 해당 경로로 시작하는 경우 (하위 페이지 포함) 활성화
        const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

        return isActive
            ? "text-purple-400 font-bold transition-colors"  // 활성화 시 보라색 + 굵게
            : "text-slate-300 hover:text-white transition-colors"; // 비활성화 시 기본색
    };

    // ✅ 모바일용 링크 스타일 함수
    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
        return isActive ? "text-purple-400 font-bold" : "text-slate-300 hover:text-white";
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* 1. Logo */}
                <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/50 transition-all">
                        Q
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">Solo<span className="text-purple-400">-Q</span></span>
                </Link>

                {/* 2. Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-sm">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className={getLinkClass('/dashboard')}>대시보드</Link>
                            <Link to="/interview" className={getLinkClass('/interview')}>모의 면접</Link>
                            <Link to="/note" className={getLinkClass('/note')}>질문 노트</Link>
                            <Link to="/community" className={getLinkClass('/community')}>커뮤니티</Link>
                        </>
                    ) : (
                        <>
                            <a href="#features" className="text-slate-300 hover:text-white transition-colors">기능 소개</a>
                            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">이용 방법</a>
                            <Link to="/community" className={getLinkClass('/community')}>커뮤니티</Link>
                        </>
                    )}
                </div>

                {/* 3. CTA Button & User Profile */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                                    {user?.nickname ? user.nickname[0] : 'U'}
                                </div>
                                <span className="text-sm font-medium text-white">{user?.nickname}님</span>
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
                            <Link to="/auth/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                                로그인
                            </Link>
                            <Link to="/auth/signup" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                                무료로 시작하기 <ArrowRight size={16} strokeWidth={3} />
                            </Link>
                        </>
                    )}
                </div>

                {/* 4. Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 5. Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                                    {user?.nickname ? user.nickname[0] : 'U'}
                                </div>
                                <span className="font-bold text-white">{user?.nickname}님</span>
                            </div>
                            <Link to="/dashboard" className={getMobileLinkClass('/dashboard')} onClick={() => setIsMenuOpen(false)}>대시보드</Link>
                            <Link to="/interview" className={getMobileLinkClass('/interview')} onClick={() => setIsMenuOpen(false)}>모의 면접</Link>
                            <Link to="/note" className={getMobileLinkClass('/note')} onClick={() => setIsMenuOpen(false)}>질문 노트</Link>
                            <Link to="/community" className={getMobileLinkClass('/community')} onClick={() => setIsMenuOpen(false)}>커뮤니티</Link>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-red-400 text-left font-bold pt-2">로그아웃</button>
                        </>
                    ) : (
                        <>
                            <a href="#features" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>기능 소개</a>
                            <Link to="/community" className={getMobileLinkClass('/community')} onClick={() => setIsMenuOpen(false)}>커뮤니티</Link>
                            <div className="h-px bg-white/10 my-2"></div>
                            <Link to="/auth/login" className="text-slate-300 hover:text-white text-left" onClick={() => setIsMenuOpen(false)}>로그인</Link>
                            <Link to="/auth/signup" className="bg-white text-slate-950 px-5 py-3 rounded-xl font-bold text-sm text-center" onClick={() => setIsMenuOpen(false)}>무료로 시작하기</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { ArrowRight, Menu, X, User, LogOut } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로 정보 가져오기
    const { isLoggedIn, user, logout } = useAuthStore();

    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        if (confirm("정말 로그아웃 하시겠습니까?")) {
            logout();
            navigate('/');
        }
    };

    // ✅ 현재 경로와 링크 경로가 일치하는지 확인하여 클래스 반환
    const getLinkClass = (path) => {
        // 정확히 일치하거나, 해당 경로로 시작하는 경우 (하위 페이지 포함) 활성화
        const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

        return isActive
            ? "text-purple-400 font-bold transition-colors"  // 활성화 시 보라색 + 굵게
            : "text-slate-300 hover:text-white transition-colors"; // 비활성화 시 기본색
    };

    // ✅ 모바일용 링크 스타일 함수
    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
        return isActive ? "text-purple-400 font-bold" : "text-slate-300 hover:text-white";
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* 1. Logo */}
                <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/50 transition-all">
                        Q
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">Solo<span className="text-purple-400">-Q</span></span>
                </Link>

                {/* 2. Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-sm">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className={getLinkClass('/dashboard')}>대시보드</Link>
                            <Link to="/interview" className={getLinkClass('/interview')}>모의 면접</Link>
                            <Link to="/note" className={getLinkClass('/note')}>질문 노트</Link>
                            <Link to="/community" className={getLinkClass('/community')}>커뮤니티</Link>
                        </>
                    ) : (
                        <>
                            <a href="#features" className="text-slate-300 hover:text-white transition-colors">기능 소개</a>
                            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">이용 방법</a>
                            <Link to="/community" className={getLinkClass('/community')}>커뮤니티</Link>
                        </>
                    )}
                </div>

                {/* 3. CTA Button & User Profile */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                                    {user?.nickname ? user.nickname[0] : 'U'}
                                </div>
                                <span className="text-sm font-medium text-white">{user?.nickname}님</span>
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
                            <Link to="/auth/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                                로그인
                            </Link>
                            <Link to="/auth/signup" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                                무료로 시작하기 <ArrowRight size={16} strokeWidth={3} />
                            </Link>
                        </>
                    )}
                </div>

                {/* 4. Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 5. Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                                    {user?.nickname ? user.nickname[0] : 'U'}
                                </div>
                                <span className="font-bold text-white">{user?.nickname}님</span>
                            </div>
                            <Link to="/dashboard" className={getMobileLinkClass('/dashboard')} onClick={() => setIsMenuOpen(false)}>대시보드</Link>
                            <Link to="/interview" className={getMobileLinkClass('/interview')} onClick={() => setIsMenuOpen(false)}>모의 면접</Link>
                            <Link to="/note" className={getMobileLinkClass('/note')} onClick={() => setIsMenuOpen(false)}>질문 노트</Link>
                            <Link to="/community" className={getMobileLinkClass('/community')} onClick={() => setIsMenuOpen(false)}>커뮤니티</Link>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-red-400 text-left font-bold pt-2">로그아웃</button>
                        </>
                    ) : (
                        <>
                            <a href="#features" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>기능 소개</a>
                            <Link to="/community" className={getMobileLinkClass('/community')} onClick={() => setIsMenuOpen(false)}>커뮤니티</Link>
                            <div className="h-px bg-white/10 my-2"></div>
                            <Link to="/auth/login" className="text-slate-300 hover:text-white text-left" onClick={() => setIsMenuOpen(false)}>로그인</Link>
                            <Link to="/auth/signup" className="bg-white text-slate-950 px-5 py-3 rounded-xl font-bold text-sm text-center" onClick={() => setIsMenuOpen(false)}>무료로 시작하기</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;