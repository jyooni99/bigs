export default function BoardFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 뒤로가기 버튼 스켈레톤 */}
      <div className="mb-4 sm:mb-6">
        <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8">
        {/* 제목 스켈레톤 */}
        <div className="h-7 sm:h-8 md:h-9 w-40 sm:w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 sm:mb-8 animate-pulse" />

        <div className="space-y-4 sm:space-y-6">
          {/* 카테고리 선택 스켈레톤 */}
          <div>
            <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded mb-1.5 sm:mb-2 animate-pulse" />
                  <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* 제목 입력 스켈레톤 */}
          <div>
            <div className="h-4 sm:h-5 w-10 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3 animate-pulse" />
            <div className="h-10 sm:h-11 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* 내용 입력 스켈레톤 */}
          <div>
            <div className="h-4 sm:h-5 w-10 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3 animate-pulse" />
            <div className="h-64 sm:h-80 md:h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* 파일 첨부 스켈레톤 */}
          <div>
            <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3 animate-pulse" />
            <div className="h-48 sm:h-56 md:h-60 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                <div className="h-3 sm:h-4 w-32 sm:w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="h-10 sm:h-11 w-full sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-10 sm:h-11 w-full sm:w-[140px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

