"use client";

import { useDeleteBoard } from "@/app/api/mutation";
import { useGetBoard } from "@/app/api/query";
import BoardList from "@/src/components/board/board-list";
import BoardDetailSkeleton from "@/src/components/skeleton/board-detail-skeleton";
import Button from "@/src/components/ui/button";
import StatusView from "@/src/components/ui/status-view";
import formatDate from "@/src/lib/formatter";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseServerMessage } from "../../lib/parse-server-error";


interface BoardDetailProps {
  id: number;
}

export default function BoardDetail({ id }: BoardDetailProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const deleteMutation = useDeleteBoard();
  const { data: board, isLoading, isFetching, isError } = useGetBoard(id);

  if (isLoading) return <BoardDetailSkeleton />;
  
  if (isFetching && !board?.data) return <BoardDetailSkeleton />;
  
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

  const handleDeleteBoard = (id: number) => {
    deleteMutation.mutate(id,{
      onError: (error) => {
        const message = parseServerMessage(error, "게시글 삭제에 실패했습니다. 다시 시도해주세요.");
        setServerError(message);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      {serverError && (
        <div className="p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}
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

      <div className="bg-white dark:bg-gray-800 py-8 border-b-2 border-gray-300 dark:border-gray-700">
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

      <div className="mt-20">
        <BoardList showSize={false} redirectHome={true} currentPostId={Number(id)} />
      </div>
    </div>
  );
}
