import { useQuery } from "@tanstack/react-query";
import { AlertCircle, PenBox } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { boardsAPI } from "../apis/board";
import formatDate from "../lib/formatter";
import { Board } from "../types/board";
import BoardListSkeleton from "./skeleton/board-list-skeleton";
import StatusView from "./status-view";
import Button from "./ui/button";
import Label from "./ui/label";
import Pagination from "./ui/pagination";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;
const SIZE_OPTIONS = [10, 20, 30];

const CATEGORY_OPTIONS = { NOTICE: "공지사항", FREE: "자유게시판", QNA: "Q&A", ETC: "기타" } as const;

const getNumberParams = (params: URLSearchParams, key: string, defaultValue: number) => {
  const value = params.get(key);
  if (!value) return defaultValue;

  const parsedValue  = parseInt(value);
  return isNaN(parsedValue) || parsedValue < 0 ? defaultValue : parsedValue;
}

const updateURL = (router: AppRouterInstance, page: number, size: number) => {
  const params = new URLSearchParams();

  if (page > 0) params.set("page", page.toString());
  if (size !== DEFAULT_SIZE) params.set("size", size.toString());

  const newUrl = params.toString() ? `?${params.toString()}` : "/";
  router.push(newUrl, { scroll: false });
}

const BoardList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = getNumberParams(searchParams, "page", DEFAULT_PAGE);
  const size = getNumberParams(searchParams, "size", DEFAULT_SIZE);

  const {data: boards, isLoading, isError} = useQuery({
    queryKey: ["boards", page, size],
    queryFn: () => boardsAPI.getBoards(page, size),
  });

  useEffect(() => {
    if (!boards?.data) return;

    const {totalPages} = boards.data;
    const isInvalidPage = page >= totalPages && totalPages > 0;

    if (isInvalidPage) {
      updateURL(router, DEFAULT_PAGE, size);
    }
  }, [page, size, boards?.data, router]);

  const handlePageChange = (newPage: number) => {
    updateURL(router, newPage, size);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleSizeChange = (newSize: number) => {
    updateURL(router, DEFAULT_PAGE, newSize);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isLoading) return <BoardListSkeleton size={size} />;

  if (isError) {
    return (
      <div className="pt-10">
      <StatusView 
        title="게시글 목록을 불러오는 중 오류가 발생했습니다." 
        description="다시 시도해주세요." 
        icon={<AlertCircle className="text-red-500 size-8" />}>
        <Button variant="primaryOutline" size="lg" onClick={() => router.refresh()}>다시 시도</Button>
      </StatusView>
      </div>
    );
  }

  if (boards?.data.totalElements === 0) {
    return (
      <div className="pt-10">
      <StatusView 
        title="게시글이 존재하지 않습니다." 
        description="게시글을 작성해주세요." 
        icon={<PenBox className="size-8" />}>
        <Button variant="primaryOutline" size="lg" asChild>
          <Link href="/boards/create">게시글 작성</Link>
        </Button>
      </StatusView>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8 mt-8">
      <div className="flex items-center justify-end gap-2">
        <Label htmlFor="size-select" text="표시 개수:" />
        <select
          id="size-select"
          value={size}
          onChange={(e) => handleSizeChange(parseInt(e.target.value))}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none"
        >
          {SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}개
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-700 overflow-hidden">
        <BoardTableHeader />
        <div>
          {boards?.data.content.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={boards?.data?.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const BoardTableHeader = () => {
  return (
    <div className="grid sm:grid-cols-[120px_1fr_150px] grid-cols-[90px_1fr] gap-4 sm:px-6 px-1 py-4 text-center border-t-2 border-gray-300 border-b-2 dark:border-gray-700">
      <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
        카테고리
      </div>
      <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
        제목
      </div>
      <div className="hidden sm:block text-sm font-bold text-gray-700 dark:text-gray-300 text-center">
        등록일
      </div>
    </div>
  );
}

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="group grid sm:grid-cols-[120px_1fr_150px] grid-cols-[90px_1fr] gap-4 sm:px-6 px-1 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      <div className="flex items-center justify-center">
        <span className="inline-block text-center px-2.5 py-1 text-xs font-medium rounded-md bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
          {CATEGORY_OPTIONS[board.category]}
        </span>
      </div>

      <div className="flex items-center justify-start">
        <h3 className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
          {board.title}
        </h3>
      </div>

      <div className="hidden sm:flex items-center justify-center">
        <span className="sm:text-sm text-xs text-gray-500 dark:text-gray-400">
          {formatDate(board.createdAt)}
        </span>
      </div>
    </Link>
  );
}

export default BoardList;