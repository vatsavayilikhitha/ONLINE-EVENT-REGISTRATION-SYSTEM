import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';

const FilterBar = ({
  selectedCategory,
  onSelectCategory,
  priceType,
  onSelectPriceType,
  onlyAvailable,
  onToggleAvailable,
  onlyFeatured,
  onToggleFeatured,
  sortBy,
  onChangeSort
}) => {
  return (
    <div className="space-y-4 pt-1">
      {/* Category Pills (Scrollable with elegant styling) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-2xs ${
                isActive
                  ? 'bg-[#D95D45] text-white border border-[#D95D45] shadow-sm scale-[1.02]'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#282828] border border-[#E5E2DB] dark:border-[#2E2E2E]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Row: Price, Availability, Featured, and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Price Filters */}
          <div className="inline-flex rounded-xl bg-white dark:bg-[#1E1E1E] p-1 border border-[#E5E2DB] dark:border-[#2E2E2E]">
            {['all', 'free', 'paid'].map((type) => {
              const active = (priceType || 'all') === type;
              return (
                <button
                  key={type}
                  onClick={() => onSelectPriceType && onSelectPriceType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#D95D45] text-white shadow-2xs'
                      : 'text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  {type === 'all' ? 'All Prices' : type === 'free' ? 'Free Events' : 'Paid Events'}
                </button>
              );
            })}
          </div>

          {/* Available Seats Only Toggle */}
          <label className="flex items-center space-x-2 text-xs font-bold text-[#171717] dark:text-[#F8F7F3] cursor-pointer select-none bg-white dark:bg-[#1E1E1E] px-3.5 py-1.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] hover:bg-[#F8F7F3] dark:hover:bg-[#282828] transition-colors shadow-2xs">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => onToggleAvailable(e.target.checked)}
              className="w-4 h-4 accent-[#D95D45] rounded border-[#E5E2DB] dark:border-[#3E3E3E] cursor-pointer"
            />
            <span>Open Seats Only</span>
          </label>

          {/* Featured Filter Toggle */}
          {onToggleFeatured && (
            <label className="flex items-center space-x-2 text-xs font-bold text-[#171717] dark:text-[#F8F7F3] cursor-pointer select-none bg-white dark:bg-[#1E1E1E] px-3.5 py-1.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] hover:bg-[#F8F7F3] dark:hover:bg-[#282828] transition-colors shadow-2xs">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => onToggleFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#D95D45] rounded border-[#E5E2DB] dark:border-[#3E3E3E] cursor-pointer"
              />
              <Sparkles className="w-3.5 h-3.5 text-[#D95D45]" />
              <span>Featured Only</span>
            </label>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 bg-white dark:bg-[#1E1E1E] px-3.5 py-2 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B6B67] dark:text-[#A8A29E]" />
          <span className="text-[11px] font-bold text-[#6B6B67] dark:text-[#A8A29E] uppercase tracking-wider">
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
            className="text-xs bg-transparent text-[#171717] dark:text-[#F8F7F3] focus:outline-none font-bold cursor-pointer pr-1"
          >
            <option value="date_asc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Upcoming First</option>
            <option value="date_desc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Furthest Date</option>
            <option value="popularity" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Most Popular</option>
            <option value="price_asc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Price: Low to High</option>
            <option value="price_desc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Price: High to Low</option>
            <option value="recent" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Recently Added</option>
            <option value="title_asc" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
