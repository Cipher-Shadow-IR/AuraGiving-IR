import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID, EXPLORER_URL } from '../config/contract';

const Footer = ({ onOpenHowItWorks }) => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090A0F] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="space-y-1.5">
            <Link to="/" className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
              <span>AuraGiving</span>
            </Link>
            <p className="text-slate-500 max-w-sm text-[11px] leading-relaxed">
              Decentralized, non-custodial Web3 philanthropy protocol on Ethereum.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Explore
            </Link>
            <Link to="/create-campaign" className="hover:text-white transition-colors">
              Create Cause
            </Link>
            <Link to="/profile" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <button onClick={onOpenHowItWorks} className="hover:text-white transition-colors">
              Protocol
            </button>
          </div>

        </div>

        {/* Contract strip */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Contract ({NETWORK_NAME}):</span>
            <a
              href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-emerald-400 inline-flex items-center gap-1"
            >
              <span>{CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-8)}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p>© {new Date().getFullYear()} AuraGiving Protocol. Open Source.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
