import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Loader = ({ message = "Confirming transaction on Ethereum..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col items-center justify-center p-7 rounded-xl bg-[#161B26] border border-white/[0.08] shadow-2xl max-w-sm w-full text-center space-y-5">
        
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-pulse" />
          <div className="absolute inset-2 rounded-full border-2 border-blue-500/30 border-t-[#3B82F6] border-r-[#34D399] animate-spin" />
          <div className="w-3 h-3 rounded-full bg-[#34D399] shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        </div>

        <div className="space-y-1.5">
          <h4 className="text-base font-bold text-white font-display">
            Broadcasting to EVM
          </h4>
          <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
            {message}
          </p>
        </div>

        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#34D399] w-3/4 rounded-full animate-pulse" />
        </div>

        <div className="w-full pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
          <span>Non-custodial smart contract execution</span>
        </div>

      </div>
    </div>
  );
};

export default Loader;