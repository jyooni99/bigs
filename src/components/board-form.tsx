"use client";

import { boardsAPI } from "@/src/apis/board";
import Button from "@/src/components/ui/button";
import CategorySelector from "@/src/components/ui/category-selector";
import FileUpload from "@/src/components/ui/file-upload";
import Input from "@/src/components/ui/input";
import TextArea from "@/src/components/ui/text-area";
import { parseServerMessage } from "@/src/lib/parse-server-error";
import {
  CreateBoardRequest,
  createBoardSchema,
  UpdateBoardRequest,
  updateBoardSchema,
} from "@/src/schemas/board";
import { BoardDetail } from "@/src/types/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

interface BoardFormProps {
  mode: "create" | "edit";
  boardId?: number;
  initialData?: BoardDetail;
}

export default function BoardForm({ mode, boardId, initialData }: BoardFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const isEditMode = mode === "edit";
  const schema = isEditMode ? updateBoardSchema : createBoardSchema;

  const methods = useForm<CreateBoardRequest | UpdateBoardRequest>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      content: "",
      category: "FREE",
      file: undefined,
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
    try {
      const response =
        isEditMode && boardId
          ? await boardsAPI.updateBoard(boardId, data)
          : await boardsAPI.createBoard(data);

      const id = isEditMode && boardId ? boardId : response.data?.id;
      if (id) {
        router.push(`/boards/${id}`);
      }else{
        router.back();
      }
    } catch (error) {
      const message = parseServerMessage(
        error,
        `게시글 ${isEditMode ? "수정" : "작성"}에 실패했습니다. 다시 시도해주세요.`
      );
      setServerError(message);
    }
  };

  const backLink = isEditMode && boardId ? `/boards/${boardId}` : "/";

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {isEditMode ? "뒤로" : "목록으로"}
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            게시글 {isEditMode ? "수정" : "작성"}
          </h1>

          {serverError && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CategorySelector
            value={selectedCategory}
            onChange={(category) =>
              setValue("category", category, { shouldValidate: true })
            }
            errorMessage={errors.category?.message}
          />

          <Input
            label="제목"
            {...register("title")}
            errorMessage={errors.title?.message}
            placeholder="게시글 제목을 입력하세요"
          />

          <TextArea
            label="내용"
            rows={15}
            {...register("content")}
            errorMessage={errors.content?.message}
            placeholder="게시글 내용을 입력하세요"
          />

          <FileUpload
            name="file"
            label="파일 첨부"
          />

          {errors.file?.message && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.file.message}
            </p>
          )}

          

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={backLink}
              className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              취소
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-[140px] font-semibold"
              disabled={!isValid}
            >
              {isEditMode ? "수정 완료" : "게시글 등록"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </FormProvider>
  );
}
