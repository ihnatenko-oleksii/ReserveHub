import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const bgMap = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-gray-800',
};

const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(false), 4500);
    const hideTimer = setTimeout(onClose, 5000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  return (
      <div
          className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-4 rounded-lg shadow-xl text-white text-sm
        transition-all duration-300 ease-in-out
        ${bgMap[type]} ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}
      `}
      >
        {message}
      </div>
  );
};

export default Toast;
