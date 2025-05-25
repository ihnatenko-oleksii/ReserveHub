import { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast.tsx';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type?: ToastType;
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  return (
      <ToastContext.Provider value={showToast}>
        {children}
        {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
            />
        )}
      </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
