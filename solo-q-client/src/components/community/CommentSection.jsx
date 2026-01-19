import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, MessageSquare } from 'lucide-react'; // 아이콘 추가

import Button from '../common/Button';
import Loading from '../common/Loading';

import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from '../../api/communityApi';

import useAuthStore from '../../store/useAuthStore';

function CommentSection({ postId }) {
  const queryClient = useQueryClient();

  // 🔹 로그인
  const { isLoggedIn, user } = useAuthStore();
  const myId = user?.memberId ?? user?.id ?? null;

  const [content, setContent] = useState('');

  // 🔹 수정 상태
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // 🔹 댓글 조회
  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  // 🔹 댓글 작성
  const createMutation = useMutation({
    mutationFn: (payload) => createComment(postId, payload),
    onSuccess: async () => {
      setContent('');
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      await queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      alert('댓글 등록에 실패했습니다.');
    },
  });

  // 🔹 댓글 수정
  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment(commentId, { content }),
    onSuccess: async () => {
      setEditingId(null);
      setEditContent('');
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다.');
    },
  });

  // 🔹 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다.');
    },
  });

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (isLoading) return <Loading />;

  return (
    <div className="mt-8 md:mt-12 border-t border-white/10 pt-6 md:pt-8">
      {/* 헤더 */}
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white mb-6">
        <MessageSquare size={18} className="text-purple-400" />
        댓글 <span className="text-purple-400">{comments.length}</span>
      </h3>

      {isError && (
        <div className="text-sm text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg">
          댓글을 불러오지 못했습니다.
          <div className="mt-1 text-xs text-red-300 opacity-70">
            {String(error?.message ?? '')}
          </div>
        </div>
      )}

      {/* 🔹 댓글 목록 */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => {
          const isMine =
            isLoggedIn && myId && Number(comment.writerId) === Number(myId);
          const isEditing = editingId === comment.commentId;

          return (
            <div key={comment.commentId} className="group flex gap-3 md:gap-4">
              {/* 프로필 아이콘 (더미) */}
              <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-white/5">
                <User size={16} md:size={20} />
              </div>

              <div className="flex-1">
                {/* 작성자 및 메타 정보 */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm font-bold text-slate-200">
                      User {comment.writerId}
                    </span>
                    {/* 날짜가 있다면 여기에 추가 (예: <span className="text-[10px] text-slate-500">2분 전</span>) */}
                  </div>

                  {/* 수정/삭제 버튼 */}
                  {isMine && !isEditing && (
                    <div className="flex gap-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-white underline underline-offset-2"
                        onClick={() => {
                          setEditingId(comment.commentId);
                          setEditContent(comment.content);
                        }}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-rose-400 underline underline-offset-2"
                        onClick={() => {
                          if (window.confirm('댓글을 삭제할까요?')) {
                            deleteMutation.mutate(comment.commentId);
                          }
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                {/* 내용 또는 수정 폼 */}
                {isEditing ? (
                  <div className="mt-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditContent('');
                        }}
                        disabled={isMutating}
                      >
                        취소
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const v = editContent.trim();
                          if (!v) return alert('내용을 입력해주세요.');
                          updateMutation.mutate({
                            commentId: comment.commentId,
                            content: v,
                          });
                        }}
                        disabled={isMutating}
                      >
                        저장
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-slate-300 whitespace-pre-wrap leading-relaxed break-all">
                    {comment.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {comments.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-500 bg-slate-900/30 rounded-xl border border-white/5 border-dashed">
            아직 댓글이 없어요. <br />첫 댓글을 남겨보세요!
          </div>
        )}
      </div>

      {/* 🔹 댓글 입력창 */}
      {isLoggedIn ? (
        <div className="flex gap-2 md:gap-3 items-start">
          <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
            <User size={16} md:size={20} />
          </div>
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                rows={2}
                className="
                                    w-full rounded-xl px-4 py-3 text-sm md:text-base
                                    bg-slate-800/50 border border-white/10
                                    text-white placeholder-slate-500
                                    focus:outline-none focus:border-purple-500 focus:bg-slate-800
                                    focus:ring-1 focus:ring-purple-500/50
                                    transition-all resize-none
                                "
                disabled={isMutating}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={() => {
                    const v = content.trim();
                    if (!v) return;
                    createMutation.mutate({ content: v });
                  }}
                  disabled={isMutating || !content.trim()}
                  className="px-6"
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center rounded-xl bg-slate-800/40 border border-white/5">
          <p className="text-sm text-slate-400">
            댓글을 작성하려면{' '}
            <span className="text-purple-400 font-bold">로그인</span>해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
