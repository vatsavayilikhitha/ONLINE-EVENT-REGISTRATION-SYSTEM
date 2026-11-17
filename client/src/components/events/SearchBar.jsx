import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search events by title, venue, or keywords...' }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8C87] dark:text-[#A8A29E]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#1C1C1C] border border-[#E5E2DB] dark:border-[#2E2E2E] rounded-xl text-sm text-[#171717] dark:text-[#F8F7F3] placeholder-[#8C8C87] dark:placeholder-[#6B6B67] focus:outline-none focus:border-[#D95D45] focus:ring-1 focus:ring-[#D95D45] transition-colors shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8C87] hover:text-[#171717] dark:hover:text-white focus:outline-none cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
