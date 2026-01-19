import PostCard from './PostCard';

function PostList({ posts, onClickPost }) {
  // 🔹 그리드 레이아웃 스타일
  // 모바일: 2열 (gap-3) -> 한 화면에 더 많이 보임
  // 태블릿: 2열 (gap-5)
  // 데스크탑: 3열 (gap-6)
  const gridClasses =
    'grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6';

  if (!posts || posts.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 md:py-24 
                      rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm
                      text-center border-dashed"
      >
        <div className="text-4xl mb-4 opacity-50">📭</div>
        <p className="text-zinc-400 font-medium">게시글이 없습니다.</p>
        <p className="text-zinc-600 text-sm mt-1">
          첫 번째 게시글을 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} onClick={onClickPost} />
      ))}
    </div>
  );
}

export default PostList;
