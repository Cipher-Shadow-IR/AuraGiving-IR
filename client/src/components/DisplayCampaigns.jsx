import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  X,
  Inbox
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { daysLeft } from '../utils';

const CATEGORIES = [
  "All",
  "Emergency Relief",
  "Environment & Nature",
  "Healthcare & Medicine",
  "Education & Youth",
  "Animal Rescue",
  "Open Source & Tech"
];

const DisplayCampaigns = ({ title, isLoading, campaigns = [] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('most_funded');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        c.title?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.owner?.toLowerCase().includes(query) ||
        c.category?.toLowerCase().includes(query);

      const matchCategory =
        selectedCategory === 'All' ||
        c.category === selectedCategory ||
        (!c.category && selectedCategory === 'All');

      const remaining = Number(daysLeft(c.deadline));
      const percentage = (parseFloat(c.amountCollected) * 100) / parseFloat(c.target);

      let matchStatus = true;
      if (statusFilter === 'active') {
        matchStatus = remaining > 0 && percentage < 100;
      } else if (statusFilter === 'urgent') {
        matchStatus = remaining > 0 && remaining <= 7 && percentage < 100;
      } else if (statusFilter === 'completed') {
        matchStatus = percentage >= 100 || remaining <= 0;
      }

      return matchSearch && matchCategory && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'most_funded') {
        return parseFloat(b.amountCollected || 0) - parseFloat(a.amountCollected || 0);
      }
      if (sortBy === 'target_high') {
        return parseFloat(b.target || 0) - parseFloat(a.target || 0);
      }
      if (sortBy === 'expiring_soon') {
        return Number(daysLeft(a.deadline)) - Number(daysLeft(b.deadline));
      }
      if (sortBy === 'newest') {
        return (b.pId || 0) - (a.pId || 0);
      }
      return 0;
    });
  }, [campaigns, searchQuery, selectedCategory, sortBy, statusFilter]);

  return (
    <div id="explore-section" className="space-y-6 pb-20">
      
      {/* Section Header & Search / Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
            {title || "Active Campaigns"}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5 font-normal">
            Transparent decentralized charity verified on Ethereum EVM.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search causes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#161B26] border border-white/[0.08] text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#161B26] border border-white/[0.08] rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#3B82F6] cursor-pointer"
            >
              <option value="most_funded" className="bg-[#161B26] text-white">Most Funded</option>
              <option value="newest" className="bg-[#161B26] text-white">Newest First</option>
              <option value="expiring_soon" className="bg-[#161B26] text-white">Ending Soon</option>
              <option value="target_high" className="bg-[#161B26] text-white">Highest Goal</option>
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#94A3B8] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Sleek Segmented Category Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/[0.06] scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 font-semibold'
                  : 'text-[#94A3B8] hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Subfilter & Count */}
      <div className="flex items-center justify-between text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`transition-colors ${statusFilter === 'all' ? 'text-white font-medium underline underline-offset-4' : 'hover:text-slate-300'}`}
          >
            All ({campaigns.length})
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={() => setStatusFilter('active')}
            className={`transition-colors ${statusFilter === 'active' ? 'text-white font-medium underline underline-offset-4' : 'hover:text-slate-300'}`}
          >
            Active
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={() => setStatusFilter('urgent')}
            className={`transition-colors ${statusFilter === 'urgent' ? 'text-[#FBBF24] font-medium underline underline-offset-4' : 'hover:text-slate-300'}`}
          >
            Urgent (≤7d)
          </button>
        </div>

        <span className="font-mono text-[#94A3B8] text-[11px]">
          Showing {filteredCampaigns.length}
        </span>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-[#161B26] border border-white/[0.06] h-80 p-4 space-y-3 animate-pulse"
            >
              <div className="h-36 bg-white/[0.04] rounded-lg w-full" />
              <div className="h-3.5 bg-white/[0.04] rounded w-3/4" />
              <div className="h-2.5 bg-white/[0.02] rounded w-full" />
              <div className="h-1.5 bg-white/[0.04] rounded-full w-full mt-4" />
            </div>
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map((campaign, idx) => (
            <FundCard key={campaign.pId ?? idx} {...campaign} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl bg-[#161B26] border border-white/[0.06] max-w-md mx-auto space-y-3 my-6">
          <Inbox className="w-8 h-8 text-[#94A3B8] mx-auto" />
          <h3 className="text-sm font-semibold text-white">
            No causes match your filter
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Try adjusting your search criteria or deploy the first campaign in this category.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setStatusFilter('all');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => navigate('/create-campaign')}
              className="btn-sheen px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Cause</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DisplayCampaigns;