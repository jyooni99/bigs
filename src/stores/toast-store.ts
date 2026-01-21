import { create } from "zustand";

export type ToastVariant = "success" | "error" | "normal";

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  isRemoving: boolean;
}

interface ToastStore {
  toastList: Toast[];
  addToast: (message: string, variant?: ToastVariant) => void;
  setRemoving: (id: number) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  toastList: [],
  
  addToast: (message, variant = "normal") => {
    const id = Date.now();
    const newToast: Toast = {
      id,
      message,
      variant,
      isRemoving: false,
    };

    set((state) => ({ 
      toastList: [...state.toastList, newToast] 
    }));
    
    setTimeout(() => {
      set((state) => ({ 
        toastList: state.toastList.map((t) => 
          t.id === id ? { ...t, isRemoving: true } : t
        )
      }));
      
      setTimeout(() => {
        set((state) => ({ 
          toastList: state.toastList.filter((t) => t.id !== id) 
        }));
      }, 300);
    }, 3700);
  },

  setRemoving: (id) => {
    set((state) => ({ 
      toastList: state.toastList.map((t) => 
        t.id === id ? { ...t, isRemoving: true } : t
      )
    }));
  },

  removeToast: (id) => {
    set((state) => ({ 
      toastList: state.toastList.filter((toast) => toast.id !== id) 
    }));
  },
}));

export default useToastStore;