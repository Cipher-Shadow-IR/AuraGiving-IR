import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Eye
} from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID } from '../config/contract';

const PIPELINE_NODES = [
  {
    id: "01",
    tag: "Protocol Level Execution",
    title: "Zero-Custody Fund Routing",
    description: "Traditional philanthropy relies on central bank accounts, taking 15–30% in administrative friction. AuraGiving executes native EVM payable transfers where 100% of the contributed ETH is delivered instantly to the beneficiary.",
    metrics: [
      { label: "Platform Cut", value: "0.00%" },
      { label: "Settlement Time", value: "< 12s" },
      { label: "Custody", value: "Non-Custodial" }
    ],
    icon: Zap,
  },
  {
    id: "02",
    tag: "Cryptographic Transparency",
    title: "Real-Time Ledger Auditability",
    description: "Every donor contribution, timestamp, and wallet address is permanently appended to the Ethereum blockchain. Anyone in the world can inspect the smart contract state with zero authorization required.",
    metrics: [
      { label: "Network", value: NETWORK_NAME },
      { label: "Chain ID", value: `#${CHAIN_ID}` },
      { label: "Public Ledger", value: "100% Verifiable" }
    ],
    icon: Eye,
  },
  {
    id: "03",
    tag: "Autonomous Philanthropy",
    title: "Direct Smart Contract Directory",
    description: "Campaign creators set explicit funding goals and future block-timestamp deadlines. Beneficiaries receive continuous, uninterrupted funding directly from global supporters without intermediaries.",
    metrics: [
      { label: "Routing Function", value: "payable(owner)" },
      { label: "State Storage", value: "EVM Mapping" },
      { label: "Decentralization", value: "Permissionless" }
    ],
    icon: Cpu,
  }
];

const ScrollytellingPipeline = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-28 border-b border-white/[0.06] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-xs font-mono text-[#3B82F6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>Autonomous Protocol Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white font-display">
            Built on pure on-chain primitives.
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
            Inspired by institutional Web3 architectures. Transparent, zero-custody philanthropic infrastructure.
          </p>
        </div>

        {/* Central Vertical Circuit Timeline */}
        <div className="relative">
          
          {/* Background Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2" />

          {/* Active Glowing Animated Beam (Sapphire to Mint) */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#38BDF8] to-[#34D399] -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          />

          {/* Node Cards */}
          <div className="space-y-16 sm:space-y-24">
            {PIPELINE_NODES.map((node, index) => {
              const isEven = index % 2 === 0;
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#0A0D14] border border-white/[0.15] z-10">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  </div>

                  {/* Card Content Container */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-14' : 'md:pl-14'}`}>
                    
                    <div className="gradient-border rounded-xl p-6 sm:p-7 space-y-5 shadow-card bg-[#161B26] transition-all duration-300">
                      
                      {/* Node Header */}
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#3B82F6]">
                            NODE_{node.id}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs font-mono text-[#94A3B8]">
                            {node.tag}
                          </span>
                        </div>

                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300">
                          <Icon className="w-3.5 h-3.5 text-[#3B82F6]" />
                        </div>
                      </div>

                      {/* Title & Body */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold tracking-tight text-white font-display">
                          {node.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-normal">
                          {node.description}
                        </p>
                      </div>

                      {/* Tabular Telemetry Strip (#94A3B8) */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.04]">
                        {node.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="space-y-0.5">
                            <span className="text-[10px] text-[#94A3B8] font-mono block truncate">
                              {metric.label}
                            </span>
                            <span className="text-xs font-mono font-medium text-slate-200 block truncate">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ScrollytellingPipeline;
