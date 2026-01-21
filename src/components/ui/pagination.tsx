import { cn } from "@/src/lib/cn";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
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
    const currentGroup = Math.floor(currentPage / maxVisible);
    const start = currentGroup * maxVisible;
    const end = Math.min(start + maxVisible - 1, totalPages - 1);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 sm:text-sm text-xs">
      {
        currentPage !== 0 && (
          <>
            <Button
              variant="none"
              onClick={() => onPageChange(0)}
              className="size-7"
            >
              <ChevronsLeft className="size-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
            </Button>

            <Button
            variant="none"
            onClick={() => onPageChange(currentPage - 1)}
            className="size-7"
          >
            <ChevronLeft className="size-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
          </Button>
        </>
        )
      }

      <div className="flex gap-2">
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant="none"
            onClick={() => onPageChange(page)}
            className={cn("size-7 rounded-full", currentPage === page ? "bg-sky-500 text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500")}
          >
            {page + 1}
          </Button>
        ))}
      </div>

      {
        currentPage !== totalPages - 1 && (
          <>
            <Button
              variant="none"
              onClick={() => onPageChange(currentPage + 1)}
              className="size-7"
            >
              <ChevronRight className="size-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
            </Button>

            <Button
              variant="none"
              onClick={() => onPageChange(totalPages - 1)}
              className="size-7"
            >
              <ChevronsRight className="size-4 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500" />
            </Button>
          </>
        )
      }
    </div>
  );
}

