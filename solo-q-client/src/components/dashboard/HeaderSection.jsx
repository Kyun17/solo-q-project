import React from 'react';
import { Flame, CheckCircle, TrendingUp } from 'lucide-react';

const HeaderSection = ({ data }) => {
    // 데이터 로딩 중이거나 없을 때를 위한 기본값
    const stats = data || {
        nickname: "사용자",
        level: 1,
        totalPractice: 0,
        currentExp: 0,
        maxExp: 5
    };

    const expPercent = stats.maxExp > 0 ? (stats.currentExp / stats.maxExp) * 100 : 0;

    return (
        <section className="pt-10 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                    <div>
                        <p className="text-slate-400 mb-1 flex items-center gap-2 text-sm font-medium">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                            Lv.{stats.level} 답변 깎는 노인
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            반가워요, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">{stats.nickname}</span>님! 👋
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <Flame size={20} fill="currentColor" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-bold uppercase">Streak</div>
                                <div className="text-xl font-bold text-white">3일 연속</div>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-bold uppercase">Total</div>
                                <div className="text-xl font-bold text-white">{stats.totalPractice}회</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 레벨업 경험치 바 */}
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2 text-sm font-medium">
                        <div className="flex items-center gap-2 text-slate-300">
                            <TrendingUp size={16} className="text-lime-400" />
                            <span>다음 레벨업까지</span>
                        </div>
                        <span className="text-lime-400 font-bold">
                            {stats.currentExp} / {stats.maxExp} XP ({Math.round(expPercent)}%)
                        </span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-4 p-1 border border-white/10 shadow-inner">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-lime-500 to-green-400 relative shadow-[0_0_15px_rgba(132,204,22,0.4)] transition-all duration-1000 ease-out"
                            style={{ width: `${expPercent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderSection;