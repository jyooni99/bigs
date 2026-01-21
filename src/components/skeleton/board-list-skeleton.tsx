interface BoardListSkeletonProps {
  size?: number;
}

export default function BoardListSkeleton({ size = 10 }: BoardListSkeletonProps) {
  return (
    <div className="space-y-6 mb-8 mt-8">
      {/* 표시 개수 선택 스켈레톤 */}
      <div className="flex items-center justify-end gap-2 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[120px_1fr_150px] gap-4 px-6 py-4 text-center bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
            카테고리
          </div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
            제목
          </div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300 text-center">
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
      <div className="flex items-center justify-center gap-2 animate-pulse">
        <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
        <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

function BoardItemSkeleton() {
  return (
    <div className="grid grid-cols-[120px_1fr_150px] gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 animate-pulse">
      {/* 카테고리 */}
      <div className="flex items-center justify-center">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>

      {/* 제목 */}
      <div className="flex items-center">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>

      {/* 등록일 */}
      <div className="flex items-center justify-center">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
