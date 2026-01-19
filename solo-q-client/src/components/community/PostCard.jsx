function PostCard({ post, onClick }) {
  const {
    postId,
    boardType,
    title,
    content,
    timeAgo,
    commentCount,
    viewCount,
  } = post;

  const badgeStyle = {
    FEEDBACK: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
    STUDY: 'bg-lime-600/20 text-lime-400 border-lime-500/30',
    FREE: 'bg-slate-600/20 text-slate-300 border-slate-500/30',
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
        flex flex-col h-full 
        p-4 md:p-5 rounded-2xl md:rounded-3xl 
        bg-slate-900/50 backdrop-blur-md border border-white/10
        hover:border-purple-500/50 hover:bg-slate-800/60 hover:-translate-y-1
        cursor-pointer transition group shadow-lg shadow-black/20
      "
    >
      {/* 상단 (뱃지 + 조회수) */}
      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-lg border ${badgeStyle[boardType]}`}
        >
          {badgeLabel[boardType]}
        </span>

        <span className="text-[10px] md:text-xs text-slate-500 flex items-center gap-1">
          조회 {viewCount}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-sm md:text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
        {title}
      </h3>

      {/* 내용 미리보기 (flex-1로 남은 공간 차지 -> 푸터를 아래로 밀어냄) */}
      <p className="flex-1 text-xs md:text-sm text-slate-400 line-clamp-3 md:line-clamp-2 mb-4 leading-relaxed break-all">
        {content}
      </p>

      {/* 하단 (작성일 + 댓글) */}
      <div className="flex justify-between items-center text-[10px] md:text-xs text-slate-500 border-t border-white/5 pt-3 w-full">
        <span>{timeAgo}</span>
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          {/* 댓글 아이콘 (선택사항) */}
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          {commentCount}
        </span>
      </div>
    </div>
  );
}

export default PostCard;
