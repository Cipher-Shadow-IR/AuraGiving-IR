import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Heart, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Coins
} from 'lucide-react';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import { CountUp } from './CountUp';

const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const textRevealChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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

  const totalEthRaised = campaigns.reduce((acc, c) => acc + (parseFloat(c.amountCollected) || 0), 0);
  const totalCauses = campaigns.length;
  const totalBackers = campaigns.reduce((acc, c) => acc + (c.donators ? c.donators.length : 0), 0);

  return (
    <section className="relative py-14 sm:py-16 lg:py-24 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background Grid Pattern with Radial Mask */}
      <div className="absolute inset-0 bg-grid-mask pointer-events-none -z-10" />

      {/* Decorative blurred glow blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Kinetic Editorial Headline */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            
            {/* Live Protocol Active Badge (Amber #FBBF24) */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-xs font-mono text-[#FBBF24]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
              <span>LIVE ON-CHAIN PROTOCOL • ZERO PLATFORM CUTS</span>
            </motion.div>

            {/* Disciplined Scale Kinetic Headline */}
            <motion.div
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              <motion.h1 
                variants={textRevealChild}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08]"
              >
                Zero friction. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">Direct impact.</span>
              </motion.h1>
            </motion.div>

            {/* Editorial Mission Statement */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-xl text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal"
            >
              AuraGiving executes native Ethereum non-custodial transactions. 100% of contributed funds route directly to verified causes without intermediary withholding or administration cuts.
            </motion.p>

            {/* Primary Action Row (Sapphire #3B82F6 CTA) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                onClick={onScrollToExplore}
                className="btn-sheen inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/create-campaign')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-slate-200 bg-[#161B26] hover:bg-[#1C2331] border border-white/[0.08] hover:border-white/[0.16] transition-all active:scale-95 cursor-pointer"
              >
                <span>Deploy Cause</span>
              </button>
            </motion.div>

            {/* Tabular Stats Strip with Data Hierarchy (#94A3B8) and Animated Counters */}
            <div className="pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-0.5">
                <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                  01 Total Volume
                </p>
                <p className="font-mono font-bold text-lg sm:text-xl text-white">
                  <CountUp end={totalEthRaised} decimals={2} /> <span className="text-xs font-normal text-[#94A3B8]">ETH</span>
                </p>
              </div>

              <div className="space-y-0.5 pl-4 border-l border-white/[0.06]">
                <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                  02 Active Causes
                </p>
                <p className="font-mono font-bold text-lg sm:text-xl text-white">
                  <CountUp end={totalCauses} />
                </p>
              </div>

              <div className="space-y-0.5 pl-4 border-l border-white/[0.06]">
                <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                  03 Donors
                </p>
                <p className="font-mono font-bold text-lg sm:text-xl text-white">
                  <CountUp end={totalBackers} />
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Featured Node with Floating Badges */}
          <div className="lg:col-span-5 relative w-full">
            
            {/* Floating Top Badge: Non-Custodial Direct Routing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-2 rounded-lg border border-emerald-500/30 bg-[#161B26]/95 px-3 py-1.5 shadow-xl backdrop-blur-md"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] font-mono font-semibold text-emerald-400">100% NON-CUSTODIAL</span>
            </motion.div>

            {featured ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full relative z-10"
              >
                <div className="gradient-border rounded-xl p-5 space-y-4 shadow-card bg-[#161B26]">
                  
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                      <span className="font-mono text-[11px] text-[#FBBF24] uppercase tracking-wider font-semibold">
                        Spotlight Pillar
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-[#94A3B8]">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      <span>{daysLeft(featured.deadline)}d remaining</span>
                    </div>
                  </div>

                  <div className="relative h-44 w-full rounded-lg overflow-hidden bg-[#0A0D14]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] via-transparent to-transparent opacity-85" />
                    
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#0A0D14]/90 border border-white/[0.1] text-slate-200">
                      {featured.category || "Emergency Relief"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 
                      onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                      className="font-bold text-base text-white hover:text-[#3B82F6] transition-colors cursor-pointer line-clamp-1 font-display"
                    >
                      {featured.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {featured.description}
                    </p>
                  </div>

                  {/* Campaign Progress Bar (#34D399 Mint Fill) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-slate-200 font-medium">
                        {featured.amountCollected} <span className="text-[#94A3B8]">/ {featured.target} ETH</span>
                      </span>
                      <span className="text-[#34D399] font-semibold">
                        {calculateBarPercentage(featured.target, featured.amountCollected)}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#34D399] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                        style={{ width: `${Math.min(calculateBarPercentage(featured.target, featured.amountCollected), 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions: Primary Sapphire #3B82F6 */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQuickDonateCampaign(featured)}
                      className="btn-sheen flex-1 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors active:scale-95 shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Quick Donate</span>
                    </button>

                    <button
                      onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                      className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white border border-white/[0.08] transition-colors active:scale-95 cursor-pointer"
                      title="View Full Ledger"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ) : (
              <div className="rounded-xl border border-white/[0.08] bg-[#161B26] p-8 text-center space-y-3">
                <Coins className="h-8 w-8 text-blue-400 mx-auto" />
                <p className="text-sm font-semibold text-white">No active campaigns</p>
                <p className="text-xs text-muted-foreground">Be the first to launch an on-chain humanitarian cause.</p>
              </div>
            )}

            {/* Floating Bottom Badge: Verified On-Chain Instant Receipt */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:flex absolute -bottom-4 -left-3 z-20 items-center gap-2.5 rounded-lg border border-white/[0.12] bg-[#0A0D14]/95 px-3.5 py-2 shadow-2xl backdrop-blur-md"
            >
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              <div className="text-[11px] font-mono">
                <span className="text-slate-200 font-semibold">Immediate Execution</span>
                <span className="text-[#94A3B8] ml-2">No Withholding</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
