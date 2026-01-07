// solo-q-client/src/api/communityApi.js
import api from './axiosInstance';

// 게시글
// 게시글 목록 조회
export async function fetchPosts({ page = 0, size = 6, keyword = '' } = {}) {
    const params = { page, size };

    if (keyword && keyword.trim() !== '') {
        params.keyword = keyword.trim();
    }

    const res = await api.get('/posts', { params });
    return res.data; // PageResponse<PostListResponse>
}

// 게시글 상세 조회
export async function fetchPostDetail(postId) {
    const res = await api.get(`/posts/${postId}`);
    return res.data; // PostDetailResponse
}

// 게시글 작성 (회원만)
export async function createPost(payload) {
    const res = await api.post('/posts', payload);
    return res.data; // PostDetailResponse
}

// 게시글 수정 (회원만)
export async function updatePost(postId, payload) {
    const res = await api.patch(`/posts/${postId}`, payload);
    return res.data; // PostDetailResponse
}

// 게시글 삭제 (회원만)
export async function deletePost(postId) {
    await api.delete(`/posts/${postId}`);
}


// 댓글
// 댓글 목록 조회
export async function fetchComments(postId) {
    const res = await api.get(`/posts/${postId}/comments`);
    return res.data; // List<CommentResponse> (백 DTO 기준)
}

// 댓글 작성 (회원만)
export async function createComment(postId, payload) {
    const res = await api.post(`/posts/${postId}/comments`, payload);
    return res.data; // CommentResponse
}

// 댓글 수정 (회원만)
export async function updateComment(commentId, payload) {
    const res = await api.patch(`/posts/${commentId}`, payload);
    return res.data; // CommentResponse
}

// 댓글 삭제 (회원만)
export async function deleteComment(commentId) {
    await api.delete(`/posts/${commentId}`);
}
