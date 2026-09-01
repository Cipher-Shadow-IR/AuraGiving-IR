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
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6">
      <div className="max-w-4xl mx-auto rounded-full bg-[#050508]/85 backdrop-blur-2xl border border-white/[0.1] shadow-2xl px-4 sm:px-5 py-2 flex items-center justify-between transition-all">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <HeartHandshake className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white font-display hidden sm:inline">
            Aura<span className="text-emerald-400">Giving</span>
          </span>
        </Link>

        {/* Desktop Nav Links with Sliding Active Tab Indicator */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium bg-white/[0.02] p-1 rounded-full border border-white/[0.04]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3.5 py-1.5 rounded-full transition-colors text-slate-400 hover:text-white"
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
            className="px-3 py-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span>Guide</span>
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="px-3 py-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            Protocol
          </button>
        </nav>

        {/* Right Hub */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* Network Indicator */}
          <button
            onClick={() => switchNetwork(CHAIN_ID)}
            title={isCurrentNetwork ? `Connected to ${NETWORK_NAME}` : `Click to switch to ${NETWORK_NAME}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] border border-white/[0.08] transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isCurrentNetwork ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-amber-400'}`} />
            <span>{NETWORK_NAME}</span>
          </button>

          {/* Wallet Button */}
          {address ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] transition-colors text-xs font-mono"
              >
                <span className="text-emerald-400 font-semibold">{balance} ETH</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0a0c12] border border-white/[0.1] shadow-2xl p-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                    <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                      Connected Address
                    </p>
                    <p className="text-xs font-mono text-slate-200 mt-0.5 break-all">
                      {address}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyAddress}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors text-left font-mono"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy Address'}</span>
                  </button>

                  <a
                    href={`${EXPLORER_URL}/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors text-left font-mono"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Block Explorer</span>
                  </a>

                  <div className="pt-1 border-t border-white/[0.06] mt-1">
                    <Link
                      to="/create-campaign"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="btn-sheen w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
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
              className="btn-sheen flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1 rounded-full bg-white/[0.04] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-4xl mx-auto rounded-2xl bg-[#090A0F]/95 backdrop-blur-2xl border border-white/[0.1] px-5 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/[0.04]"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTutorial();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/[0.04]"
            >
              Interactive Guide
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/[0.04]"
            >
              Protocol Architecture
            </button>
          </div>

          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            {address ? (
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Balance:</span>
                  <span className="text-emerald-400 font-semibold">{balance} ETH</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{address.slice(0, 8)}...{address.slice(-6)}</span>
                  <button onClick={handleCopyAddress} className="text-emerald-400">
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
                className="w-full py-2 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400"
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