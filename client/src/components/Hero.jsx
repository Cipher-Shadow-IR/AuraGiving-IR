import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Heart, 
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const textRevealChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background Grid Pattern with Radial Mask */}
      <div className="absolute inset-0 bg-grid-mask pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Kinetic Editorial Headline */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Live Protocol Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">EVM Protocol</span>
              <span className="text-slate-600">/</span>
              <span>100% Direct Payable Routing</span>
            </motion.div>

            {/* Split-Type Kinetic Typography Headline */}
            <motion.div
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <motion.h1 
                variants={textRevealChild}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white font-display leading-[0.95]"
              >
                Zero friction. <br />
                Pure impact.
              </motion.h1>

              <motion.p 
                variants={textRevealChild}
                className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-normal pt-3"
              >
                A high-trust Web3 philanthropy infrastructure powered by non-custodial smart contracts. 100% of all contributions are forwarded straight to organizers with instant on-chain auditability.
              </motion.p>
            </motion.div>

            {/* Action Group */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onScrollToExplore}
                className="btn-sheen flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/create-campaign')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] transition-all active:scale-95"
              >
                <span>Create a Cause</span>
              </button>

              <button
                onClick={onOpenTutorial}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-2 transition-colors ml-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Protocol Walkthrough</span>
              </button>
            </motion.div>

            {/* Tabular Stats Strip with Hairline Dividers */}
            <div className="pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 max-w-lg">
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  01 Total Volume
                </p>
                <p className="font-mono font-bold text-xl sm:text-2xl text-white">
                  {totalEthRaised} <span className="text-xs font-normal text-slate-400">ETH</span>
                </p>
              </div>

              <div className="space-y-1 pl-6 border-l border-white/[0.06]">
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  02 Active Causes
                </p>
                <p className="font-mono font-bold text-xl sm:text-2xl text-white">
                  {totalCauses}
                </p>
              </div>

              <div className="space-y-1 pl-6 border-l border-white/[0.06]">
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  03 Donors
                </p>
                <p className="font-mono font-bold text-xl sm:text-2xl text-white">
                  {totalBackers}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Featured Node */}
          {featured && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="gradient-border rounded-xl p-5 space-y-4 shadow-sm">
                
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider">
                      Featured Pillar
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{daysLeft(featured.deadline)} days remaining</span>
                  </div>
                </div>

                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-[#000000]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-85" />
                  
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#000000]/90 border border-white/[0.08] text-slate-200">
                    {featured.category || "Emergency Relief"}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="font-bold text-base text-white hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1 font-display"
                  >
                    {featured.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {featured.description}
                  </p>
                </div>

                {/* Structured Thin Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-slate-200 font-medium">
                      {featured.amountCollected} <span className="text-slate-500">/ {featured.target} ETH</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {calculateBarPercentage(featured.target, featured.amountCollected)}%
                    </span>
                  </div>

                  <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(calculateBarPercentage(featured.target, featured.amountCollected), 100)}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
                  >
                    Inspect Story
                  </button>

                  <button
                    onClick={() => setQuickDonateCampaign(featured)}
                    className="btn-sheen w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Back Cause</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Hero;
