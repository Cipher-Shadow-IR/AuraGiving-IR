import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Users, 
  Bookmark, 
  Share2, 
  ArrowUpRight
} from 'lucide-react';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  category = "Community",
  pId,
  donators = [],
  isSample = false,
}) => {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark, setQuickDonateCampaign, showToast } = useStateContext();

  const isBookmarked = bookmarks.includes(pId);
  const remainingDays = daysLeft(deadline);
  const isExpired = Number(remainingDays) <= 0;
  const percentage = calculateBarPercentage(target, amountCollected);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Emergency Relief':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'Environment & Nature':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      case 'Healthcare & Medicine':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/20';
      case 'Education & Youth':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
      case 'Animal Rescue':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      default:
        return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
    }
  };

  const handleCardClick = () => {
    navigate(`/campaign-details/${encodeURIComponent(title)}`, {
      state: { owner, title, description, target, deadline, amountCollected, image, category, pId, donators, isSample }
    });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = window.location.origin + `/campaign-details/${encodeURIComponent(title)}`;
    navigator.clipboard.writeText(url);
    showToast("Campaign link copied to clipboard! 🔗", "info");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="group relative rounded-3xl bg-[#0f172a]/60 hover:bg-[#131f38]/90 border border-white/[0.08] hover:border-emerald-500/40 transition-colors flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer backdrop-blur-xl"
    >
      {/* Top Media Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
          <span className={`px-3 py-1 rounded-xl text-xs font-semibold border backdrop-blur-md ${getCategoryColor(category)}`}>
            {category}
          </span>
          {isSample && (
            <span className="px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-md text-[10px] font-bold text-slate-300 border border-white/10 uppercase">
              Demo
            </span>
          )}
        </div>

        {/* Action icons (Bookmark & Share) */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(pId);
            }}
            aria-label="Bookmark cause"
            className="w-8 h-8 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-90"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share cause"
            className="w-8 h-8 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-90"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Time Remaining Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-slate-200">
          <Clock className={`w-3.5 h-3.5 ${isExpired ? 'text-rose-400' : 'text-emerald-400'}`} />
          <span>{isExpired ? 'Ended' : `${remainingDays}d left`}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center text-[9px] font-bold text-white font-mono">
              {owner ? owner.slice(2, 4).toUpperCase() : "0X"}
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono truncate">
            by {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : "Verified Creator"}
          </span>
        </div>

        {/* Funding Progress Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-baseline text-xs">
            <div className="flex flex-col">
              <span className="text-white font-mono font-bold text-sm">
                {amountCollected} <span className="text-slate-400 font-normal text-xs">ETH</span>
              </span>
              <span className="text-[10px] text-slate-400">
                raised of {target} ETH
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {percentage}%
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-cyan-400" />
                {donators.length} backer{donators.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <div className="relative w-full h-2 bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-700 shadow-glow-emerald"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:text-white transition-all text-center flex items-center justify-center gap-1"
          >
            <span>Story</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickDonateCampaign({
                owner,
                title,
                description,
                target,
                deadline,
                amountCollected,
                image,
                category,
                pId,
                donators,
                isSample,
              });
            }}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all text-center flex items-center justify-center gap-1 shadow-md shadow-emerald-500/15 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Donate</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default FundCard;