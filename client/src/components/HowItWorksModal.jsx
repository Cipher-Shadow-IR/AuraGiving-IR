import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Eye, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID, EXPLORER_URL } from '../config/contract';

const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "Immutable On-Chain Registry",
      desc: "Causes are recorded on the smart contract with fixed funding targets, deadlines, and organizer wallet addresses."
    },
    {
      title: "Zero-Intermediary Payable Routing",
      desc: "All contributed ETH is forwarded directly to the organizer's address via the smart contract payable function without platform withholding."
    },
    {
      title: "Public Auditability",
      desc: "Every donor contribution, timestamp, and transaction hash is queryable on the public Ethereum ledger."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-[#12151C] border border-white/[0.08] shadow-modal p-6 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
            Architecture
          </span>
          <h3 className="text-lg font-semibold text-white">
            Smart Contract Protocol
          </h3>
          <p className="text-xs text-slate-400">
            How AuraGiving operates non-custodially on Ethereum.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1"
            >
              <h4 className="text-xs font-semibold text-slate-200">
                {idx + 1}. {step.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Contract Details */}
        <div className="p-3 rounded-lg bg-[#0D0F15] border border-white/[0.06] space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>Contract Address:</span>
            <span>{NETWORK_NAME} (Chain #{CHAIN_ID})</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-slate-300">
            <span className="truncate">{CONTRACT_ADDRESS}</span>
            <a
              href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Audit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
        >
          Close Protocol Overview
        </button>

      </div>
    </div>
  );
};

export default HowItWorksModal;
