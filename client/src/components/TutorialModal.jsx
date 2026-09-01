import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Wallet, 
  Heart, 
  Zap, 
  Layers, 
  Check, 
  Coins, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const TUTORIAL_STEPS = [
  {
    id: 1,
    badge: "Architecture",
    title: "1. The Non-Custodial Model",
    subtitle: "Direct on-chain execution with zero middleman deductions",
    content: (
      <div className="space-y-4 text-xs">
        <p className="text-slate-300 leading-relaxed">
          Traditional donation systems charge <span className="text-rose-400 font-mono font-medium">10%–30% in operational cuts</span> and hold funds in centralized bank accounts for weeks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-rose-950/10 border border-rose-500/20 space-y-1.5">
            <span className="font-semibold text-rose-400 text-[11px] uppercase tracking-wider">Traditional Platforms</span>
            <ul className="space-y-1 text-slate-400">
              <li>• Intermediary platform fees</li>
              <li>• Opaque accounting and slow releases</li>
              <li>• Centralized custody risks</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 space-y-1.5">
            <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider">AuraGiving Smart Contract</span>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>100%</strong> of funds sent to organizer</li>
              <li>• Instant Ethereum EVM execution</li>
              <li>• Publicly verifiable transactions</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    badge: "Connectivity",
    title: "2. Web3 Wallet Connection",
    subtitle: "Non-custodial login via MetaMask and Ethereum networks",
    content: (
      <div className="space-y-3 text-xs">
        <p className="text-slate-300 leading-relaxed">
          No passwords or email accounts required. Connect directly with your browser wallet.
        </p>

        <div className="p-3.5 rounded-lg bg-[#0D0F15] border border-white/[0.06] space-y-2.5 font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">01</span>
            <span>MetaMask browser extension</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">02</span>
            <span>Switch to Local Hardhat (RPC 8545) or Sepolia</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">03</span>
            <span>Automatic balance synchronization</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    badge: "Execution",
    title: "3. Direct Payable Donations",
    subtitle: "Smart contract routing with real-time goal metrics",
    content: (
      <div className="space-y-3 text-xs">
        <p className="text-slate-300 leading-relaxed">
          When you click "Donate", your ETH is routed directly to the beneficiary's address in the same transaction block (`payable(owner).call`).
        </p>

        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono">
          <span className="text-slate-400">Test Execution Simulation:</span>
          <button
            onClick={() => {
              confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#10b981', '#34d399', '#38bdf8'],
              });
            }}
            className="px-2.5 py-1 rounded bg-emerald-400 text-slate-950 text-[11px] font-semibold hover:bg-emerald-300 transition-colors"
          >
            Trigger Celebration
          </button>
        </div>
      </div>
    )
  },
  {
    id: 4,
    badge: "Publishing",
    title: "4. Deploying a Mission",
    subtitle: "Transparent goal setup, live preview, and on-chain registry",
    content: (
      <div className="space-y-3 text-xs">
        <p className="text-slate-300 leading-relaxed">
          Anyone can launch a charitable initiative with verified target goals and deadlines recorded immutably on Ethereum.
        </p>

        <div className="p-3.5 rounded-lg bg-[#0D0F15] border border-white/[0.06] space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Split-screen realtime card preview</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Royalty-free curated cover image presets</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Organizer campaign deletion controls</span>
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-xl bg-[#12151C] border border-white/[0.08] shadow-modal p-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400 font-medium text-[11px]">
              {step.badge} • Step {currentStep + 1} of {TUTORIAL_STEPS.length}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {TUTORIAL_STEPS.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                className={`h-1 rounded-full cursor-pointer transition-colors ${
                  idx <= currentStep ? 'bg-emerald-400' : 'bg-white/[0.06]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 min-h-[220px]">
          <div>
            <h3 className="text-base font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              {step.subtitle}
            </p>
          </div>

          <div>{step.content}</div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            {isLast ? "Close Guide" : "Next Step"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TutorialModal;
