export default function BoardDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 lg:px-8">
      {/* 제목 영역 스켈레톤 */}
      <div className="border-b-2 flex flex-col justify-between items-start border-gray-300 dark:border-gray-600 pb-2 sm:pb-3">
        <div className="flex w-full justify-between items-start gap-2 sm:gap-3">
          {/* 제목 */}
          <div className="h-6 sm:h-7 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-full sm:w-2/3 mb-3 sm:mb-4 animate-pulse" />
          {/* 버튼들 */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pl-2 sm:pl-3">
            <div className="h-7 w-12 sm:h-8 sm:w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-7 w-12 sm:h-8 sm:w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        {/* 작성일 */}
        <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      </div>

      {/* 본문 영역 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 py-4 sm:py-6 md:py-8">
        <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 sm:space-y-6">
            {/* 이미지 스켈레톤 */}
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="aspect-video sm:aspect-4/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            {/* 본문 텍스트 스켈레톤 */}
            <div className="space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full sm:w-11/12 animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* 이전글/다음글 네비게이션 스켈레톤 */}
      <div className="mt-8 sm:mt-10 md:mt-12 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-14 sm:w-20 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
            이전글
          </span>
          <div className="flex-1 ml-2 sm:ml-3 h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-14 sm:w-20 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
            다음글
          </span>
          <div className="flex-1 ml-2 sm:ml-3 h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* 목록으로 버튼 스켈레톤 */}
      <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6">
        <div className="h-10 w-28 sm:h-11 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

