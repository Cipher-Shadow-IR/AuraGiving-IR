import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Heart, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID, EXPLORER_URL } from '../config/contract';

const Footer = ({ onOpenHowItWorks }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050811]/90 backdrop-blur-2xl text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#070a13] rounded-[14px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                Aura<span className="text-emerald-400">Giving</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Empowering global change through zero-intermediary Web3 giving. Every donation is routed directly into the beneficiary's wallet with instant on-chain transparency.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Smart Contract Verified on {NETWORK_NAME}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Explore Causes
                </Link>
              </li>
              <li>
                <Link to="/create-campaign" className="hover:text-emerald-400 transition-colors">
                  Start a Campaign
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-400 transition-colors">
                  Donor Impact & Dashboard
                </Link>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-emerald-400 transition-colors text-left">
                  How Smart Contracts Work
                </button>
              </li>
            </ul>
          </div>

          {/* Blockchain & Tech Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              On-Chain Architecture
            </h4>
            <p className="text-xs text-slate-400">
              Contract Address (EVM / Hardhat):
            </p>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] text-emerald-400 break-all select-all flex items-center justify-between gap-2">
              <span className="truncate">{CONTRACT_ADDRESS}</span>
              <a
                href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              100% Non-custodial • Open Source • Zero Hidden Fees
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AuraGiving DApp. Built with leisure Web3 craftsmanship.</p>
          <div className="flex items-center gap-1.5">
            <span>Powered by Ethereum Smart Contracts</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
