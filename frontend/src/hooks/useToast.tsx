import { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext<(message: string) => void>(() => {});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);