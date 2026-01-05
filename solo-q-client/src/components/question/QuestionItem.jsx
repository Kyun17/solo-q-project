import { useMemo, useState } from "react";

function CategoryBadge({ category }) {
  const style = useMemo(() => {
    switch (category) {
      case "인성":
        return "bg-amber-500/15 text-amber-200 border-amber-400/20";
      case "기술":
        return "bg-sky-500/15 text-sky-200 border-sky-400/20";
      case "CS":
        return "bg-emerald-500/15 text-emerald-200 border-emerald-400/20";
      case "협업":
        return "bg-violet-500/15 text-violet-200 border-violet-400/20";
      default:
        return "bg-white/10 text-zinc-200 border-white/15";
    }
  }, [category]);

  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {category}
    </span>
  );
}

export default function QuestionItem({ item, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const answer = item.answer || "";
  const shortAnswer = answer.length > 90 ? answer.slice(0, 90) + "…" : answer;

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl
                 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]
                 hover:bg-white/[0.07] transition"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        <CategoryBadge category={item.category || "기타"} />

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(item)}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-200
                       hover:bg-white/10 transition"
            title="수정"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(item.questionId)}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-200
                       hover:bg-rose-500/15 hover:border-rose-400/20 transition"
            title="삭제"
          >
            삭제
          </button>
        </div>
      </div>

      {/* Question */}
      <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-tight">
        {item.content}
      </h3>

      {/* Answer Preview */}
      <div className="mt-4 border-t border-white/10 pt-4">
        {answer ? (
          <>
            <div className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="mt-[2px] opacity-70">↳</span>
              <p className="leading-relaxed whitespace-pre-wrap">
                {expanded ? answer : shortAnswer}
              </p>
            </div>

            {answer.length > 90 ? (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200 transition"
              >
                {expanded ? "접기" : "더 보기"}
                <span className="translate-y-[1px]">{expanded ? "▴" : "▾"}</span>
              </button>
            ) : null}
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="opacity-70">ⓘ</span>
            아직 답변이 등록되지 않았습니다.
          </div>
        )}
      </div>

      {/* Footer (date) */}
      <div className="mt-5 text-xs text-zinc-500">
        등록일 {item.createdAt ? item.createdAt : "—"}
      </div>
    </div>
  );
}
