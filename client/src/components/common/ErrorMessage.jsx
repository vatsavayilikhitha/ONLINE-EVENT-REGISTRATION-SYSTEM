import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'An unexpected error occurred.', onRetry, className = '' }) => {
  return (
    <div
      className={`rounded-xl bg-[#FCEBEA] dark:bg-[#3D1A18] border border-warm-red/20 dark:border-[#5C2320] p-4 text-warm-red dark:text-[#F87171] flex items-start space-x-3 ${className}`}
      role="alert"
    >
      <AlertCircle className="w-5 h-5 text-warm-red dark:text-[#F87171] flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-bold">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center text-xs font-bold text-warm-red hover:underline focus:outline-none cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 mr-1" /> Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
