import Image from "next/image";
import Link from "next/link";
import { Board } from "../types/board";

export default function BoardList() {
  const boards: Board[] = [
    {
      id: "1",
      title: "게시글 테스트1",
      content: "게시글 테스트1 내용",
      category: "게시글 테스트1",
      createdAt: "2023.07.20",
      file: undefined,
    },
    {
      id: "2",
      title: "게시글 테스트2",
      content: "게시글 테스트2 내용",
      category: "게시글 테스트2",
      createdAt: "2023.06.20",
      file: undefined,
    },
    {
      id: "3",
      title: "게시글 테스트3",
      content: "게시글 테스트3 내용",
      category: "게시글 테스트3",
      createdAt: "2023.05.20",
      file: undefined,
    },
  ];

  return (
    <>
      <div className="space-y-4 mb-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
      </div>
    </>
  );
}

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="block bg-white group dark:bg-gray-800 rounded-lg overflow-hidden transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-800">
        {board.file ? (
          <Image
            src={board.file}
            alt={board.title}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-between py-8 px-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {board.category}
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
          <span>{board.createdAt}</span>
        </div>
      </div>
    </Link>
  );
};
