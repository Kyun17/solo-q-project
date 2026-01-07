import { useEffect, useMemo, useState } from "react";
import { fetchQuestions, deleteQuestion } from "../../api/questionApi";

import CategoryFilter from "../../components/question/CategoryFilter";
import QuestionList from "../../components/question/QuestionList";
import QuestionFormModal from "../../components/question/QuestionFormModal";
import QuestionHeader from "../../components/common/QuestionHeader";
import Navbar from "../../components/common/Navbar";

const CATEGORIES = ["ALL", "인성", "기술", "CS", "협업", "기타"];

export default function QuestionNotePage() {
  const [category, setCategory] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(0);
  const size = 9;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const totalPages = useMemo(() => data?.totalPages ?? 1, [data]);

  const load = async (nextPage = page) => {
    setLoading(true);
    try {
      const res = await fetchQuestions({
        category,
        q: keyword,
        tag,
        page: nextPage,
        size,
      });
      setData(res);
    } catch (e) {
      alert(e?.response?.data?.message || "질문 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onSearch = async (e) => {
    e.preventDefault();
    setPage(0);
    await load(0);
  };

  const openCreate = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setModalOpen(true);
  };

  const onModalSaved = async () => {
    setModalOpen(false);
    await load(page);
  };

  const onDelete = async (questionId) => {
    if (!confirm("정말 삭제할까요?")) return;
    try {
      await deleteQuestion(questionId);
      if ((data?.items?.length || 0) === 1 && page > 0) {
        const prev = page - 1;
        setPage(prev);
        await load(prev);
      } else {
        await load(page);
      }
    } catch (e) {
      alert(e?.response?.data?.message || "삭제 실패");
    }
  };

  const goPage = async (next) => {
    const safe = Math.max(0, Math.min(next, totalPages - 1));
    setPage(safe);
    await load(safe);
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen text-zinc-100">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-[#070A14]" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(124,58,237,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_10%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(700px_circle_at_50%_120%,rgba(16,185,129,0.12),transparent_50%)]" />

        {/* ✅ 상단 유저 요약 헤더 */}


        {/* ✅ 메인 콘텐츠 */}
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Title + CTA */}
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight">
                내 질문 노트 <span className="text-lg opacity-90">📝</span>
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                면접 예상 질문을 정리하고 답변을 다듬어보세요.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950
                       shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                       hover:bg-zinc-100 active:scale-[0.99] transition"
            >
              <span className="text-lg leading-none">＋</span>
              질문 추가하기
            </button>
          </div>

          {/* Filter + Search */}
          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CategoryFilter
              categories={CATEGORIES}
              value={category}
              onChange={setCategory}
            />

            <form onSubmit={onSearch} className="w-full lg:w-[380px]">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl">
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="질문 또는 답변 검색..."
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                />
              </div>
            </form>
          </div>

          {/* Question List */}
          <div className="mt-8">
            <QuestionList
              loading={loading}
              items={data?.items || []}
              onEdit={openEdit}
              onDelete={onDelete}
            />
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => goPage(page - 1)}
              disabled={page <= 0}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm
                       disabled:opacity-40 hover:bg-white/10 transition"
            >
              이전
            </button>
            <div className="px-3 text-sm text-zinc-400">
              {data ? `${data.page + 1} / ${data.totalPages || 1}` : "—"}
            </div>
            <button
              onClick={() => goPage(page + 1)}
              disabled={data ? data.last : true}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm
                       disabled:opacity-40 hover:bg-white/10 transition"
            >
              다음
            </button>
          </div>
        </div>

        {/* Modal */}
        <QuestionFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={onModalSaved}
          initialValue={editTarget}
        />
      </div>
    </>

  );
}
