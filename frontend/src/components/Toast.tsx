import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
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
        fixed bottom-6 left-1/2 transform -translate-x-1/2
        bg-gray-800 text-white px-4 py-3 rounded shadow-lg
        ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
