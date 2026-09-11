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
import ThemeToggle from './ThemeToggle';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0D14]/85 light:bg-[#f8fafc]/85 border-b border-white/[0.06] light:border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          <div className="flex items-center justify-start min-w-[200px] shrink-0">
            <Link to="/" className="flex items-center gap-3 group py-1">
              <img
                src="/AURAGIVING_LOGO.png"
                alt="AuraGiving Logo"
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-bold text-lg tracking-tight text-white light:text-[#0f172a] font-display">
                Aura<span className="text-[#3B82F6]">Giving</span>
              </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-md">
                  Live EVM
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] shadow-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors text-[#94A3B8] hover:text-white whitespace-nowrap"
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
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Guide</span>
              </button>

              <button
                onClick={onOpenHowItWorks}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap cursor-pointer"
              >
                Protocol
              </button>
            </div>
          </nav>

          <div className="hidden sm:flex items-center justify-end min-w-[200px] gap-3 shrink-0">
            
            <ThemeToggle />

            <button
              onClick={() => switchNetwork(CHAIN_ID)}
              title={isCurrentNetwork ? `Connected to ${NETWORK_NAME}` : `Switch to ${NETWORK_NAME}`}
              className="h-9 flex items-center gap-2 px-3 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-slate-200 bg-[#161B26] border border-white/[0.08] hover:border-white/[0.15] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${isCurrentNetwork ? 'bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-[#FBBF24]'}`} />
              <span className="truncate">{NETWORK_NAME}</span>
            </button>

            {address ? (
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="h-9 flex items-center gap-2.5 px-3.5 rounded-lg bg-[#161B26] hover:bg-[#1C2331] border border-white/[0.1] transition-all text-xs font-mono shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span className="text-[#34D399] font-bold">{balance} <span className="text-[10px] text-[#94A3B8] font-normal">ETH</span></span>
                  <span className="w-px h-3 bg-white/[0.12]" />
                  <span className="text-slate-200 font-medium">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#161B26] border border-white/[0.1] shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
                    <div className="px-3.5 py-2.5 border-b border-white/[0.06] mb-1">
                      <p className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider font-mono">
                        Connected Wallet
                      </p>
                      <p className="text-xs font-mono text-white mt-1 break-all select-all font-medium">
                        {address}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyAddress}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors text-left font-mono cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
                      <span>{copied ? 'Copied address' : 'Copy address'}</span>
                    </button>

                    <a
                      href={`${EXPLORER_URL}/address/${address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors text-left font-mono"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span>Block Explorer</span>
                    </a>

                    <div className="pt-2 border-t border-white/[0.06] mt-1">
                      <Link
                        to="/create-campaign"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="btn-sheen w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors shadow-sm"
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
                className="btn-sheen h-9 flex items-center justify-center gap-2 px-4 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all active:scale-95 shadow-md shadow-blue-500/20 disabled:opacity-50 whitespace-nowrap cursor-pointer shrink-0"
              >
                {isConnecting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Connecting…</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-3.5 h-3.5 shrink-0" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] light:border-black/[0.08] bg-[#0A0D14]/95 light:bg-[#f8fafc]/95 backdrop-blur-2xl px-6 py-5 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTutorial();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#3B82F6]" />
              <span>Interactive Guide</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
            >
              Protocol Architecture
            </button>
          </div>

          <div className="pt-4 border-t border-white/[0.06] light:border-black/[0.06] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] light:text-[#475569]">
              <span>Switch Theme:</span>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] light:text-[#475569]">
              <span>Network:</span>
              <span className="text-white light:text-[#0f172a] font-semibold">{NETWORK_NAME}</span>
            </div>

            {!address ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  connectWallet();
                }}
                className="btn-sheen w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] flex items-center justify-center gap-2"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect MetaMask</span>
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-[#161B26] border border-white/[0.08] text-xs font-mono space-y-1">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Balance:</span>
                  <span className="text-[#34D399] font-bold">{balance} ETH</span>
                </div>
                <div className="truncate text-white pt-1">{address}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;