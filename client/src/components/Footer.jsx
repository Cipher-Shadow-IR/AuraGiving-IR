import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS, NETWORK_NAME, CHAIN_ID, EXPLORER_URL } from '../config/contract';

const Footer = ({ onOpenHowItWorks }) => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0D14] text-[#94A3B8] text-xs py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="space-y-1.5">
            <Link to="/" className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="w-6 h-6 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold font-display">AuraGiving</span>
            </Link>
            <p className="text-[#94A3B8] max-w-sm text-[11px] leading-relaxed">
              Decentralized, non-custodial Web3 philanthropy protocol on Ethereum.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
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

        {/* Contract strip & Ishaan Ray credits */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>Contract ({NETWORK_NAME}):</span>
            <a
              href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-[#3B82F6] inline-flex items-center gap-1"
            >
              <span>{CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-8)}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <span>
              Engineered by{" "}
              <a
                href="https://galaxir.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-slate-200 font-semibold hover:text-[#3B82F6] transition-colors underline decoration-slate-700 underline-offset-4"
              >
                Ishaan Ray
              </a>
            </span>
            <span>•</span>
            <a
              href="https://github.com/Cipher-Shadow-IR"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ishaan-ray-cs/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
