"use client";

import { cn } from '@/src/lib/cn';
import { useToastStore } from '@/src/stores/toast-store';
import { cva, VariantProps } from 'class-variance-authority';
import { Check, Info, X } from 'lucide-react';
import Button from './button';


const toastVariants = cva(
  "flex items-center justify-between gap-2 p-4 bg-white dark:bg-gray-800 z-50",
  {
    variants: {
      variant: {
        success: "border border-l-5 border-sky-500 text-sky-500",
        error: "border border-l-5 border-red-600 text-red-600",
        normal: "border border-l-5 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  }
)

const toastIconMap = {
  success: Check,
  error: X,
  normal: Info,
} as const;


export type ToastProps = VariantProps<typeof toastVariants> & {
  id: number;
  message: string;
  onRemove: (id: number) => void;
  isRemoving: boolean;
}

const Toast = ({ id, message, variant, isRemoving, onRemove }: ToastProps) => {
  const Icon = toastIconMap[variant || 'normal'];
  const { setRemoving } = useToastStore();

  const handleRemove = () => {
    setRemoving(id);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };
  
  return (
    <div 
      className={cn(
        toastVariants({ variant }),
        isRemoving ? "animate-slide-out" : "animate-slide-in"
      )}
    >
      <div className="flex items-center justify-start gap-2">
        <Icon className="size-5" />
        <span className="text-base font-bold">{message}</span>
      </div>
      <Button variant="icon" size="icon" onClick={handleRemove}>
        <X className="size-4" />
      </Button>
    </div>
  )
}


const ToastContainer = () => {
  const {toastList, removeToast} = useToastStore();

  return (
    <div className="fixed bottom-20 right-5 flex flex-col gap-2">
      {
        toastList.map((toast) => (
          <Toast 
            key={toast.id} 
            id={toast.id} 
            message={toast.message} 
            variant={toast.variant}
            isRemoving={toast.isRemoving}
            onRemove={removeToast} 
          />
        ))
      }
    </div>
  )
}


export { Toast, ToastContainer };

