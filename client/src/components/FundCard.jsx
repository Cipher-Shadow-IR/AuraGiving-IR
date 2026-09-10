import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Bookmark, 
  Share2, 
  ArrowUpRight,
  Heart
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
  const isUrgent = !isExpired && Number(remainingDays) <= 7;

  const handleCardClick = () => {
    navigate(`/campaign-details/${encodeURIComponent(title)}`, {
      state: { owner, title, description, target, deadline, amountCollected, image, category, pId, donators, isSample }
    });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = window.location.origin + `/campaign-details/${encodeURIComponent(title)}`;
    navigator.clipboard.writeText(url);
    showToast("Campaign link copied to clipboard", "info");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-xl bg-[#161B26] hover:bg-[#1C2331] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer shadow-card"
    >
      {/* Top Media */}
      <div className="relative h-44 w-full overflow-hidden bg-[#0A0D14]">
        <img
          src={image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] via-transparent to-transparent opacity-85" />

        {/* Category & Active Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#0A0D14]/90 border border-white/[0.1] text-slate-200">
            {category}
          </span>
          {isUrgent && (
            <span className="px-2 py-0.5 rounded-md bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[10px] font-mono text-[#FBBF24] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
              <span>Urgent</span>
            </span>
          )}
          {isSample && (
            <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-[#94A3B8]">
              Demo
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(pId);
            }}
            aria-label="Bookmark cause"
            className="w-7 h-7 rounded-md bg-[#0A0D14]/80 hover:bg-[#0A0D14] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-[#FBBF24] fill-[#FBBF24]' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share cause"
            className="w-7 h-7 rounded-md bg-[#0A0D14]/80 hover:bg-[#0A0D14] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Time Remaining */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-[#0A0D14]/85 px-2 py-0.5 rounded-md border border-white/[0.08]">
          <Clock className="w-3 h-3 text-[#94A3B8]" />
          <span>{isExpired ? 'Ended' : `${remainingDays}d left`}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-white group-hover:text-[#3B82F6] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Creator Info (Data Hierarchy #94A3B8) */}
        <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono pt-1 border-t border-white/[0.04]">
          <span className="truncate">
            by {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : "Organizer"}
          </span>
          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 font-sans">
            <Users className="w-3 h-3" />
            {donators.length}
          </span>
        </div>

        {/* Campaign Progress Bar (#34D399 Mint Fill) */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <span className="text-slate-200 font-medium">
              {amountCollected} <span className="text-[#94A3B8] font-normal">/ {target} ETH</span>
            </span>
            <span className="text-[#34D399] font-semibold">
              {percentage}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#34D399] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions: Primary CTA (#3B82F6) */}
        <div className="pt-1 grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-colors text-center"
          >
            Details
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
            className="btn-sheen w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors text-center flex items-center justify-center gap-1 active:scale-95 shadow-sm"
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>Donate</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FundCard;