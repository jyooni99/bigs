export default function BoardListSkeleton() {
  return (
    <div className="space-y-4 mb-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BoardItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function BoardItemSkeleton() {
  return (
    <div className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* 이미지/썸네일 영역 */}
      <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-700" />

      {/* 콘텐츠 영역 */}
      <div className="p-5">
        {/* 제목 */}
        <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded mb-3 w-3/4" />

        {/* 내용 미리보기 */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-5/6" />
        </div>

        {/* 날짜 */}
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-24" />
      </div>
    </div>
  );
}
