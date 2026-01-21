"use client";

import { useFileUpload } from "@/src/hooks/use-file-upload";
import { cn } from "@/src/lib/cn";
import { ImageUp, X } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import Button from "./button";
import Label from "./label";

interface FileUploadProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
  previewClassName?: string;
}

export default function FileUpload({
  id,
  label,
  name,
  required = false,
  previewClassName,
}: FileUploadProps) {
  const {
    hiddenInputRef,
    preview,
    registerRef,
    rest,
    handleUploadFile,
    handleDeleteFile,
    handleUpload,
  } = useFileUpload({ name });

  return (
    <div className="flex flex-col gap-2">
      {label && <Label text={label} required={required} htmlFor={name} />}

      <div className="relative">
        <input
          type="file"
          id={id}
          data-testid="file-input"
          accept="image/*"
          {...rest}
          ref={(e) => {
            registerRef(e); // react-hook-form에 등록
            hiddenInputRef.current = e; // 파일 입력 요소 참조
          }}
          onChange={handleUploadFile}
          className="hidden"
        />

        {preview ? (
          <div
            data-testid="preview-image"
            onClick={handleUpload}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600",
              previewClassName || "h-60 w-full"
            )}
          >
            <Image
              className="h-full w-full object-contain bg-zinc-50 dark:bg-zinc-700"
              src={preview}
              alt="preview"
              fill
              unoptimized
            />

            <Button
              variant="icon"
              size="icon"
              data-testid="delete-button"
              className="absolute top-2 right-2 bg-red-400 hover:bg-red-500 text-white rounded-full transition-colors"
              onClick={handleDeleteFile}
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>
        ) : (
          <Button onClick={handleUpload} variant="none" className="flex flex-col items-center w-full h-60 justify-center border border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
            <ImageUp className="size-17 text-zinc-400 mb-4 bg-zinc-100 dark:bg-zinc-700 rounded-full p-3.5" strokeWidth={1.5}/>
            <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">파일을 클릭하여 업로드</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">이미지 파일 (최대 10MB)</p>
          </Button>
        )}
      </div>
    </div>
  );
}
