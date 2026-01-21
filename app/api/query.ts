import { boardsAPI } from "@/src/apis/board";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetBoard = (id: number) => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => boardsAPI.getBoard(id),
    retry: (failureCount, error) => {
      const status = (error as AxiosError).response?.status;
      if (status === 404) return false; 
      return failureCount < 1;
    },
  });
}