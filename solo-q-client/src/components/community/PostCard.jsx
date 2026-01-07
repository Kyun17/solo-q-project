function PostCard({ post, onClick }) {
  const { postId, boardType, title, content, timeAgo, commentCount, viewCount } = post;

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
    <div
      onClick={() => onClick(postId)}
      className="
        p-4 rounded-xl bg-slate-900/70 border border-white/10
        hover:border-purple-500 cursor-pointer transition
      "
    >
      {/* 상단 */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyle[boardType]}`}
        >
          {badgeLabel[boardType]}
        </span>

        <span className="text-xs text-slate-400">
          조회 {viewCount}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-white font-semibold mb-1 line-clamp-1">
        {title}
      </h3>

      {/* 내용 미리보기 */}
      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
        {content}
      </p>

      {/* 하단 */}
      <div className="flex justify-between text-xs text-slate-400">
        <span>{timeAgo}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}

export default PostCard;
