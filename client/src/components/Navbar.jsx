import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  Plus, 
  Wallet, 
  ExternalLink, 
  Copy, 
  Check, 
  Menu, 
  X, 
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { useStateContext } from '../context';
import { EXPLORER_URL, CHAIN_ID, NETWORK_NAME } from '../config/contract';

const Navbar = ({ onOpenHowItWorks, onOpenTutorial }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    address, 
    balance, 
    chainId, 
    connectWallet, 
    isConnecting, 
    switchNetwork,
    showToast 
  } = useStateContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  const isCurrentNetwork = chainId === CHAIN_ID;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    showToast("Address copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { name: 'Explore', path: '/' },
    { name: 'Create Cause', path: '/create-campaign' },
    { name: 'Dashboard', path: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0D14]/80 border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group py-2">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6]/20 transition-all duration-300 shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-display">
                Aura<span className="text-[#3B82F6]">Giving</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-md">
                Live EVM
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-full border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-5 py-2 rounded-full text-xs font-medium transition-colors text-[#94A3B8] hover:text-white"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full"
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : ''}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}

            <button
              onClick={onOpenTutorial}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Guide</span>
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Protocol
            </button>
          </nav>

          {/* Right Hub */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Developer Portfolio Link */}
            <a
              href="https://galaxir.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-colors"
            >
              <span>by Ishaan Ray</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Active Network Badge */}
            <button
              onClick={() => switchNetwork(CHAIN_ID)}
              title={isCurrentNetwork ? `Connected to ${NETWORK_NAME}` : `Click to switch to ${NETWORK_NAME}`}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-slate-200 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-colors"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isCurrentNetwork ? 'bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-[#FBBF24]'}`} />
              <span>{NETWORK_NAME}</span>
            </button>

            {/* Wallet Button */}
            {address ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#1C2331] border border-white/[0.1] transition-all text-xs font-mono shadow-sm"
                >
                  <span className="text-[#34D399] font-semibold">{balance} ETH</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-[#94A3B8]">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#161B26] border border-white/[0.1] shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3.5 py-2.5 border-b border-white/[0.06] mb-1.5">
                      <p className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider font-mono">
                        Connected Account
                      </p>
                      <p className="text-xs font-mono text-slate-200 mt-1 break-all select-all">
                        {address}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyAddress}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#94A3B8] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors text-left font-mono"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copied ? 'Copied to clipboard' : 'Copy Address'}</span>
                    </button>

                    <a
                      href={`${EXPLORER_URL}/address/${address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#94A3B8] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors text-left font-mono"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>Block Explorer</span>
                    </a>

                    <div className="pt-2 border-t border-white/[0.06] mt-1.5">
                      <Link
                        to="/create-campaign"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="btn-sheen w-full flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Launch Cause</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-sheen flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all active:scale-95 shadow-sm disabled:opacity-50"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0D14]/95 backdrop-blur-2xl px-6 py-5 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:bg-white/[0.04]"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTutorial();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:bg-white/[0.04]"
            >
              Interactive Guide
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:bg-white/[0.04]"
            >
              Protocol Architecture
            </button>
          </div>

          <div className="pt-4 border-t border-white/[0.06] space-y-3">
            {address ? (
              <div className="p-3 rounded-xl bg-[#161B26] border border-white/[0.06] text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Balance:</span>
                  <span className="text-[#34D399] font-semibold">{balance} ETH</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{address.slice(0, 10)}...{address.slice(-6)}</span>
                  <button onClick={handleCopyAddress} className="text-[#3B82F6]">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  connectWallet();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#3B82F6]"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;