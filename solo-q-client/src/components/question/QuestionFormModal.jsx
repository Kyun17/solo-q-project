import { useEffect, useState } from "react";
import { createQuestion, updateQuestion } from "../../api/questionApi";

const CATEGORIES = ["인성", "기술", "CS", "협업", "기타"];

export default function QuestionFormModal({ open, onClose, onSaved, initialValue }) {
  const isEdit = !!initialValue;

  const [category, setCategory] = useState("인성");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (initialValue) {
      setCategory(initialValue.category || "인성");
      setContent(initialValue.content || "");
      setAnswer(initialValue.answer || "");
      setTags(initialValue.tags || "");
    } else {
      setCategory("인성");
      setContent("");
      setAnswer("");
      setTags("");
    }
    setError("");
  }, [open, initialValue]);

  const validate = () => {
    if (!category) return "카테고리를 선택해주세요.";
    if (!content.trim()) return "질문 내용을 입력해주세요.";
    if ((tags || "").length > 255) return "태그는 255자를 넘을 수 없어요.";
    return "";
  };

  const onSubmit = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = {
        category,
        content: content.trim(),
        answer: answer.trim() ? answer : null,
        tags: tags.trim() ? tags : null,
      };

      if (isEdit) {
        await updateQuestion(initialValue.questionId, payload);
      } else {
        await createQuestion(payload);
      }

      await onSaved();
    } catch (e) {
      setError(e?.response?.data?.message || "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={saving ? undefined : onClose}
      />

      {/* modal */}
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6
                   shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">
              {isEdit ? "질문 수정" : "질문 등록"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              카테고리/태그를 붙이면 나중에 검색이 쉬워져요.
            </p>
          </div>

          <button
            onClick={saving ? undefined : onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10 transition"
          >
            닫기
          </button>
        </div>

        <div className="mt-5 h-px bg-white/10" />

        {/* category */}
        <div className="mt-5">
          <div className="text-xs font-semibold text-zinc-400">카테고리</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition border",
                    active
                      ? "border-violet-400/30 bg-violet-500/20 text-white shadow-[0_0_24px_rgba(124,58,237,0.20)]"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* fields */}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-zinc-400">질문</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="예) 1분 자기소개를 해주세요."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none
                         focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/15"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-zinc-400">답변 (선택)</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              placeholder="예) 안녕하십니까, 백엔드 개발자 지원자 ..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none
                         focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/15"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-zinc-400">태그 (선택)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="예) java, spring, cs"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none
                         focus:border-white/20 focus:ring-2 focus:ring-white/10"
            />
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {/* actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={saving ? undefined : onClose}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-200
                       hover:bg-white/10 transition"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            disabled={saving}
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-extrabold text-zinc-950
                       disabled:opacity-60 hover:bg-zinc-100 active:scale-[0.99] transition"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
