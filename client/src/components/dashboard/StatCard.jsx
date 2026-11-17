import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'coral', description }) => {
  const iconThemes = {
    coral: 'bg-coral-soft dark:bg-[#D95D45]/15 text-coral',
    emerald: 'bg-forest-soft dark:bg-[#163324] text-forest dark:text-[#4ADE80]',
    amber: 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-warm-amber dark:text-[#FBBF24]',
    purple: 'bg-stone-100 dark:bg-[#2A2A2A] text-charcoal dark:text-[#F8F7F3]'
  };

  const iconStyle = iconThemes[color] || iconThemes.coral;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-warm-border dark:border-[#2E2E2E] p-5 sm:p-6 shadow-xs flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-warm-gray dark:text-[#A8A29E] uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-black text-coral tracking-tight">{value}</h3>
        {description && <p className="text-[11px] text-warm-gray dark:text-[#A8A29E] font-medium">{description}</p>}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconStyle}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
