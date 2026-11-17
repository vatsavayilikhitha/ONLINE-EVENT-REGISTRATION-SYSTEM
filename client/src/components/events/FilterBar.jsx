import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Workshops',
  'Technical',
  'Competitions',
  'Cultural',
  'Sports',
  'Seminars'
];

const FilterBar = ({
  selectedCategory,
  onSelectCategory,
  onlyAvailable,
  onToggleAvailable,
  sortBy,
  onChangeSort
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#D95D45] text-white shadow-2xs border border-[#D95D45]'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#282828] border border-[#E5E2DB] dark:border-[#2E2E2E]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Options: Availability checkbox & Sort dropdown */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        <label className="flex items-center space-x-2 text-xs font-semibold text-[#171717] dark:text-[#F8F7F3] cursor-pointer select-none bg-white dark:bg-[#1E1E1E] px-3 py-1.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] hover:bg-[#F8F7F3] dark:hover:bg-[#282828] transition-colors">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onToggleAvailable(e.target.checked)}
            className="w-4 h-4 accent-[#D95D45] rounded border-[#E5E2DB] dark:border-[#3E3E3E] cursor-pointer"
          />
          <span>Available seats only</span>
        </label>

        <div className="flex items-center space-x-2 bg-white dark:bg-[#1E1E1E] px-3 py-1.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B6B67] dark:text-[#A8A29E]" />
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
            className="text-xs bg-transparent text-[#171717] dark:text-[#F8F7F3] focus:outline-none font-bold cursor-pointer"
          >
            <option value="date_asc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Upcoming First</option>
            <option value="date_desc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Latest First</option>
            <option value="title_asc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Name: A to Z</option>
            <option value="capacity_desc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Capacity: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
