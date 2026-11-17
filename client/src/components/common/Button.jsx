import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D95D45] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#D95D45] text-white hover:bg-[#B94734] active:bg-[#993726] border border-[#D95D45] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
    secondary:
      'bg-[#171717] dark:bg-[#2A2A2A] text-white hover:bg-[#262626] dark:hover:bg-[#383838] active:bg-[#000000] shadow-xs border border-[#171717] dark:border-[#3E3E3E] hover:scale-[1.01] active:scale-[0.99]',
    outline:
      'border border-[#E5E2DB] dark:border-[#383838] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#2A2A2A] hover:border-coral/60 dark:hover:border-coral/60 hover:text-coral dark:hover:text-coral shadow-2xs hover:scale-[1.01] active:scale-[0.99]',
    ghost:
      'text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#282828] hover:scale-[1.01] active:scale-[0.99]',
    danger:
      'bg-[#C2413B] text-white hover:bg-[#9E322D] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
    success:
      'bg-[#2F6B4F] text-white hover:bg-[#23523C] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
    'coral-soft':
      'bg-[#F8E4DE] dark:bg-[#D95D45]/20 text-[#D95D45] dark:text-[#F87171] hover:bg-[#F2C5BB] dark:hover:bg-[#D95D45]/30 hover:scale-[1.01] active:scale-[0.99] font-bold'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />}
      {children}
    </button>
  );
};

export default Button;
