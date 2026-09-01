import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Loader = ({ message = "Confirming transaction on Ethereum..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#12151C] border border-white/[0.08] shadow-modal max-w-xs w-full text-center space-y-4">
        
        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">
            Broadcasting to Network
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {message}
          </p>
        </div>

        <div className="w-full pt-3 border-t border-white/[0.06] flex items-center justify-center gap-1 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Awaiting wallet confirmation</span>
        </div>

      </div>
    </div>
  );
};

export default Loader;