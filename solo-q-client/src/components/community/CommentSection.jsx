import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    const { data: comments = [], isLoading } = useQuery({
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
        createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    if (isLoading) return <Loading />;

    return (
        <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
                댓글 {comments.length}
            </h3>

            {isError && (
                <div className="text-sm text-red-400 mb-4">
                    댓글을 불러오지 못했습니다.
                </div>
            )}

            {/* 🔹 댓글 목록 */}
            <div className="space-y-3 mb-6">
                {comments.map((comment) => {
                    // ✅ 내 댓글 판별 (숫자/문자 섞여도 안전)
                    const isMine =
                        isLoggedIn && myId && Number(comment.writerId) === Number(myId);

                    const isEditing = editingId === comment.commentId;

                    return (
                        <div
                            key={comment.commentId}
                            className="p-3 rounded-lg bg-slate-800/60 border border-white/5"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">
                                    작성자 {comment.writerId}
                                </span>

                                {/* ✅ CHANGED: 내 댓글이면 수정/삭제 */}
                                {isMine && !isEditing && (
                                    <div className="flex gap-2 text-xs">
                                        <button
                                            type="button"
                                            className="text-slate-400 hover:text-white"
                                            onClick={() => {
                                                setEditingId(comment.commentId);
                                                setEditContent(comment.content);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            className="text-red-400 hover:text-red-300"
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

                            {/* 🔹 내용 / 수정 input */}
                            {isEditing ? (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="
                      flex-1 rounded-lg px-3 py-2 text-sm
                      bg-white/5 border border-white/10
                      text-white
                      focus:outline-none focus:border-purple-500
                    "
                                    />
                                    <Button
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
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditContent('');
                                        }}
                                        disabled={isMutating}
                                    >
                                        취소
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-200 mt-1 whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    );
                })}

                {comments.length === 0 && (
                    <div className="text-sm text-slate-500">
                        아직 댓글이 없어요. 첫 댓글을 남겨보세요!
                    </div>
                )}
            </div>

            {/* 🔹 댓글 입력 */}
            {isLoggedIn ? (
                <div className="flex gap-2">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        className="
              flex-1 rounded-lg px-3 py-2 text-sm
              bg-white/5 border border-white/10
              text-white placeholder-slate-400
              focus:outline-none focus:border-purple-500
            "
                        disabled={isMutating}
                    />
                    <Button
                        onClick={() => {
                            const v = content.trim();
                            if (!v) return;
                            createMutation.mutate({ content: v });
                        }}
                        disabled={isMutating}
                    >
                        등록
                    </Button>
                </div>
            ) : (
                <div className="text-sm text-slate-400">
                    댓글을 작성하려면 로그인해주세요.
                </div>
            )}
        </div>
    );
}


export default CommentSection;
