import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className={`relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#1C1C1C] border border-warm-border dark:border-[#2E2E2E] text-left shadow-2xl transition-all w-full my-8 ${maxWidth}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-warm-border dark:border-[#2E2E2E] px-6 py-4">
            <h3 className="text-lg font-bold text-charcoal dark:text-[#F8F7F3]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-warm-gray dark:text-[#A8A29E] hover:text-charcoal dark:hover:text-[#F8F7F3] hover:bg-stone-100 dark:hover:bg-[#282828] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
