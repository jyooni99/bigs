import { privateApi } from "@/src/apis/api";
import {
  BoardDetail,
  BoardsResponse,
  Categories,
  CreateBoardRequest,
  UpdateBoardRequest,
} from "@/src/types/board";

export const boardsAPI = {
  getBoards: (page: number = 0, size: number = 10) =>
    privateApi.get<BoardsResponse>("/boards", { params: { page, size } }),

  getBoard: (id: number) => privateApi.get<BoardDetail>(`/boards/${id}`),

  createBoard: (data: CreateBoardRequest) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image);
    }

    return privateApi.post<BoardDetail>("/boards", formData);
  },

  updateBoard: (id: number, data: UpdateBoardRequest) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image);
    }

    return privateApi.patch<BoardDetail>(`/boards/${id}`, formData);
  },

  deleteBoard: (id: number) => privateApi.delete(`/boards/${id}`),

  getCategories: () => privateApi.get<Categories>("/boards/categories"),
};
