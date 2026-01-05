import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // 스크롤 시 배경색 변경 효과
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/50 transition-all">
                        Q
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">Solo<span className="text-purple-400">-Q</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-slate-300 text-sm">
                    <a href="#features" className="hover:text-white transition-colors">기능 소개</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">이용 방법</a>
                    <Link to="/community" className="hover:text-white transition-colors">커뮤니티</Link>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <Link to="/auth/login" className="hidden md:block text-slate-300 hover:text-white font-medium text-sm transition-colors">
                        로그인
                    </Link>
                    <Link to="/auth/signup" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        무료로 시작하기 <ArrowRight weight="bold" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;