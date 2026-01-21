export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Board {
  id: number;
  title: string;
  content: string;
  category: BoardCategory;
  imageUrl?: string;
  createdAt: string;
}

export interface BoardDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl?: string;
  createdAt: string;
}

export interface BoardsResponse {
  content: Board[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface UpdateBoardRequest {
  title: string;
  content: string;
  category: BoardCategory;
  file?: File | string;
}

export interface Categories {
  [key: string]: string;
  NOTICE: string;
  FREE: string;
  QNA: string;
  ETC: string;
}
