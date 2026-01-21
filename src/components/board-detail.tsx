"use client";

import { boardsAPI } from "@/src/apis/board";
import Button from "@/src/components/ui/button";
import formatDate from "@/src/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BoardDetailSkeleton from "./skeleton/board-detail-skeleton";
import StatusView from "./status-view";

export default function BoardDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: board, isLoading, isError } = useQuery({
    queryKey: ["board", id],
    queryFn: () => boardsAPI.getBoard(Number(id)),
    retry: (failureCount, error) => {
      const status = (error as AxiosError).response?.status;

      if (status === 404) return false; 
      return failureCount < 1;
    },
  });

  if (isLoading) return <BoardDetailSkeleton />;
  
  if (isError || !board?.data) return (
    <div className="max-w-5xl mx-auto sm:pt-10 pt-8">
      <StatusView title="게시글을 찾을 수 없습니다." description="해당 게시글을 찾을 수 없습니다." icon={<AlertCircle className="text-red-500 size-8" />}>
        <Button variant="secondaryOutline" size="lg" asChild>
          <Link href="/">목록으로</Link>
        </Button>
      </StatusView>
    </div>
  );

  // 이미지 URL 처리: 상대 경로인 경우 백엔드 서버 URL을 붙임
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
  };

  const handleDeleteBoard = (id: string) => {
    boardsAPI.deleteBoard(Number(id)).then(() => {
      router.push("/");
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="border-b-2 flex flex-col justify-between items-start border-gray-300 dark:border-gray-600 pb-1">
        <div className="flex w-full justify-between items-start gap-2">
          <h2 className="sm:text-xl text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            {board.data?.title}
          </h2>
          <div className="flex items-center gap-2 shrink-0 pl-3">
            <Button
              variant="primaryOutline"
              size="sm"
              onClick={() => router.push(`/boards/${id}/edit`)}
            >
              수정
            </Button>
            <Button variant="primaryOutline" size="sm" onClick={() => handleDeleteBoard(id)}>
              삭제
            </Button>
          </div>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {formatDate(board.data?.createdAt)}
        </span>
      </div>

      <div className="bg-white dark:bg-gray-800 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            {board.data?.imageUrl && (
              <div className="relative w-full max-w-2xl mx-auto">
                <Image
                  src={getImageUrl(board.data?.imageUrl)}
                  alt={board.data?.title}
                  width={800}
                  height={600}
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </div>
            )}
            <p>{board.data?.content}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-20 sm:text-sm text-xs text-gray-500 dark:text-gray-400 shrink-0">
            이전글
          </span>
          <Link
            href="#"
            className="flex-1 sm:text-base text-sm text-gray-700 hover:text-sky-500 dark:hover:text-sky-400"
          >
            이전 게시글 제목
          </Link>
        </div>
        <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="w-20 sm:text-sm text-xs text-gray-500 dark:text-gray-400 shrink-0">
            다음글
          </span>
          <Link
            href="#"
            className="flex-1 sm:text-base text-sm text-gray-700 hover:text-sky-500 dark:hover:text-sky-400"
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
