import React from 'react';
import { ShieldCheck, HeartHandshake, Globe2, Award, Zap, Coins } from 'lucide-react';

const ITEMS = [
  { label: '100% Non-Custodial Direct Routing', icon: ShieldCheck },
  { label: 'Zero Platform Intermediary Cuts', icon: Coins },
  { label: 'Audited Solidity Escrow Agreements', icon: Award },
  { label: 'Global Humanitarian Aid Distribution', icon: Globe2 },
  { label: 'Instant Transparent On-Chain Ledger', icon: Zap },
  { label: 'Verified Community Causes', icon: HeartHandshake },
];

export const Marquee = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0A0D14]/80 py-3.5 backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max items-center gap-10 animate-marquee">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-mono font-medium tracking-wider text-[#94A3B8] uppercase"
            >
              <Icon className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span>{item.label}</span>
              <span className="text-blue-500/40">◆</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;
