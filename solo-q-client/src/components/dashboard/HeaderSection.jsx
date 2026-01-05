import React from 'react';
import { Flame, CheckCircle } from 'lucide-react';

const HeaderSection = () => {
    // 가짜 데이터 (나중에 백엔드 API로 교체될 부분)
    const userStats = {
        nickname: "솔로큐마스터",
        streak: 3,
        totalPractice: 12,
        weeklyGoal: 5,
        level: "Lv.3 답변 깎는 노인"
    };

    const progressPercent = (userStats.streak / userStats.weeklyGoal) * 100;

    return (
        <section className="pt-10 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                    <div>
                        <p className="text-slate-400 mb-1 flex items-center gap-2 text-sm font-medium">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                            {userStats.level}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            반가워요, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">{userStats.nickname}</span>님! 👋
                        </h1>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex gap-4">
                        <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <Flame size={20} fill="currentColor" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-bold uppercase">Streak</div>
                                <div className="text-xl font-bold text-white">{userStats.streak}일 연속</div>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-bold uppercase">Total</div>
                                <div className="text-xl font-bold text-white">{userStats.totalPractice}회 연습</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Goal Progress */}
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2 text-sm font-medium">
                        <span className="text-slate-400">이번 주 목표 달성률</span>
                        <span className="text-purple-300 font-bold">{Math.round(progressPercent)}% ({userStats.streak}/{userStats.weeklyGoal})</span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-4 p-1 border border-white/10 shadow-inner">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400 relative shadow-[0_0_15px_rgba(192,38,211,0.6)] transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderSection;