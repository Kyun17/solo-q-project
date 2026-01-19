import QuestionItem from './QuestionItem';

export default function QuestionList({ loading, items, onEdit, onDelete }) {
  // 🔹 그리드 레이아웃 스타일 수정
  // 모바일: 2열 (gap-3) -> 한 화면에 더 많이 보임!
  // 태블릿: 2열 (gap-5)
  // 데스크탑: 3열 (gap-6)
  const gridClasses =
    'grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6';

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[180px] md:h-[220px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                       shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 md:py-24 
                      rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm
                      text-center border-dashed"
      >
        <div className="text-4xl mb-4 opacity-50">📭</div>
        <p className="text-zinc-400 font-medium mb-1">
          등록된 질문이 없습니다.
        </p>
        <p className="text-zinc-600 text-sm">
          새로운 질문을 추가하고 답변을 연습해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
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
