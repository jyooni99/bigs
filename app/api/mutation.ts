import { authAPI } from '@/src/apis/auth'
import { boardsAPI } from '@/src/apis/board'
import { getUser } from '@/src/lib/get-user'
import { parseServerMessage } from '@/src/lib/parse-server-error'
import { LoginRequest, SignupRequest } from '@/src/schemas/auth'
import { CreateBoardRequest, UpdateBoardRequest } from '@/src/schemas/board'
import { useAuthStore } from '@/src/stores/auth-store'
import useToastStore from '@/src/stores/toast-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useCreateBoard = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { addToast, removeToast } = useToastStore()

  return useMutation({
    mutationFn: (data: CreateBoardRequest) => boardsAPI.createBoard(data),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      
      const toastId = Date.now()
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message: "게시글이 작성되었습니다.",
        variant: "success",
      })
      
      const id = response.data?.id
      if (id) {
        router.push(`/boards/${id}`)
      } else {
        router.push('/')
      }
    },
    onError: (error) => {
      const toastId = Date.now()
      const message = parseServerMessage(error, "게시글 작성에 실패했습니다. 다시 시도해주세요.")
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message,
        variant: "error",
      })
    },
  })
}

export const useUpdateBoard = (boardId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { addToast, removeToast } = useToastStore()

  return useMutation({
    mutationFn: (data: UpdateBoardRequest) => boardsAPI.updateBoard(boardId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      await queryClient.invalidateQueries({ queryKey: ["board", boardId] })
      
      const toastId = Date.now()
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message: "게시글이 수정되었습니다.",
        variant: "success",
      })
      
      router.push(`/boards/${boardId}`)
    },
    onError: (error) => {
      const toastId = Date.now()
      const message = parseServerMessage(error, "게시글 수정에 실패했습니다. 다시 시도해주세요.")
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message,
        variant: "error",
      })
    },
  })
}

export const useDeleteBoard = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { addToast, removeToast } = useToastStore()

  return useMutation({
    mutationFn: (boardId: number) => boardsAPI.deleteBoard(boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      
      const toastId = Date.now()
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message: "게시글이 삭제되었습니다.",
        variant: "success",
      })
      
      router.push('/')
    },
    onError: (error) => {
      const toastId = Date.now()
      const message = parseServerMessage(error, "게시글 삭제에 실패했습니다. 다시 시도해주세요.")
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message,
        variant: "error",
      })
    },
  })
}

export const useLogin = () => {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const { addToast, removeToast } = useToastStore()

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (response) => {
      if (response.data) {
        const user = getUser(response.data.accessToken)
        setAuth(user, response.data.accessToken, response.data.refreshToken)
        router.push('/')
      }
    },
    onError: (error) => {
      const toastId = Date.now()
      const message = parseServerMessage(error, "로그인에 실패했습니다. 다시 시도해주세요.")
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message,
        variant: "error",
      })
    },
  })
}

export const useSignup = () => {
  const router = useRouter()
  const { addToast, removeToast } = useToastStore()

  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
    onSuccess: () => {
      const toastId = Date.now()
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message: "회원가입이 완료되었습니다. 로그인해주세요.",
        variant: "success",
      })
      
      router.push('/auth/login')
    },
    onError: (error) => {
      const toastId = Date.now()
      const message = parseServerMessage(error, "회원가입에 실패했습니다. 다시 시도해주세요.")
      addToast({
        id: toastId,
        onRemove: () => removeToast(toastId),
        message,
        variant: "error",
      })
    },
  })
}