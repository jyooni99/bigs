import { privateApi } from "@/src/apis/api";
import { CreateBoardRequest, UpdateBoardRequest } from "@/src/schemas/board";
import {
  BoardDetail,
  BoardsResponse,
  Categories,
} from "@/src/types/board";


export const boardsAPI = {
  getBoards: (page: number = 0, size: number = 10) =>
    privateApi.get<BoardsResponse>("/boards", { params: { page, size } }),

  getBoard: (id: number) => privateApi.get<BoardDetail>(`/boards/${id}`),

  createBoard: (data: CreateBoardRequest) => {
    const { file, ...request } = data;

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    return privateApi.post<BoardDetail>("/boards", formData);
  },

  updateBoard: (id: number, data: UpdateBoardRequest) => {
    const formData = new FormData();
    const { file, ...request } = data;

    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    return privateApi.patch<BoardDetail>(`/boards/${id}`, formData);
  },

  deleteBoard: (id: number) => privateApi.delete(`/boards/${id}`),

  getCategories: () => privateApi.get<Categories>("/boards/categories"),
};
