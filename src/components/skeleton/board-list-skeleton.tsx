interface BoardListSkeletonProps {
  size?: number;
}

export default function BoardListSkeleton({ size = 10 }: BoardListSkeletonProps) {
  return (
    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
      {/* 표시 개수 선택 스켈레톤 */}
      <div className="flex items-center justify-end gap-2 animate-pulse">
        <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20" />
        <div className="h-8 sm:h-9 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20" />
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 테이블 헤더 - 데스크톱 */}
        <div className="hidden sm:grid grid-cols-[80px_1fr_120px] md:grid-cols-[120px_1fr_150px] gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
            카테고리
          </div>
          <div className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
            제목
          </div>
          <div className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 text-center">
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
      <div className="flex items-center justify-center gap-1 sm:gap-2 animate-pulse">
        <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex gap-0.5 sm:gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
        <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

function BoardItemSkeleton() {
  return (
    <>
      {/* 모바일 레이아웃 */}
      <div className="sm:hidden px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 animate-pulse space-y-2">
        {/* 카테고리 + 날짜 */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        {/* 제목 */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>

      {/* 태블릿/데스크톱 레이아웃 */}
      <div className="hidden sm:grid grid-cols-[80px_1fr_120px] md:grid-cols-[120px_1fr_150px] gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 animate-pulse">
        {/* 카테고리 */}
        <div className="flex items-center justify-center">
          <div className="h-5 sm:h-6 w-14 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>

        {/* 제목 */}
        <div className="flex items-center">
          <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>

        {/* 등록일 */}
        <div className="flex items-center justify-center">
          <div className="h-3 sm:h-4 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </>
  );
}
