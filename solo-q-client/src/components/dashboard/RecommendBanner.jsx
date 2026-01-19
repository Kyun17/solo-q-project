import React from 'react';
import { Tag, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendBanner = ({ data }) => {
  // 데이터 존재 여부 확인
  const hasData = !!data;

  // data가 없으면 보여줄 기본 메시지 설정
  const question = data || {
    category: '안내',
    content: '아직 생성된 질문이 없습니다.',
    tags: [],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-10">
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 border border-purple-500/30 group bg-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  hasData
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }`}
              >
                {hasData ? '오늘의 추천 질문' : '알림'}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Tag size={14} /> {question.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white">
              "{question.content}"
            </h2>
            <div className="flex gap-2">
              {question.tags.length > 0 ? (
                question.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                // 태그가 없을 때 빈 공간 차지 방지 혹은 안내 멘트
                <span className="text-xs text-slate-600">
                  질문을 먼저 생성해주세요.
                </span>
              )}
            </div>
          </div>

          {/* 데이터가 있을 때만 링크 활성화, 없으면 비활성화된 버튼 표시 */}
          {hasData ? (
            <Link
              to="/interview"
              className="shrink-0 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-transform active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10"
            >
              <Mic size={20} fill="currentColor" />
              답변 연습하기
            </Link>
          ) : (
            <div className="shrink-0 bg-slate-800 text-slate-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed flex items-center gap-2 border border-slate-700">
              <Mic size={20} />
              질문 없음
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendBanner;
