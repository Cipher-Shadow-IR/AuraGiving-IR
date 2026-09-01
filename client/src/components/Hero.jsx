import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Heart, 
  Coins, 
  Users, 
  Clock, 
  Flame,
  PlayCircle,
  HelpCircle
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
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background Animated Glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div 
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-12 right-1/4 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-start mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>100% Direct Smart Contract Philanthropy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">Zero Middleman Cut</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Every single wei <br />
              <span className="text-gradient-emerald">creates genuine change.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A serene, trustless giving ecosystem powered by Ethereum smart contracts. Track every donation on-chain, support vital causes worldwide, or launch your own humanitarian mission in seconds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onScrollToExplore}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 shadow-xl shadow-emerald-500/25 transition-all text-base"
              >
                <span>Explore Causes</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/create-campaign')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] transition-all backdrop-blur-xl text-base shadow-lg hover:border-emerald-500/40"
              >
                <span>Start a Cause</span>
              </motion.button>

              {/* Interactive Tutorial Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenTutorial}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all shadow-md shadow-emerald-950/40"
              >
                <PlayCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                <span>Interactive Tutorial</span>
              </motion.button>
            </div>

            {/* Live Trust Metrics Bar */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Total Donated</span>
                </div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white font-mono">
                  {totalEthRaised} <span className="text-sm font-normal text-emerald-400">ETH</span>
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Active Causes</span>
                </div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {totalCauses}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Global Donors</span>
                </div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {totalBackers}+
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Featured Spotlight Cause */}
          {featured && (
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -top-3 left-6 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-current text-white animate-bounce" />
                <span>Featured Cause</span>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/[0.12] shadow-2xl relative group overflow-hidden transition-all duration-300 hover:border-emerald-500/30">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-4">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-[#070a13]/80 backdrop-blur-md border border-white/[0.1] text-xs font-semibold text-emerald-300">
                    {featured.category || "Emergency Relief"}
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{daysLeft(featured.deadline)} days left</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="font-display font-bold text-xl text-white hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {featured.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {featured.description}
                  </p>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-baseline text-xs font-semibold">
                    <span className="text-white font-mono font-bold text-sm">
                      {featured.amountCollected} <span className="text-slate-400 font-normal">ETH raised</span>
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {calculateBarPercentage(featured.target, featured.amountCollected)}% of {featured.target} ETH
                    </span>
                  </div>

                  <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(calculateBarPercentage(featured.target, featured.amountCollected), 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-glow-emerald"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/campaign-details/${encodeURIComponent(featured.title)}`, { state: featured })}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all text-center"
                  >
                    View Details
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuickDonateCampaign(featured)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 shadow-md shadow-emerald-500/20 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Quick Donate</span>
                  </motion.button>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Hero;
