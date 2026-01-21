import { create } from "zustand";
import { ToastProps } from "../components/ui/toast";


interface ToastStore {
  isRemoving: boolean;
  toastList: ToastProps[];
  addToast: (toast: ToastProps) => void;
  setRemoving: (id: number) => void;
  removeToast: (id: number) => void;
}


export const useToastStore = create<ToastStore>()((set) => ({
  isRemoving: false,
  toastList: [],
  
  addToast: (toast) => {
    set((state) => ({ 
      toastList: [...state.toastList, { ...toast, isRemoving: false }] 
    }))
    
    setTimeout(() => {
      set((state) => ({ 
        toastList: state.toastList.map((t) => 
          t.id === toast.id ? { ...t, isRemoving: true } : t
        )
      }))
      
      setTimeout(() => {
        set((state) => ({ 
          toastList: state.toastList.filter((t) => t.id !== toast.id) 
        }))
      }, 300)
    }, 3700)
  },

  setRemoving: (id) => {
    set((state) => ({ 
      toastList: state.toastList.map((t) => 
        t.id === id ? { ...t, isRemoving: true } : t
      )
    }))
  },

  removeToast: (id) => {
    set((state) => ({ 
      toastList: state.toastList.filter((toast) => toast.id !== id) 
    }))
  },
}));

export default useToastStore;