import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Wallet, 
  Heart, 
  Zap, 
  Layers, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  Coins, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const TUTORIAL_STEPS = [
  {
    id: 1,
    badge: "The Problem & Solution",
    title: "Why Web3 Charity?",
    subtitle: "Zero Middlemen • 100% Direct Payout • Absolute Transparency",
    icon: Zap,
    color: "from-emerald-500 to-teal-400",
    content: (
      <div className="space-y-4 text-xs sm:text-sm">
        <p className="text-slate-300 leading-relaxed">
          Traditional donation platforms often charge <span className="text-rose-400 font-bold">10%–30% in administrative cuts</span>, delay payouts by weeks, and obscure fund allocation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Traditional Charities</span>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>❌ High intermediary processing cuts</li>
              <li>❌ Opaque fund routing & custody</li>
              <li>❌ Slow multi-week disbursements</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 shadow-lg shadow-emerald-950/40">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AuraGiving Web3 DApp</span>
            <ul className="space-y-1 text-emerald-200/90 text-xs">
              <li>✅ <strong className="text-emerald-400">100%</strong> of funds sent to creator</li>
              <li>✅ Ethereum smart contract routing</li>
              <li>✅ Instant public transaction proof</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    badge: "Getting Started",
    title: "Connect Your Web3 Wallet",
    subtitle: "Non-custodial access with MetaMask & Local / Testnet Chains",
    icon: Wallet,
    color: "from-cyan-500 to-blue-500",
    content: (
      <div className="space-y-4 text-xs sm:text-sm">
        <p className="text-slate-300 leading-relaxed">
          AuraGiving requires no email signups or passwords. You interact directly through your decentralized Ethereum wallet (e.g. MetaMask).
        </p>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-bold text-white text-xs">Install MetaMask Extension</p>
              <p className="text-[11px] text-slate-400">Available on Chrome, Brave, Firefox, and Edge.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-bold text-white text-xs">Connect to Network</p>
              <p className="text-[11px] text-slate-400">Switch to <span className="text-emerald-400 font-mono">Local Hardhat (RPC 8545)</span> or Sepolia Testnet with 1 click.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-bold text-white text-xs">Instant Balance Sync</p>
              <p className="text-[11px] text-slate-400">Your ETH balance updates automatically on the top navigation bar.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    badge: "Making an Impact",
    title: "Backing Causes with 1 Click",
    subtitle: "Real-Time Impact Estimations & Direct Payable Execution",
    icon: Heart,
    color: "from-rose-500 to-amber-500",
    content: (
      <div className="space-y-4 text-xs sm:text-sm">
        <p className="text-slate-300 leading-relaxed">
          Select any campaign card to view its story, backer leaderboard, and goal progress. Use quick preset buttons or custom ETH amounts to donate.
        </p>

        {/* Interactive Demo Tryout inside tutorial */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300">Try Interactive Donation Preview:</span>
            <button
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 60,
                  origin: { y: 0.5 }
                });
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-black uppercase hover:opacity-90 transition-all flex items-center gap-1 shadow"
            >
              <Sparkles className="w-3 h-3" />
              <span>Test Confetti</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Smart Contract Call:</span>
            <span className="text-emerald-400 font-bold">donateToCampaign(id) {`{value: 0.5 ETH}`}</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    badge: "Creator Studio",
    title: "Launch Your Own Cause",
    subtitle: "Live Real-Time Card Preview & 1-Click Curated Presets",
    icon: Sparkles,
    color: "from-amber-500 to-emerald-500",
    content: (
      <div className="space-y-4 text-xs sm:text-sm">
        <p className="text-slate-300 leading-relaxed">
          Need funding for a medical emergency, environmental initiative, or community project? Deploy your campaign directly to the Ethereum blockchain.
        </p>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>Real-Time Preview:</strong> See your card update live as you type the title, goal, and story.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>Royalty-Free Image Library:</strong> Pick curated high-resolution covers with 1-click.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>Owner Management:</strong> You have full rights to manage or delete your campaign on-chain.</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    badge: "Trust & Verification",
    title: "Auditing on the Blockchain",
    subtitle: "Public Transaction Hashes • Donator Hall of Fame",
    icon: ShieldCheck,
    color: "from-purple-500 to-cyan-500",
    content: (
      <div className="space-y-4 text-xs sm:text-sm">
        <p className="text-slate-300 leading-relaxed">
          Every donation is an immutable Ethereum transaction. You can verify proof of giving anytime by searching the transaction hash or wallet address on block explorers.
        </p>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">Donator Hall of Fame</p>
              <p className="text-[11px] text-slate-400">Top supporters receive ranked crowns (🥇, 🥈, 🥉) on the campaign page.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStep((prev) => prev + 1);
    else onClose();
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentStep((prev) => prev - 1);
  };

  const handleStartCause = () => {
    onClose();
    navigate('/create-campaign');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0f172a] border border-white/[0.12] shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress Bar Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-widest text-[11px]">
              Step {currentStep + 1} of {TUTORIAL_STEPS.length}
            </span>
            <span className="text-slate-400 font-semibold">{step.badge}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {TUTORIAL_STEPS.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === currentStep
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-sm shadow-emerald-500/50'
                    : idx < currentStep
                    ? 'bg-emerald-600'
                    : 'bg-white/[0.08]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 min-h-[260px]"
          >
            {/* Step Icon & Header */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} p-0.5 shadow-lg flex-shrink-0`}>
                <div className="w-full h-full bg-[#0d1527] rounded-[14px] flex items-center justify-center text-white">
                  <step.icon className="w-6 h-6 text-emerald-300" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </div>

            {/* Custom Step Content Body */}
            <div>{step.content}</div>
          </motion.div>
        </AnimatePresence>

        {/* Modal Bottom Actions */}
        <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {isLast && (
              <button
                onClick={handleStartCause}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] transition-all"
              >
                Start a Cause
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
            >
              <span>{isLast ? "Done, Let's Explore" : "Next Step"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorialModal;
