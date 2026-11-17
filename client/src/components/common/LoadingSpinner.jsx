import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...', size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-warm-gray dark:text-[#A8A29E] ${className}`}>
      <Loader2 className={`${sizeClasses[size] || sizeClasses.default} animate-spin text-coral mb-3`} />
      {text && <p className="text-sm font-bold text-warm-gray dark:text-[#A8A29E]">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
