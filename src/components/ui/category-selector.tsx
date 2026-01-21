import { cn } from "@/src/lib/cn";
import { BoardCategory } from "@/src/types/board";
import {
  Bell,
  LucideIcon,
  MessageCircleQuestion,
  MessageSquare,
  Pencil,
} from "lucide-react";
import Button from "./button";
import Label from "./label";

interface CategoryOption {
  value: BoardCategory;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryOption[] = [
  { value: "NOTICE", label: "공지사항", icon: Bell },
  { value: "FREE", label: "자유게시판", icon: MessageSquare },
  { value: "QNA", label: "질문답변", icon: MessageCircleQuestion },
  { value: "ETC", label: "기타", icon: Pencil },
];

interface CategorySelectorProps {
  value: BoardCategory;
  onChange: (category: BoardCategory) => void;
  errorMessage?: string;
  iconSize?: number;
}

export default function CategorySelector({
  value,
  onChange,
  errorMessage,
}: CategorySelectorProps) {
  return (
    <div>
      <Label htmlFor="category">카테고리</Label>
        
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        {CATEGORIES.map((category) => {
          const isSelected = value === category.value;
          const Icon = category.icon;

          return (
            <Button
              variant="primaryOutline"
              key={category.value}
              type="button"
              onClick={() => onChange(category.value)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
                isSelected
                  ? "border-sky-600 bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100"
                  : "border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 hover:bg-sky-50"
              )}
            >
              <Icon
                className={cn(
                  "mb-2 size-5",
                  isSelected
                    ? "text-sky-700 dark:text-sky-300"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected
                    ? "text-sky-700 dark:text-sky-300"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {category.label}
              </span>
            </Button>
          );
        })}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
