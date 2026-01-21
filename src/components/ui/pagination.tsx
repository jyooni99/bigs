import { cn } from "@/src/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const getPageNumbers = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    let start = Math.max(0, currentPage - half);
    const end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end === totalPages - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {
        currentPage !== 0 && (
          <Button
            variant="none"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="w-7 h-7 p-0"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
          </Button>
        )
      }

      <div className="flex gap-1">
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant="none"
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn("w-7 h-7 rounded-full", currentPage === page ? "bg-sky-500 text-white" : "text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500")}
          >
            {page + 1}
          </Button>
        ))}
      </div>
      {
        currentPage !== totalPages - 1 && (
          <Button
            variant="none"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="w-7 h-7 p-0"
          >
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
          </Button>
        )
      }
    </div>
  );
}

