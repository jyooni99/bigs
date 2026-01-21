interface BoardListSkeletonProps {
  size?: number;
  showSize?: boolean;
}

export default function BoardListSkeleton({ size = 10, showSize = true }: BoardListSkeletonProps) {
  return (
    <div className="space-y-6 mb-8 mt-8">
      {
        showSize && (  
          <div className="flex items-center justify-end gap-2">
            <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
            <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
          </div>
        )
      }

      {/* 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-zinc-900 border-b-2 border-zinc-300 dark:border-zinc-700 overflow-hidden">
        {/* 테이블 헤더 */}
        <div className="grid sm:grid-cols-[120px_1fr_150px] grid-cols-[90px_1fr] gap-4 sm:px-6 px-1 py-4 text-center border-t-2 border-zinc-300 border-b-2 dark:border-zinc-700">
          <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            카테고리
          </div>
          <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            제목
          </div>
          <div className="hidden sm:block text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">
            등록일
          </div>
        </div>

        {/* 테이블 바디 - 스켈레톤 행들 */}
        <div>
          {Array.from({ length: size }).map((_, index) => (
            <BoardItemSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="flex items-center justify-center gap-2">
        {/* 처음으로 버튼 */}
        <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
        {/* 이전 버튼 */}
        <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
        {/* 페이지 번호들 */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
          ))}
        </div>
        {/* 다음 버튼 */}
        <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
        {/* 마지막으로 버튼 */}
        <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

function BoardItemSkeleton() {
  return (
    <div className="grid sm:grid-cols-[120px_1fr_150px] grid-cols-[90px_1fr] gap-4 sm:px-6 px-1 py-4 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
      {/* 카테고리 */}
      <div className="flex items-center justify-center">
        <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
      </div>

      {/* 제목 */}
      <div className="flex items-center justify-start">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 animate-pulse" />
      </div>

      {/* 등록일 */}
      <div className="hidden sm:flex items-center justify-center">
        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
      </div>
    </div>
  );
}
