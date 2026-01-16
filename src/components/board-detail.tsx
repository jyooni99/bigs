"use client";

import Button from "@/src/components/ui/button";
import Link from "next/link";

export default function BoardDetail() {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="border-b-2 flex justify-between items-center border-gray-300 dark:border-gray-600 pb-1">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
          게시글 제목
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          등록일 2025-01-01
        </span>
      </div>

      {/* 게시글 본문 */}
      <div className="bg-white dark:bg-gray-800 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p>게시글 내용</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-20 text-sm text-gray-500 dark:text-gray-400 shrink-0">
            이전글
          </span>
          <Link
            href="#"
            className="flex-1 text-gray-700 hover:text-sky-500 dark:hover:text-sky-400"
          >
            이전 게시글 제목
          </Link>
        </div>
        <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-20 text-sm text-gray-500 dark:text-gray-400 shrink-0">
            다음글
          </span>
          <Link
            href="#"
            className="flex-1 text-gray-700 hover:text-sky-500 dark:hover:text-sky-400"
          >
            다음 게시글 제목
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="primaryOutline" size="lg" asChild>
          <Link href="/">목록으로</Link>
        </Button>
      </div>
    </div>
  );
}
