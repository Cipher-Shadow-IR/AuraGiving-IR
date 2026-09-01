import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Eye, 
  Coins, 
  Layers, 
  ExternalLink,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID, EXPLORER_URL } from '../config/contract';

const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Layers,
      title: "1. Immutable On-Chain Creation",
      desc: "Anyone can launch a charitable cause with transparent funding targets, deadlines, and milestone descriptions registered directly onto the Ethereum smart contract.",
      badge: "Decentralized",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
    },
    {
      icon: Zap,
      title: "2. Zero-Intermediary Direct Payout",
      desc: "When you fund a cause, your ETH is routed instantly to the beneficiary's wallet address via smart contract execution (`payable(owner).call`). No third-party cuts or frozen funds.",
      badge: "100% Direct",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
    },
    {
      icon: Eye,
      title: "3. Complete Public Transparency",
      desc: "Every backer, timestamp, and wei contributed is recorded on the blockchain ledger. Anyone in the world can inspect transactions and verify authenticity on Etherscan.",
      badge: "Trustless Audit",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f172a] border border-white/[0.12] shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <HeartHandshake className="w-4 h-4" />
            <span>Web3 Philanthropy Architecture</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            How AuraGiving Works
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminating opacity and administrative overhead through audited smart contracts.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="space-y-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-base text-white">
                      {step.title}
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical On-Chain Card */}
        <div className="p-4 rounded-2xl bg-[#070a13] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Deployed Smart Contract</span>
            <span className="text-emerald-400 font-mono">{NETWORK_NAME} (Chain #{CHAIN_ID})</span>
          </div>
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="font-mono text-xs text-white truncate">
              {CONTRACT_ADDRESS}
            </span>
            <a
              href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold flex-shrink-0"
            >
              <span>Audit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Close Modal CTA */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 transition-all text-sm shadow-lg shadow-emerald-500/20"
          >
            Got it, Let's Explore Causes
          </button>
        </div>

      </div>
    </div>
  );
};

export default HowItWorksModal;
