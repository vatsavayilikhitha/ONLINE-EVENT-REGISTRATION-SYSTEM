import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-[#F0EFEB] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#D4D4D4] border-[#E5E2DB] dark:border-[#3E3E3E]',
    primary: 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border-[#F2C5BB] dark:border-[#5A261D]',
    coral: 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border-[#F2C5BB] dark:border-[#5A261D]',
    green: 'bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border-[#C8DFD2] dark:border-[#1E4A34]',
    success: 'bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border-[#C8DFD2] dark:border-[#1E4A34]',
    amber: 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#5A4518]',
    warning: 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#5A4518]',
    beige: 'bg-[#F2EFE9] dark:bg-[#2B2927] text-[#57534E] dark:text-[#D6D3D1] border-[#E5E0D8] dark:border-[#44403C]',
    red: 'bg-[#FCEBEA] dark:bg-[#3D1A18] text-[#C2413B] dark:text-[#F87171] border-[#F8C8C6] dark:border-[#5C2320]',
    danger: 'bg-[#FCEBEA] dark:bg-[#3D1A18] text-[#C2413B] dark:text-[#F87171] border-[#F8C8C6] dark:border-[#5C2320]',
    charcoal: 'bg-[#171717] dark:bg-[#2E2E2E] text-white border-[#171717] dark:border-[#404040]',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[11px] font-semibold',
    sm: 'px-2.5 py-1 text-xs font-semibold',
    md: 'px-3.5 py-1 text-xs font-bold'
  };

  return (
    <span
      className={`inline-flex items-center border rounded-full ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
