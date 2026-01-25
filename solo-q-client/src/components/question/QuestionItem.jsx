import { useMemo, useState } from 'react';

function CategoryBadge({ category }) {
  const style = useMemo(() => {
    switch (category) {
      case '인성':
        return 'bg-amber-500/15 text-amber-200 border-amber-400/20';
      case '기술':
        return 'bg-sky-500/15 text-sky-200 border-sky-400/20';
      default:
        return 'bg-white/10 text-zinc-200 border-white/15';
    }
  }, [category]);

  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs font-semibold ${style}`}
    >
      {category}
    </span>
  );
}

export default function QuestionItem({ item, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const answer = item.answer || '';
  const shortAnswer = answer.length > 50 ? answer.slice(0, 50) + '…' : answer;

  return (
    <div
      onClick={() => onEdit(item)} // ✅ 카드 전체 클릭 시 수정 모달 열기
      className="relative flex flex-col h-full rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl
                 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]
                 hover:bg-white/[0.07] hover:border-white/20 transition group cursor-pointer"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
        <CategoryBadge category={item.category || '기타'} />

        {/* 삭제 버튼: 클릭 시 카드 클릭 이벤트(수정)가 발생하지 않도록 stopPropagation 사용 */}
        {/* 모바일: 항상 보임 / 데스크탑: 호버 시 보임 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ⛔ 중요: 부모 클릭 이벤트 방지
            onDelete(item.questionId);
          }}
          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity
                     rounded-lg border border-white/10 bg-white/5 p-1.5 md:px-2.5 md:py-1.5 
                     text-[10px] md:text-xs font-medium text-zinc-400
                     hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 active:scale-95"
          title="삭제"
        >
          {/* 텍스트 대신 아이콘을 쓰거나, 그냥 '삭제' 텍스트 유지 */}
          <span className="md:hidden">🗑️</span>
          <span className="hidden md:inline">삭제</span>
        </button>
      </div>

      {/* Question */}
      <h3 className="text-sm md:text-xl font-bold leading-snug tracking-tight text-zinc-100 mb-3 line-clamp-2 md:line-clamp-none">
        {item.content}
      </h3>

      {/* Answer Preview */}
      <div className="flex-1 border-t border-white/10 pt-3 md:pt-4">
        {answer ? (
          <>
            <div className="flex items-start gap-1.5 text-xs md:text-sm text-zinc-300">
              <span className="mt-[2px] opacity-60 text-indigo-400">↳</span>
              <p className="leading-relaxed whitespace-pre-wrap break-all">
                {expanded ? answer : shortAnswer}
              </p>
            </div>

            {answer.length > 50 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // ⛔ 더보기 누를 때 수정 모달 뜨지 않게 방지
                  setExpanded((v) => !v);
                }}
                className="mt-2 inline-flex items-center gap-1 text-[10px] md:text-xs font-semibold text-zinc-400 hover:text-white transition p-1 -ml-1 rounded hover:bg-white/5"
              >
                {expanded ? '접기' : '더 보기'}
              </button>
            ) : null}
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-xs md:text-sm text-zinc-500 py-1">
            <span className="opacity-50">ⓘ</span>
            답변 미등록
          </div>
        )}
      </div>

      {/* Footer (date) */}
      <div className="hidden md:block mt-5 text-xs text-zinc-600 font-medium">
        등록일 {item.createdAt ? item.createdAt : '—'}
      </div>
    </div>
  );
}
