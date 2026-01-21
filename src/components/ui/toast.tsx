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
}

const Toast = ({ id, message, variant, onRemove }: ToastProps) => {
  const Icon = toastIconMap[variant || 'normal'];
  
  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="flex items-center justify-start gap-2">
        <Icon className="size-5" />
        <span className="text-base font-bold">{message}</span>
      </div>
      <Button variant="icon" size="icon" onClick={() => onRemove(id)}>
        <X className="size-4" />
      </Button>
    </div>
  )
}


const ToastContainer = () => {
  const {toastList, removeToast} = useToastStore();

  return (
    <div className="fixed bottom-20 right-5 p-4">
      {
        toastList.map((toast) => (
          <Toast key={toast.id} id={toast.id} message={toast.message} variant={toast.variant} onRemove={removeToast} />
        ))
      }
    </div>
  )
}


export { Toast, ToastContainer };

