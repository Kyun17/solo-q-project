import PostCard from './PostCard';

function PostList({ posts, onClickPost }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-slate-400 py-20">게시글이 없습니다.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} onClick={onClickPost} />
      ))}
    </div>
  );
}

export default PostList;
