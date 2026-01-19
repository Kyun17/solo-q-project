import { useMemo, useState } from 'react';

function CategoryBadge({ category }) {
  const style = useMemo(() => {
    switch (category) {
      case '인성':
        return 'bg-amber-500/15 text-amber-200 border-amber-400/20';
      case '기술':
        return 'bg-sky-500/15 text-sky-200 border-sky-400/20';
      case 'CS':
        return 'bg-emerald-500/15 text-emerald-200 border-emerald-400/20';
      case '협업':
        return 'bg-violet-500/15 text-violet-200 border-violet-400/20';
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
  const shortAnswer = answer.length > 50 ? answer.slice(0, 50) + '…' : answer; // 모바일 2열이라 글자수 제한 줄임

  return (
    <div
      className="flex flex-col h-full rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl
                 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]
                 hover:bg-white/[0.07] transition group"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
        <CategoryBadge category={item.category || '기타'} />

        {/* 모바일에서는 항상 보이거나 버튼을 작게 처리 */}
        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] md:text-xs font-medium text-zinc-300
                       hover:bg-white/10 hover:text-white transition"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(item.questionId)}
            className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] md:text-xs font-medium text-zinc-300
                       hover:bg-rose-500/20 hover:text-rose-400 transition"
          >
            삭제
          </button>
        </div>
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
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 inline-flex items-center gap-1 text-[10px] md:text-xs font-semibold text-zinc-400 hover:text-white transition"
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

      {/* Footer (date) - 모바일에서 공간 부족하면 숨김 */}
      <div className="hidden md:block mt-5 text-xs text-zinc-600 font-medium">
        등록일 {item.createdAt ? item.createdAt : '—'}
      </div>
    </div>
  );
}
