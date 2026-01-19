"use client";

import { boardsAPI } from "@/src/apis/board";
import BoardListSkeleton from "@/src/components/skeleton/board-list-skeleton";
import StatusView from "@/src/components/status-view";
import Button from "@/src/components/ui/button";
import formatDate from "@/src/lib/formatter";
import { Board } from "@/src/types/board";
import { useQuery } from "@tanstack/react-query";
import { PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BoardList() {
  const { data: boards, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: () => boardsAPI.getBoards(),
  });

  if (isLoading) return <BoardListSkeleton />;

  if (!boards?.data?.content.length)
    return (
      <div className="pt-10">
        <StatusView
          title="게시글이 없습니다."
          description="게시글을 작성해주세요."
          icon={<PenBox className="size-8" />}
        >
          <Button asChild variant="primaryOutline" size="lg">
            <Link href="/boards/create">게시글 작성</Link>
          </Button>
        </StatusView>
      </div>
    );

  return (
    <div className="space-y-4 mb-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.data.content.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="block bg-white group dark:bg-gray-800 rounded-lg overflow-hidden transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-800">
        {board.imageUrl ? (
          <Image
            src={board.imageUrl}
            alt={board.title}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-between py-8 px-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {board.boardCategory}
            </span>

            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {board.title}
            </h3>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="group-hover:text-sky-500 transition-all duration-300 text-base font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 leading-snug">
          {board.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {board.content}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
          <span>{formatDate(board.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};
