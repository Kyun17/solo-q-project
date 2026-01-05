import React from 'react';
import { Video, BookOpen, Users, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickMenuGrid = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-10">
            {/* Card 1: Interview */}
            <Link to="/interview" className="block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl hover:bg-slate-800/60 hover:border-purple-500/30 hover:-translate-y-1 transition-all group relative overflow-hidden h-64 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-[40px] group-hover:bg-lime-400/20 transition-colors pointer-events-none"></div>
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-lime-400/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Video size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">실전 모의 면접</h3>
                    <p className="text-slate-400 text-sm">랜덤 질문과 타이머로<br />실전 감각을 키워보세요.</p>
                </div>
                <div className="flex items-center text-lime-400 text-sm font-bold gap-2">
                    바로 시작하기 <ArrowRight size={16} />
                </div>
            </Link>

            {/* Card 2: Note */}
            <Link to="/note" className="block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl hover:bg-slate-800/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all group relative overflow-hidden h-64 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[40px] group-hover:bg-cyan-400/20 transition-colors pointer-events-none"></div>
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">내 질문 노트</h3>
                    <p className="text-slate-400 text-sm">등록된 질문 <span className="text-white font-bold">12</span>개</p>
                    <div className="mt-3 flex gap-1 h-1.5 rounded-full overflow-hidden bg-slate-700/50">
                        <div className="w-2/3 bg-cyan-500"></div>
                        <div className="w-1/3 bg-transparent"></div>
                    </div>
                </div>
                <div className="flex items-center text-cyan-400 text-sm font-bold gap-2">
                    질문 관리하기 <ArrowRight size={16} />
                </div>
            </Link>

            {/* Card 3: Community */}
            <Link to="/community" className="block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl hover:bg-slate-800/60 hover:border-pink-500/30 hover:-translate-y-1 transition-all group relative overflow-hidden h-64 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-400/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded-md text-slate-400 border border-slate-700">HOT 🔥</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">커뮤니티</h3>
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between text-sm group/item">
                        <p className="text-slate-400 truncate w-48 group-hover/item:text-pink-300 transition-colors">
                            <span className="text-xs mr-2 border border-slate-700 rounded px-1 text-slate-500">피드백</span>
                            면접 1분 자기소개...
                        </p>
                        <span className="text-slate-600 text-xs flex items-center gap-1">
                            <MessageCircle size={12} /> 5
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm group/item">
                        <p className="text-slate-400 truncate w-48 group-hover/item:text-pink-300 transition-colors">
                            <span className="text-xs mr-2 border border-slate-700 rounded px-1 text-slate-500">스터디</span>
                            강남 백엔드 스터디...
                        </p>
                        <span className="text-slate-600 text-xs flex items-center gap-1">
                            <MessageCircle size={12} /> 2
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default QuickMenuGrid;