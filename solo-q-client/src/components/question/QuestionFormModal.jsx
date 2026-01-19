import { useEffect, useState } from 'react';
import { createQuestion, updateQuestion } from '../../api/questionApi';

const CATEGORIES = ['인성', '기술', 'CS', '협업', '기타'];

export default function QuestionFormModal({
  open,
  onClose,
  onSaved,
  initialValue,
}) {
  const isEdit = !!initialValue;

  const [category, setCategory] = useState('인성');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    if (initialValue) {
      setCategory(initialValue.category || '인성');
      setContent(initialValue.content || '');
      setAnswer(initialValue.answer || '');
      setTags(initialValue.tags || '');
    } else {
      setCategory('인성');
      setContent('');
      setAnswer('');
      setTags('');
    }
    setError('');
  }, [open, initialValue]);

  const validate = () => {
    if (!category) return '카테고리를 선택해주세요.';
    if (!content.trim()) return '질문 내용을 입력해주세요.';
    if ((tags || '').length > 255) return '태그는 255자를 넘을 수 없어요.';
    return '';
  };

  const onSubmit = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSaving(true);
    setError('');
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
      setError(e?.response?.data?.message || '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    // z-index 높게 설정
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center md:px-4">
      {/* overlay: 배경 클릭시 닫기 */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={saving ? undefined : onClose}
      />

      {/* modal container */}
      {/* 모바일: 밑에서 올라오는 꽉 찬 팝업 (rounded-t-3xl) */}
      {/* 데스크탑: 중앙 정렬 팝업 (rounded-3xl) */}
      <div
        className="relative w-full h-[95vh] md:h-auto md:max-h-[90vh] max-w-3xl 
                   rounded-t-3xl md:rounded-3xl border border-white/10 bg-[#0f111a] md:bg-[#12141f] 
                   shadow-2xl overflow-y-auto scrollbar-hide"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                {isEdit ? '질문 수정' : '질문 등록'}
              </h2>
              <p className="mt-1 text-sm text-zinc-400 break-keep">
                면접 질문과 답변을 기록하고 관리하세요.
              </p>
            </div>

            <button
              onClick={saving ? undefined : onClose}
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 transition"
            >
              닫기
            </button>
          </div>

          <div className="h-px w-full bg-white/10 mb-6" />

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-zinc-300 mb-3">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={[
                      'rounded-full px-4 py-2.5 text-sm font-semibold transition border',
                      active
                        ? 'border-violet-400/30 bg-violet-600/20 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200',
                    ].join(' ')}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-6">
            {/* 질문 입력 */}
            <div>
              <label className="block text-sm font-bold text-zinc-300 mb-2">
                질문 <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="예) 1분 자기소개를 해주세요."
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-zinc-100 placeholder:text-zinc-600 
                           outline-none focus:border-violet-500/50 focus:bg-black/80 focus:ring-1 focus:ring-violet-500/30 transition"
              />
            </div>

            {/* 답변 입력 */}
            <div>
              <label className="block text-sm font-bold text-zinc-300 mb-2">
                답변 메모{' '}
                <span className="text-xs font-normal text-zinc-500">
                  (선택)
                </span>
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                placeholder="답변의 핵심 키워드나 전체 스크립트를 적어보세요."
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-zinc-100 placeholder:text-zinc-600 
                           outline-none focus:border-emerald-500/50 focus:bg-black/80 focus:ring-1 focus:ring-emerald-500/30 transition"
              />
            </div>

            {/* 태그 입력 */}
            <div>
              <label className="block text-sm font-bold text-zinc-300 mb-2">
                태그{' '}
                <span className="text-xs font-normal text-zinc-500">
                  (선택)
                </span>
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="#java #spring #인성"
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-3.5 text-base text-zinc-100 placeholder:text-zinc-600 
                           outline-none focus:border-white/30 focus:bg-black/80 transition"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 text-center animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={saving ? undefined : onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-base font-semibold text-zinc-300 hover:bg-white/10 transition"
            >
              취소
            </button>
            <button
              onClick={onSubmit}
              disabled={saving}
              className="flex-[2] rounded-xl bg-white py-3.5 text-base font-bold text-zinc-950
                         shadow-[0_0_20px_rgba(255,255,255,0.15)]
                         disabled:opacity-60 hover:bg-zinc-100 active:scale-[0.98] transition"
            >
              {saving ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
