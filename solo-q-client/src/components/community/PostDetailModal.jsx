import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchPostDetail, deletePost, fetchComments } from '../../api/communityApi';
import PostWriteModal from './PostWriteModal';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loading from '../common/Loading';

// 게시글 상세 조회 모달
function PostDetailModal({ postId, onClose }) {
    const queryClient = useQueryClient();
    const [isEditOpen, setIsEditOpen] = useState(false);

    // 🔹 임시 로그인 정보 (나중에 auth로 교체)
    const isLoggedIn = false; // 지금은 false
    const myId = 1;          // 로그인한 사용자 ID (임시)

    // 🔹 게시글 상세 조회
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostDetail(postId),
    });

    // 🔹 댓글 상세 조회
    const { data: commentsData, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
        enabled: !!postId,
    });

    const comments = commentsData?.content ?? commentsData ?? [];


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

    const {
        title,
        content,
        boardType,
        viewCount,
        timeAgo,
        createdAt,
        updatedAt,
        writerId,
    } = post;

    // 🔹 내가 쓴 글인지 여부
    const isMine = isLoggedIn && writerId === myId;

    const badgeStyle = {
        FEEDBACK: 'bg-purple-600/20 text-purple-400',
        STUDY: 'bg-lime-600/20 text-lime-400',
        FREE: 'bg-slate-600/20 text-slate-300',
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
                    <div className="mb-4">
                        {/* 🔹 타입 + 조회수 */}
                        <div className="flex items-center justify-between mb-2">
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyle[post.boardType]}`}
                            >
                                {badgeLabel[post.boardType]}
                            </span>

                            <span className="text-xs text-slate-400">
                                조회 {post.viewCount}
                            </span>
                        </div>

                        {/* 🔹 제목 */}
                        <h2 className="text-xl font-bold text-white mb-1">
                            {post.title}
                        </h2>

                        {/* 🔹 작성 시간 */}
                        <div className="text-xs text-slate-400">
                            작성 {post.timeAgo}
                            {post.updatedAt && <span> · 수정됨</span>}
                        </div>
                    </div>


                    {/* 🔹 Content */}
                    <div className="text-slate-200 leading-7 whitespace-pre-wrap mb-6">
                        {content}
                    </div>

                    {/* 🔹 Comments */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-white">댓글</h3>
                            <span className="text-xs text-slate-400">{comments.length}개</span>
                        </div>

                        {commentsLoading ? (
                            <div className="text-sm text-slate-400">불러오는 중...</div>
                        ) : comments.length === 0 ? (
                            <div className="text-sm text-slate-400">첫 댓글을 남겨보세요.</div>
                        ) : (
                            <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2">
                                {comments.map((c) => (
                                    <div key={c.commentId ?? c.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
                                        <div className="text-xs text-slate-400 mb-1">
                                            {c.writerNickname ?? '익명'} · {c.timeAgo ?? ''}
                                        </div>
                                        <div className="text-sm text-slate-200 whitespace-pre-wrap leading-6">
                                            {c.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* 🔹 Footer Buttons */}
                    <div className="flex justify-between">
                        <Button variant="ghost" onClick={onClose}>
                            닫기
                        </Button>

                        {isMine && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditOpen(true)}
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
