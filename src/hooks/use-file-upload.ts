"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface UseFileUploadProps {
  name: string;
}

export const useFileUpload = ({ name }: UseFileUploadProps) => {
  const { register, setValue, control } = useFormContext();
  const fileValue = useWatch({ control, name });

  const [preview, setPreview] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Preview용 Blob URL 생성 및 정리
  useEffect(() => {
    if (!fileValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }
    
    // ?? : URL.createObjectURL은 메모리에 객체 URL 생성하기 떄문에 여러 이미지를 불러올 경우
    // 메모리에 객체 URL이 쌓이면서 메모리 누수가 발생함
    // 따라서 파일을 새로 추가하면 cleanup 함수로 revokeObjectURL을 호출하면서 기존 객체 URL을 제거

    if (fileValue instanceof File) {
      const blobUrl = URL.createObjectURL(fileValue);
      setPreview(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    }

    if (typeof fileValue === "string") {
      // 상대 경로인 경우 백엔드 URL 추가
      const previewUrl = fileValue.startsWith("http") 
        ? fileValue 
        : `${process.env.NEXT_PUBLIC_API_URL}${fileValue}`;
      setPreview(previewUrl);
    }
  }, [fileValue]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue(name, file, { shouldValidate: true, shouldDirty: true });
  };

  const handleDeleteFile = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setValue(name, undefined, { shouldValidate: true, shouldDirty: true });
  };

  const handleUpload = () => hiddenInputRef.current?.click();

  const { ref: registerRef, ...rest } = register(name);

  return {
    hiddenInputRef,
    preview,
    registerRef,
    rest,
    handleUploadFile,
    handleDeleteFile,
    handleUpload,
  };
};

