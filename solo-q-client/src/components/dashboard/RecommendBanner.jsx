import React from 'react';
import { Tag, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendBanner = () => {
    // 가짜 데이터
    const todayQuestion = {
        category: "기술",
        content: "Java의 Garbage Collection(GC) 동작 원리에 대해 설명해주세요.",
        tags: ["Java", "Memory", "Backend"]
    };

    return (
        <div className="max-w-7xl mx-auto px-6 mb-10">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 border border-purple-500/30 group bg-slate-900">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] group-hover:bg-purple-600/30 transition-colors duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                                오늘의 추천 질문
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Tag size={14} /> {todayQuestion.category}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white">
                            "{todayQuestion.content}"
                        </h2>
                        <div className="flex gap-2">
                            {todayQuestion.tags.map(tag => (
                                <span key={tag} className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">#{tag}</span>
                            ))}
                        </div>
                    </div>
                    <Link to="/interview" className="shrink-0 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-transform active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10">
                        <Mic size={20} fill="currentColor" />
                        답변 연습하기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecommendBanner;