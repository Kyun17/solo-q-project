import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PartyPopper, Home, Download, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar'; // 경로 확인 필요

const InterviewResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // ActivePage에서 넘겨준 결과 데이터 및 영상 URL 받기
    const result = location.state?.result || {
        totalSeconds: 0,
        questionCount: 0
    };

    // ✅ 녹화된 비디오 URL
    const recordedVideoUrl = location.state?.recordedVideoUrl;

    // 초(Seconds)를 "00:00" 형식으로 변환
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}분 ${secs}초`;
    };

    // 📥 다운로드 핸들러
    const handleDownload = () => {
        if (!recordedVideoUrl) {
            alert("다운로드할 영상이 없습니다.");
            return;
        }

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = recordedVideoUrl;
        a.download = `my_interview_${new Date().getTime()}.webm`; // 파일명 설정
        document.body.appendChild(a);
        a.click();

        // 클린업
        setTimeout(() => {
            document.body.removeChild(a);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-600 selection:text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10 text-center">
                {/* 축하 아이콘 애니메이션 */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-bounce">
                    <PartyPopper size={56} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    면접이 종료되었습니다!
                </h1>

                <p className="text-slate-400 mb-10 max-w-md text-lg leading-relaxed">
                    고생하셨습니다. 👏<br />
                    녹화된 영상을 다운로드하여 확인해보세요.
                </p>

                {/* 결과 요약 카드 */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
                    <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                            <Clock size={20} />
                        </div>
                        <span className="text-slate-400 text-sm mb-1">총 소요 시간</span>
                        <span className="text-2xl font-bold">{formatTime(result.totalSeconds)}</span>
                    </div>
                    <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                            <CheckCircle size={20} />
                        </div>
                        <span className="text-slate-400 text-sm mb-1">연습한 질문</span>
                        <span className="text-2xl font-bold">{result.questionCount}개</span>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="grid w-full max-w-md gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 group"
                    >
                        <Home size={20} className="group-hover:scale-110 transition-transform" />
                        대시보드로 이동
                    </button>

                    {/* ✅ 영상 다운로드 버튼으로 변경됨 */}
                    <button
                        onClick={handleDownload}
                        disabled={!recordedVideoUrl}
                        className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg
                            ${recordedVideoUrl
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/25 hover:scale-[1.02]'
                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                    >
                        <Download size={20} className={recordedVideoUrl ? "group-hover:scale-110 transition-transform" : ""} />
                        {recordedVideoUrl ? "면접 영상 다운로드 (.webm)" : "영상 처리 중..."}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewResultPage;