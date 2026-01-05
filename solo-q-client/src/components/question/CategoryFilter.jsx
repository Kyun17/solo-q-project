export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              "border backdrop-blur-xl",
              active
                ? "border-violet-400/30 bg-violet-500/20 text-white shadow-[0_0_24px_rgba(124,58,237,0.20)]"
                : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
            ].join(" ")}
          >
            {c === "ALL" ? "전체" : c}
          </button>
        );
      })}
    </div>
  );
}
