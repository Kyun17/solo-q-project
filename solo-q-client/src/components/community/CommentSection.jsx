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

function CommentSection({ postId }) {
    const queryClient = useQueryClient();

    // 🔹 임시 로그인 상태 (나중에 auth로 교체)
    const isLoggedIn = false;
    const myId = 1;

    const [content, setContent] = useState('');

    // 🔹 수정 상태
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');

    // 🔹 댓글 조회
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    // 🔹 댓글 작성
    const createMutation = useMutation({
        mutationFn: (payload) => createComment(postId, payload),
        onSuccess: () => {
            setContent('');
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
    });

    // 🔹 댓글 수정
    const updateMutation = useMutation({
        mutationFn: ({ commentId, content }) =>
            updateComment(commentId, { content }),
        onSuccess: () => {
            setEditingId(null);
            setEditContent('');
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
    });

    // 🔹 댓글 삭제
    const deleteMutation = useMutation({
        mutationFn: (commentId) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
                댓글 {comments.length}
            </h3>

            {/* 🔹 댓글 목록 */}
            <div className="space-y-3 mb-6">
                {comments.map((comment) => {
                    const isMine = isLoggedIn && comment.writerId === myId;
                    const isEditing = editingId === comment.commentId;

                    return (
                        <div
                            key={comment.commentId}
                            className="p-3 rounded-lg bg-slate-800/60"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">
                                    작성자 {comment.writerId}
                                </span>

                                {isMine && !isEditing && (
                                    <div className="flex gap-2 text-xs">
                                        <button
                                            className="text-slate-400 hover:text-white"
                                            onClick={() => {
                                                setEditingId(comment.commentId);
                                                setEditContent(comment.content);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
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
                    "
                                    />
                                    <Button
                                        onClick={() =>
                                            updateMutation.mutate({
                                                commentId: comment.commentId,
                                                content: editContent,
                                            })
                                        }
                                    >
                                        저장
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditContent('');
                                        }}
                                    >
                                        취소
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-200 mt-1">
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    );
                })}
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
            "
                    />
                    <Button
                        onClick={() => {
                            if (!content.trim()) return;
                            createMutation.mutate({ content });
                        }}
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
