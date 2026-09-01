import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

const Loader = ({ message = "Transaction is processing on the blockchain..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#0f172a]/95 border border-white/[0.12] shadow-2xl max-w-sm w-full text-center space-y-5 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Animated Spinners */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin"></div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-lg text-white">
            Confirming On-Chain
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {message}
          </p>
        </div>

        <div className="w-full pt-3 border-t border-white/[0.08] flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Please check your MetaMask prompt</span>
        </div>

      </div>
    </div>
  );
};

export default Loader;