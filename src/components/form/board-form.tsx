"use client";

import { useCreateBoard, useUpdateBoard } from "@/app/api/mutation";
import Button from "@/src/components/ui/button";
import CategorySelector from "@/src/components/ui/category-selector";
import FileUpload from "@/src/components/ui/file-upload";
import Input from "@/src/components/ui/input";
import TextArea from "@/src/components/ui/text-area";
import {
  CreateBoardRequest,
  createBoardSchema,
  UpdateBoardRequest,
  updateBoardSchema,
} from "@/src/schemas/board";
import { BoardDetail } from "@/src/types/board";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

interface BoardFormProps {
  mode: "create" | "edit";
  boardId?: number;
  initialData?: BoardDetail;
}

export default function BoardForm({ mode, boardId, initialData }: BoardFormProps) {
  const isEditMode = mode === "edit";
  const schema = isEditMode ? updateBoardSchema : createBoardSchema;

  const createMutation = useCreateBoard();
  const updateMutation = useUpdateBoard(boardId || 0);

  const methods = useForm<CreateBoardRequest | UpdateBoardRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      category: "FREE",
      file: null,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const selectedCategory = useWatch({ control, name: "category" });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("category", initialData.boardCategory);

      if (initialData.imageUrl) {
        setValue("file", initialData.imageUrl);
      }
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: CreateBoardRequest | UpdateBoardRequest) => {
    if (isEditMode) {
      updateMutation.mutate(data as UpdateBoardRequest);
    } else {
      createMutation.mutate(data as CreateBoardRequest);
    }
  };

  const backLink = isEditMode && boardId ? `/boards/${boardId}` : "/";

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto sm:pt-10 pt-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg sm:p-8 p-2">
          <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
            게시글 {isEditMode ? "수정" : "작성"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CategorySelector
            value={selectedCategory}
            onChange={(category) =>
              setValue("category", category, { shouldValidate: true })
            }
            errorMessage={errors.category?.message}
          />

          <Input
            id="title"
            label="제목"
            autoFocus
            {...register("title")}
            errorMessage={errors.title?.message}
            placeholder="게시글 제목을 입력하세요"
          />

          <TextArea
            id="content"
            label="내용"
            rows={15}
            {...register("content")}
            errorMessage={errors.content?.message}
            placeholder="게시글 내용을 입력하세요"
          />

          <FileUpload
            id="file-upload"
            name="file"
            label="파일 첨부"
          />

          {errors.file?.message && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.file.message}
            </p>
          )}

          

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button variant="secondaryOutline" size="lg" asChild>
              <Link
                href={backLink}
              >
                취소
              </Link>
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-[140px] font-semibold"
              disabled={!isValid || createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) 
                ? "처리 중..." 
                : isEditMode ? "수정 완료" : "게시글 등록"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </FormProvider>
  );
}
