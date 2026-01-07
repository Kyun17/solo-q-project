import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Modal from '../common/Modal';
import Loading from '../common/Loading';
import Button from '../common/Button';
import Input from '../common/Input';

import { createPost, fetchPostDetail, updatePost } from '../../api/communityApi';

/**
 * PostWriteModal
 *
 * props
 * - mode: 'create' | 'edit'
 * - postId?: number (edit일 때만)
 * - onClose: () => void
 */
function PostWriteModal({ mode = 'create', postId, onClose }) {
    const isEdit = mode === 'edit';
    const queryClient = useQueryClient();

    // 폼 상태
    const [title, setTitle] = useState('');
    const [boardType, setBoardType] = useState('FEEDBACK');
    const [content, setContent] = useState('');

    // 수정 모드일 때 기존 글 조회
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostDetail(postId),
        enabled: isEdit && Number.isFinite(postId),
    });

    // 기존 데이터 세팅
    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title ?? '');
            setBoardType(post.boardType);
            setContent(post.content ?? '');
        }
    }, [isEdit, post]);

    // 작성
    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            onClose();
        },
        onError: () => {
            alert('게시글 등록에 실패했습니다.');
        },
    });

    // 수정
    const updateMutation = useMutation({
        mutationFn: (payload) => updatePost(postId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            onClose();
        },
        onError: () => {
            alert('게시글 수정에 실패했습니다.');
        },
    });

    // 제출
    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용은 필수입니다.');
            return;
        }

        const payload = {
            title: title.trim(),
            boardType,
            content: content.trim(),
        };

        if (isEdit) updateMutation.mutate(payload);
        else createMutation.mutate(payload);
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // 수정 모드 로딩 처리
    if (isEdit && isLoading) {
        return (
            <Modal onClose={onClose}>
                <Loading />
            </Modal>
        );
    }

    if (isEdit && isError) {
        return (
            <Modal onClose={onClose}>
                <div className="text-red-400">게시글 정보를 불러오지 못했습니다.</div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={onClose}>닫기</Button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal onClose={onClose}>
            <div className="max-w-xl w-full">
                {/* 타이틀 */}
                <h2 className="text-xl font-bold text-white mb-4">
                    {isEdit ? '게시글 수정' : '새 글 작성'}
                </h2>

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 제목 */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">제목</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div className="flex gap-2 mb-4">
                        {[
                            { key: 'FEEDBACK', label: '피드백' },
                            { key: 'STUDY', label: '스터디' },
                            { key: 'FREE', label: '자유' },
                        ].map((type) => (
                            <button
                                key={type.key}
                                type="button"
                                onClick={() => setBoardType(type.key)}
                                className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                ${boardType === type.key
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-slate-800 text-slate-300'
                                    }
              `}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>


                    {/* 내용 */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            placeholder="내용을 입력하세요"
                            className="
                w-full rounded-lg p-3 text-sm
                bg-white/5 border border-white/10
                text-white placeholder-slate-400
                focus:outline-none focus:border-purple-500
              "
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            취소
                        </Button>

                        <Button type="submit" disabled={isSubmitting}>
                            {isEdit ? '수정' : '등록'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default PostWriteModal;
