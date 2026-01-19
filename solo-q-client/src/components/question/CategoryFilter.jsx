export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <>
      {/* 스크롤바 숨기기용 스타일 (Tailwind 플러그인이 없을 경우를 대비해 직접 주입) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((c) => {
          const active = value === c;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              // flex-shrink-0: 버튼이 찌그러지지 않음
              // whitespace-nowrap: 텍스트 줄바꿈 방지
              className={[
                'flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition',
                'border backdrop-blur-xl',
                active
                  ? 'border-violet-400/30 bg-violet-500/20 text-white shadow-[0_0_24px_rgba(124,58,237,0.20)]'
                  : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10',
              ].join(' ')}
            >
              {c === 'ALL' ? '전체' : c}
            </button>
          );
        })}
      </div>
    </>
  );
}
