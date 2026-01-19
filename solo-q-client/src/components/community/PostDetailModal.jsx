import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  fetchPostDetail,
  deletePost,
  fetchComments,
} from '../../api/communityApi';
import PostWriteModal from './PostWriteModal';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import CommentSection from './CommentSection';

import useAuthStore from '../../store/useAuthStore';

// 게시글 상세 조회 모달
function PostDetailModal({ postId, onClose }) {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔹 로그인 정보
  const { isLoggedIn, user } = useAuthStore();
  const myId = user?.memberId;

  // 🔹 게시글 상세 조회
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostDetail(postId),
  });

  // 🔹 댓글 상세 조회 (댓글 컴포넌트 내부에서 처리해도 되지만 여기서 조회해서 내려주는 구조인 경우)
  const { data: commentsData } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  // 🔹 게시글 삭제 (회원만, 권한 체크는 백에서)
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
    },
  });

  if (isLoading) {
    return (
      <Modal onClose={onClose}>
        <Loading />
      </Modal>
    );
  }

  if (isError || !post) {
    return (
      <Modal onClose={onClose}>
        <div className="text-red-400">존재하지 않는 게시글입니다.</div>
      </Modal>
    );
  }

  const { content, writerId } = post;

  // 본인 작성 여부 확인
  const isMine =
    isLoggedIn && myId != null && Number(writerId) === Number(myId);

  const badgeStyle = {
    FEEDBACK: 'bg-purple-600/20 text-purple-400 border border-purple-500/30',
    STUDY: 'bg-lime-600/20 text-lime-400 border border-lime-500/30',
    FREE: 'bg-slate-600/20 text-slate-300 border border-slate-500/30',
  };

  const badgeLabel = {
    FEEDBACK: '피드백',
    STUDY: '스터디',
    FREE: '자유',
  };

  return (
    <>
      {/* 🔹 게시글 상세 모달 */}
      <Modal onClose={onClose}>
        <div className="max-w-2xl w-full">
          {/* 🔹 Header */}
          <div className="mb-4 md:mb-6 border-b border-white/5 pb-4 md:pb-6">
            {/* 🔹 타입 + 조회수 + 시간 */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span
                className={`text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full ${
                  badgeStyle[post.boardType]
                }`}
              >
                {badgeLabel[post.boardType]}
              </span>

              <div className="flex items-center gap-3 text-[10px] md:text-xs text-slate-400">
                <span>{post.timeAgo}</span>
                <span className="w-0.5 h-2 bg-slate-700"></span>
                <span>조회 {post.viewCount}</span>
              </div>
            </div>

            {/* 🔹 제목 */}
            <h2 className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight">
              {post.title}
            </h2>

            {/* 🔹 작성자 / 수정여부 */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
              <span>작성자</span> {/* 필요시 닉네임 표시 */}
              {post.updatedAt && (
                <span className="text-slate-500">(수정됨)</span>
              )}
            </div>
          </div>

          {/* 🔹 Content */}
          <div className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-wrap mb-8 md:mb-10 min-h-[100px]">
            {content}
          </div>

          {/* 🔹 Comments */}
          <CommentSection postId={postId} />

          {/* 🔹 Footer Buttons */}
          <div className="flex justify-between items-center mt-6 md:mt-8 pt-4 border-t border-white/5">
            <Button variant="ghost" onClick={onClose} className="text-sm">
              닫기
            </Button>

            {isMine && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditOpen(true)}
                  className="text-sm"
                >
                  수정
                </Button>

                <Button
                  variant="danger"
                  disabled={deleteMutation.isPending}
                  onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      deleteMutation.mutate();
                    }
                  }}
                  className="text-sm"
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* 🔹 수정 모달 (형제 위치!) */}
      {isEditOpen && (
        <PostWriteModal
          mode="edit"
          postId={postId}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
}

export default PostDetailModal;
