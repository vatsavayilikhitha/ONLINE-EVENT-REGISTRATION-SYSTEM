import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import SearchBar from '../components/events/SearchBar';
import FilterBar from '../components/events/FilterBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import { CalendarSearch, Sparkles, X } from 'lucide-react';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [priceType, setPriceType] = useState(searchParams.get('priceType') || 'all');
  const [onlyAvailable, setOnlyAvailable] = useState(searchParams.get('availability') === 'available');
  const [onlyFeatured, setOnlyFeatured] = useState(searchParams.get('isFeatured') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'date_asc');

  // Keep state synced with URL changes
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || 'All';
    const urlPrice = searchParams.get('priceType') || 'all';
    const urlAvailability = searchParams.get('availability') === 'available';
    const urlFeatured = searchParams.get('isFeatured') === 'true';
    const urlSort = searchParams.get('sort') || 'date_asc';

    setSearch(urlSearch);
    setCategory(urlCategory);
    setPriceType(urlPrice);
    setOnlyAvailable(urlAvailability);
    setOnlyFeatured(urlFeatured);
    setSortBy(urlSort);
  }, [searchParams]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        sort: sortBy
      };
      if (search.trim()) params.search = search.trim();
      if (category && category !== 'All') params.category = category;
      if (priceType && priceType !== 'all') params.priceType = priceType;
      if (onlyAvailable) params.availability = 'available';
      if (onlyFeatured) params.isFeatured = 'true';

      const data = await eventService.getEvents(params);
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load events. Make sure the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  }, [category, onlyAvailable, onlyFeatured, priceType, search, sortBy]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const updateUrlParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === 'all' || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    updateUrlParam('search', search.trim());
  };

  const handleCategorySelect = (newCategory) => {
    setCategory(newCategory);
    updateUrlParam('category', newCategory);
  };

  const handlePriceSelect = (type) => {
    setPriceType(type);
    updateUrlParam('priceType', type);
  };

  const handleToggleAvailable = (val) => {
    setOnlyAvailable(val);
    updateUrlParam('availability', val ? 'available' : '');
  };

  const handleToggleFeatured = (val) => {
    setOnlyFeatured(val);
    updateUrlParam('isFeatured', val ? 'true' : '');
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateUrlParam('sort', val);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All');
    setPriceType('all');
    setOnlyAvailable(false);
    setOnlyFeatured(false);
    setSortBy('date_asc');
    setSearchParams({});
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'All' ||
    priceType !== 'all' ||
    onlyAvailable ||
    onlyFeatured ||
    sortBy !== 'date_asc';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Editorial Page Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border border-[#F2C5BB] dark:border-[#5A261D] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Campus Events Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight font-display">
          Explore College Events
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B67] dark:text-[#A8A29E]">
          Discover hands-on workshops, state hackathons, cultural pro-nights, athletic leagues, and academic seminars across 9 categories.
        </p>
      </div>

      {/* Search & Filter Controls Container */}
      <div className="bg-white dark:bg-[#1E1E1E] p-5 sm:p-6 rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => {
              setSearch('');
              updateUrlParam('search', '');
            }}
            placeholder="Search by title, topic, venue, or faculty organizer..."
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#D95D45] hover:bg-[#B94734] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </form>

        <FilterBar
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
          priceType={priceType}
          onSelectPriceType={handlePriceSelect}
          onlyAvailable={onlyAvailable}
          onToggleAvailable={handleToggleAvailable}
          onlyFeatured={onlyFeatured}
          onToggleFeatured={handleToggleFeatured}
          sortBy={sortBy}
          onChangeSort={handleSortChange}
        />

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-[#6B6B67] dark:text-[#A8A29E] font-semibold">Active filters:</span>
            {category !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FAF0ED] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] font-bold border border-[#F2C5BB] dark:border-[#5A261D]">
                Category: {category}
                <button onClick={() => handleCategorySelect('All')} className="ml-1 hover:opacity-75">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {search.trim() && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FAF0ED] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] font-bold border border-[#F2C5BB] dark:border-[#5A261D]">
                Keyword: "{search}"
                <button
                  onClick={() => {
                    setSearch('');
                    updateUrlParam('search', '');
                  }}
                  className="ml-1 hover:opacity-75"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceType !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FAF0ED] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] font-bold border border-[#F2C5BB] dark:border-[#5A261D]">
                Price: {priceType}
                <button onClick={() => handlePriceSelect('all')} className="ml-1 hover:opacity-75">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyAvailable && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FAF0ED] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] font-bold border border-[#F2C5BB] dark:border-[#5A261D]">
                Open Seats Only
                <button onClick={() => handleToggleAvailable(false)} className="ml-1 hover:opacity-75">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyFeatured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FAF0ED] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] font-bold border border-[#F2C5BB] dark:border-[#5A261D]">
                Featured Only
                <button onClick={() => handleToggleFeatured(false)} className="ml-1 hover:opacity-75">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-[#D95D45] hover:underline ml-1 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {error && <ErrorMessage message={error} onRetry={fetchEvents} />}

      {loading ? (
        <LoadingSpinner text="Loading events..." size="large" />
      ) : events.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] px-1">
            <span>
              Showing {events.length} event{events.length === 1 ? '' : 's'}
              {category !== 'All' ? ` in ${category}` : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={CalendarSearch}
          title="No events match your criteria"
          description="Try broadening your search term, clearing category or price filters, or checking unreserved events."
          actionText="Clear All Filters"
          onAction={handleClearFilters}
        />
      )}
    </div>
  );
};

export default EventsPage;
