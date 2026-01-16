export interface Board {
  id: string;
  title: string;
  content: string;
  category: string;
  file?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BoardCreateRequest {
  title: string;
  content: string;
  category: string;
  file?: File | null;
}

export interface BoardUpdateRequest {
  title: string;
  content: string;
  category?: string;
  file?: File | null;
}

export interface BoardListResponse {
  boards: Board[];
  total: number;
  page: number;
  limit: number;
}
