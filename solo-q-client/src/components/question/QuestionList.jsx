import QuestionItem from "./QuestionItem";

export default function QuestionList({ loading, items, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[210px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                       shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
                      shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] text-zinc-300">
        아직 등록된 질문이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <QuestionItem
          key={item.questionId}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
