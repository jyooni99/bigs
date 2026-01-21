import { boardsAPI } from '@/src/apis/board'
import { CreateBoardRequest, UpdateBoardRequest } from '@/src/schemas/board'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useCreateBoard = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBoardRequest) => boardsAPI.createBoard(data),
    onSuccess: async (response) => {
      const id = response.data?.id
      if (id) {
        router.push(`/boards/${id}`)
      } else {
        router.push('/')
      }
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}

export const useUpdateBoard = (boardId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateBoardRequest) => boardsAPI.updateBoard(boardId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      await queryClient.invalidateQueries({ queryKey: ["board", boardId] })
      router.push(`/boards/${boardId}`)
    },
  })
}

export const useDeleteBoard = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (boardId: number) => boardsAPI.deleteBoard(boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      router.push('/')
    },
  })
}