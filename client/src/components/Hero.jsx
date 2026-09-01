import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Heart, 
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

const Hero = ({ campaigns = [], onOpenHowItWorks, onOpenTutorial, onScrollToExplore }) => {
  const navigate = useNavigate();
  const { setQuickDonateCampaign } = useStateContext();

  const featured = campaigns.length > 0
    ? [...campaigns].sort((a, b) => parseFloat(b.amountCollected) - parseFloat(a.amountCollected))[0]
    : null;

  const totalEthRaised = campaigns.reduce((acc, c) => acc + (parseFloat(c.amountCollected) || 0), 0).toFixed(2);
  const totalCauses = campaigns.length;
  const totalBackers = campaigns.reduce((acc, c) => acc + (c.donators ? c.donators.length : 0), 0);

  return (
    <div className="relative py-20 lg:py-28 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Minimal Subhead Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Decentralized Giving Protocol</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Zero Middleman Fees</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                Direct, transparent <br />
                philanthropy on-chain.
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed font-normal">
                Every wei is routed straight to verified organizers via non-custodial Ethereum smart contracts. Real-time auditability, zero withholding.
              </p>
            </div>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onScrollToExplore}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
              >
                <span>Explore Causes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/create-campaign')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              >
                <span>Start a Cause</span>
              </button>

              <button
                onClick={onOpenTutorial}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-2 transition-colors ml-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>How It Works</span>
              </button>
            </div>

            {/* Understated Stats Strip with Divider Lines */}
            <div className="pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 max-w-lg">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">Total Donated</p>
                <p className="font-mono font-semibold text-2xl text-white">
                  {totalEthRaised} <span className="text-xs font-normal text-slate-400 font-sans">ETH</span>
                </p>
              </div>

              <div className="space-y-1 pl-6 border-l border-white/[0.08]">
                <p className="text-xs font-medium text-slate-400">Active Causes</p>
                <p className="font-mono font-semibold text-2xl text-white">
                  {totalCauses}
                </p>
              </div>

              <div className="space-y-1 pl-6 border-l border-white/[0.08]">
                <p className="text-xs font-medium text-slate-400">Total Backers</p>
                <p className="font-mono font-semibold text-2xl text-white">
                  {totalBackers}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Featured Card */}
          {featured && (
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#12151C] border border-white/[0.08] p-5 space-y-4 shadow-sm hover:border-white/[0.14] transition-all">
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-emerald-400 uppercase tracking-wider text-[11px]">
                    Spotlight Cause
                  </span>
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{daysLeft(featured.deadline)} days left</span>
                  </div>
                </div>

                <div className="relative h-52 w-full rounded-lg overflow-hidden bg-[#090A0F]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#090A0F]/90 border border-white/[0.08] text-[11px] font-medium text-slate-200">
                    {featured.category || "Emergency Relief"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="font-semibold text-lg text-white hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {featured.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {featured.description}
                  </p>
                </div>

                {/* Structured Thin Progress Bar */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-white font-semibold">
                      {featured.amountCollected} <span className="text-slate-400 font-normal">/ {featured.target} ETH</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {calculateBarPercentage(featured.target, featured.amountCollected)}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(calculateBarPercentage(featured.target, featured.amountCollected), 100)}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => setQuickDonateCampaign(featured)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Quick Donate</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Hero;
