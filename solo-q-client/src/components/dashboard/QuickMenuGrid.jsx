import React, { useState, useRef } from 'react';
import {
  Video,
  BookOpen,
  Users,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickMenuGrid = ({ data }) => {
  const questionCount = data ? data.questionCount : 0;

  // 🔹 현재 스크롤 위치 상태 관리 (0, 1, 2)
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // 🔹 스크롤 감지 핸들러
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const clientWidth = scrollRef.current.clientWidth;
      // 현재 스크롤 위치를 기반으로 활성 인덱스 계산 (반올림)
      const newIndex = Math.round(scrollLeft / (clientWidth * 0.75));
      setActiveIndex(newIndex);
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        {/* 🔹 컨테이너 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 
                     overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide 
                     pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
          // 👆 -mx-6 px-6: 모바일에서 스크롤 영역을 화면 끝까지 확장하면서 패딩 유지
        >
          {/* Card 1: Interview */}
          <Link
            to="/interview"
            className="
              /* 🔹 w-[78vw]: 너비를 줄여서 다음 카드가 오른쪽에서 '빼꼼' 보이게 함 (Peekaboo 효과) */
              flex-shrink-0 w-[78vw] md:w-auto snap-center 
              block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl 
              hover:bg-slate-800/60 hover:border-purple-500/30 hover:-translate-y-1 transition-all 
              group relative overflow-hidden h-64 flex flex-col justify-between
            "
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-[40px] group-hover:bg-lime-400/20 transition-colors pointer-events-none"></div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-lime-400/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                실전 모의 면접
              </h3>
              <p className="text-slate-400 text-sm">
                랜덤 질문과 타이머로
                <br />
                실전 감각을 키워보세요.
              </p>
            </div>
            <div className="flex items-center text-lime-400 text-sm font-bold gap-2">
              바로 시작하기 <ArrowRight size={16} />
            </div>
          </Link>

          {/* Card 2: Note */}
          <Link
            to="/note"
            className="
              flex-shrink-0 w-[78vw] md:w-auto snap-center 
              block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl 
              hover:bg-slate-800/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all 
              group relative overflow-hidden h-64 flex flex-col justify-between
            "
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[40px] group-hover:bg-cyan-400/20 transition-colors pointer-events-none"></div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                내 질문 노트
              </h3>
              <p className="text-slate-400 text-sm">
                등록된 질문{' '}
                <span className="text-white font-bold">{questionCount}</span>개
              </p>
            </div>
            <div className="flex items-center text-cyan-400 text-sm font-bold gap-2">
              질문 관리하기 <ArrowRight size={16} />
            </div>
          </Link>

          {/* Card 3: Community */}
          <Link
            to="/community"
            className="
              flex-shrink-0 w-[78vw] md:w-auto snap-center 
              block bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl 
              hover:bg-slate-800/60 hover:border-pink-500/30 hover:-translate-y-1 transition-all 
              group relative overflow-hidden h-64 flex flex-col
            "
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-400/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded-md text-slate-400 border border-slate-700">
                HOT 🔥
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">커뮤니티</h3>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between text-sm group/item">
                <p className="text-slate-400 truncate w-40 md:w-48 group-hover/item:text-pink-300 transition-colors">
                  <span className="text-xs mr-2 border border-slate-700 rounded px-1 text-slate-500">
                    피드백
                  </span>
                  면접 1분 자기소개...
                </p>
                <span className="text-slate-600 text-xs flex items-center gap-1">
                  <MessageCircle size={12} /> 5
                </span>
              </div>
              <div className="flex items-center justify-between text-sm group/item">
                <p className="text-slate-400 truncate w-40 md:w-48 group-hover/item:text-pink-300 transition-colors">
                  <span className="text-xs mr-2 border border-slate-700 rounded px-1 text-slate-500">
                    스터디
                  </span>
                  강남 백엔드 스터디...
                </p>
                <span className="text-slate-600 text-xs flex items-center gap-1">
                  <MessageCircle size={12} /> 2
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 🔹 모바일 전용 페이지네이션 점 (Dots) */}
        <div className="flex md:hidden justify-center gap-2 mt-2">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-purple-500' : 'w-1.5 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickMenuGrid;
