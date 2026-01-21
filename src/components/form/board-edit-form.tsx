"use client";

import { boardsAPI } from "@/src/apis/board";
import BoardForm from "@/src/components/form/board-form";
import BoardFormSkeleton from "@/src/components/skeleton/board-form-skeleton";
import Button from "@/src/components/ui/button";
import StatusView from "@/src/components/ui/status-view";
import { useQuery } from "@tanstack/react-query";
import { FileX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function BoardEditForm() {
  const router = useRouter();
  const params = useParams();
  const boardId = Number(params.id);

  const { data: board, isLoading } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const response = await boardsAPI.getBoard(boardId);
      return response.data;
    },
  });

  if (isLoading) {
    return <BoardFormSkeleton />;
  }

  if (!board) {
    return (
      <StatusView title="게시글을 찾을 수 없습니다." description="요청하신 게시글을 찾을 수 없습니다." icon={<FileX/>}>
        <Button variant="primaryOutline" size="sm" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </Button>
      </StatusView>
    );
  }

  return <BoardForm mode="edit" boardId={boardId} initialData={board} />;
}
