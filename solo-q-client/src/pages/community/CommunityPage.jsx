import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from '../../components/common/Navbar';
import { fetchPosts } from '../../api/communityApi';

import PostList from '../../components/community/PostList';
import PostWriteModal from '../../components/community/PostWriteModal';
import PostDetailModal from '../../components/community/PostDetailModal';

import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

// 커뮤니티 메인 페이지
function CommunityPage() {
  // 🔹 상태
  const [tab, setTab] = useState('ALL'); // FEEDBACK | STUDY | FREE | ALL
  const [keyword, setKeyword] = useState('');
  const [uiPage, setUiPage] = useState(1); // UI는 1부터
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const navigate = useNavigate();
  const { postId } = useParams();

  const selectedPostId = postId ? Number(postId) : null;

  useEffect(() => {
    const t = setTimeout(() => {
      setUiPage(1); // ✅ 검색 바뀌면 첫 페이지로
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(t);
  }, [keyword]);

  // 🔹 임시 로그인 상태
  const isLoggedIn = !!localStorage.getItem('token');

  // 🔹 서버 page는 0부터
  const page = uiPage - 1;
  const size = 6;

  // 🔹 게시글 목록 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', tab, page, debouncedKeyword],
    queryFn: () => {
      const params = { page, size };

      // ✅ 빈 문자열이면 keyword 자체를 보내지 않음
      const k = debouncedKeyword?.trim();
      if (k) params.keyword = k;

      return fetchPosts(params);
    },
    keepPreviousData: true,
  });

  // 🔹 이벤트 핸들러
  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    setUiPage(1);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-red-400">게시글을 불러오지 못했습니다.</div>;

  const { content = [], totalPages = 0 } = data ?? {};
  const safeTotalPages = Math.max(1, totalPages);

  // 🔹 탭에 따른 프론트 필터링
  const filteredPosts =
    tab === 'ALL' ? content : content.filter((post) => post.boardType === tab);

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-white">
      {/* ✅ 상단 네비게이션 */}
      <Navbar />

      {/* ✅ 컨텐츠 영역 (Navbar 높이만큼 패딩) */}
      <div className="pt-20 md:pt-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* 🔹 상단 헤더 */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">커뮤니티</h1>

            {/* 모바일: 세로 배치, 데스크탑: 가로 배치 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <h6 className="text-slate-300 text-sm md:text-base leading-relaxed break-keep max-w-2xl">
                혼자 준비하기 막막하셨나요?
                <br className="hidden md:block" />
                다른 취준생들과 답변을 공유하고, 함께 성장할 스터디원을
                찾아보세요.
              </h6>

              {isLoggedIn && (
                <div className="w-full md:w-auto flex justify-end">
                  <Button onClick={() => setIsWriteOpen(true)}>글쓰기</Button>
                </div>
              )}
            </div>
          </div>

          {/* 🔹 탭 + 검색 */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 mb-6">
            {/* 탭 버튼들: 모바일에서는 줄바꿈 허용(flex-wrap) */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'FEEDBACK', 'STUDY', 'FREE'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTab(type);
                    setUiPage(1);
                  }}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap
                                    ${
                                      tab === type
                                        ? 'bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/50'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                >
                  {type === 'ALL'
                    ? '전체'
                    : type === 'FEEDBACK'
                      ? '피드백 요청'
                      : type === 'STUDY'
                        ? '스터디 모집'
                        : '자유게시판'}
                </button>
              ))}
            </div>

            {/* 검색창: 모바일에서 100% 너비 */}
            <div className="w-full md:max-w-[400px]">
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="키워드로 검색 (ex. Spring, 면접후기)"
              />
            </div>
          </div>

          {/* 🔹 게시글 리스트 */}
          <PostList
            posts={filteredPosts}
            onClickPost={(postId) => navigate(`/community/${postId}`)}
          />

          {/* 🔹 페이지네이션 */}
          <div className="flex justify-center mt-10">
            {/* 모바일에서 숫자가 많으면 줄바꿈 되도록 flex-wrap 추가 */}
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
              {/* ◀ 이전 */}
              <button
                type="button"
                disabled={uiPage <= 1}
                onClick={() => setUiPage((p) => Math.max(p - 1, 1))}
                className={`
                                    h-9 w-9 md:h-10 md:w-10 rounded-xl border border-white/10 bg-white/5
                                    flex items-center justify-center text-slate-300
                                    hover:bg-white/10 transition
                                    ${
                                      uiPage <= 1
                                        ? 'opacity-40 cursor-not-allowed hover:bg-white/5'
                                        : ''
                                    }
                                `}
              >
                ‹
              </button>

              {/* 🔢 페이지 숫자 */}
              {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map(
                (num) => {
                  const active = num === uiPage;

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setUiPage(num)}
                      className={`
                                            h-9 w-9 md:h-10 md:w-10 rounded-xl
                                            flex items-center justify-center text-xs md:text-sm font-semibold
                                            transition
                                            ${
                                              active
                                                ? 'bg-purple-600 text-white shadow-[0_0_18px_rgba(147,51,234,0.55)]'
                                                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                                            }
                                        `}
                    >
                      {num}
                    </button>
                  );
                },
              )}

              {/* ▶ 다음 */}
              <button
                type="button"
                disabled={uiPage >= safeTotalPages}
                onClick={() =>
                  setUiPage((p) => Math.min(p + 1, safeTotalPages))
                }
                className={`
                                    h-9 w-9 md:h-10 md:w-10 rounded-xl border border-white/10 bg-white/5
                                    flex items-center justify-center text-slate-300
                                    hover:bg-white/10 transition
                                    ${
                                      uiPage >= safeTotalPages
                                        ? 'opacity-40 cursor-not-allowed hover:bg-white/5'
                                        : ''
                                    }
                                `}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <div className="text-center text-slate-600 text-sm py-8 border-t border-white/5 mx-6">
        <p>© 2025 HITORI. All rights reserved.</p>
      </div>

      {/* 🔹 모달들 */}
      {isWriteOpen && <PostWriteModal onClose={() => setIsWriteOpen(false)} />}

      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={() => navigate('/community')}
        />
      )}
    </div>
  );
}

export default CommunityPage;
