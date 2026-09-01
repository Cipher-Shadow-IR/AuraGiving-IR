import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  PlusCircle, 
  Layers, 
  X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { daysLeft } from '../utils';

const CATEGORIES = [
  "All Causes",
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
  const [selectedCategory, setSelectedCategory] = useState('All Causes');
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
        selectedCategory === 'All Causes' ||
        c.category === selectedCategory ||
        (!c.category && selectedCategory === 'All Causes');

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
    <div id="explore-section" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              Verified Causes
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            {title || "Explore Active Causes"}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Discover and back decentralized charitable initiatives worldwide.
          </p>
        </div>

        {/* Quick Search & Sort Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, cause, or wallet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/[0.04] border border-white/[0.1] rounded-2xl pl-4 pr-10 py-2.5 text-xs font-semibold text-slate-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer backdrop-blur-md"
            >
              <option value="most_funded" className="bg-[#0f172a] text-white">Most Funded</option>
              <option value="newest" className="bg-[#0f172a] text-white">Newest First</option>
              <option value="expiring_soon" className="bg-[#0f172a] text-white">Ending Soon</option>
              <option value="target_high" className="bg-[#0f172a] text-white">Highest Goal</option>
            </select>
            <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                  : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'all' ? 'bg-white/[0.1] text-white font-bold' : 'hover:text-white'
            }`}
          >
            All ({campaigns.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'active' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('urgent')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'urgent' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'hover:text-white'
            }`}
          >
            Urgent (≤ 7d)
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'completed' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-white'
            }`}
          >
            Funded
          </button>
        </div>

        <p className="text-slate-400">
          Showing <span className="text-white font-bold">{filteredCampaigns.length}</span> cause{filteredCampaigns.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Campaign Cards Grid with AnimatePresence */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/[0.02] border border-white/[0.06] h-96 p-4 space-y-4 animate-pulse"
            >
              <div className="h-44 bg-white/[0.05] rounded-2xl w-full" />
              <div className="h-4 bg-white/[0.05] rounded w-3/4" />
              <div className="h-3 bg-white/[0.03] rounded w-full" />
              <div className="h-3 bg-white/[0.03] rounded w-2/3" />
              <div className="h-2 bg-white/[0.05] rounded-full w-full mt-4" />
            </div>
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCampaigns.map((campaign, idx) => (
              <FundCard key={campaign.pId ?? idx} {...campaign} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl max-w-lg mx-auto space-y-4 my-8"
        >
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            No causes match your filter
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Try adjusting your search keywords, switching categories, or start the first campaign in this sector.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Causes');
                setStatusFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] text-white hover:bg-white/[0.1] transition-all"
            >
              Reset Filters
            </button>
            <button
              onClick={() => navigate('/create-campaign')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch a Cause</span>
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default DisplayCampaigns;