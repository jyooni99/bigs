import { create } from "zustand";
import { ToastProps } from "../components/ui/toast";

interface ToastStore {
  toastList: ToastProps[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: number) => void;
}


export const useToastStore = create<ToastStore>()((set) => ({
  toastList: [],
  
  addToast: (toast) => {
    set((state) => ({ 
      toastList: [...state.toastList, toast] 
    }))
    
    setTimeout(() => {
      set((state) => ({ 
        toastList: state.toastList.filter((t) => t.id !== toast.id) 
      }))
    }, 4000)
  },

  removeToast: (id) => {
    set((state) => ({ 
      toastList: state.toastList.filter((toast) => toast.id !== id) 
    }))
  },
}));

export default useToastStore;