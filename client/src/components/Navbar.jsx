import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  Sparkles, 
  PlusCircle, 
  Compass, 
  User, 
  HelpCircle, 
  Wallet, 
  ExternalLink, 
  Copy, 
  Check, 
  Menu, 
  X, 
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    showToast("Address copied to clipboard! 📋", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { name: 'Explore Causes', path: '/', icon: Compass },
    { name: 'Start a Cause', path: '/create-campaign', icon: PlusCircle },
    { name: 'My Profile & Impact', path: '/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070a13]/80 border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#070a13] rounded-[14px] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-emerald-400 group-hover:text-teal-300 transition-colors" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#070a13] animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  Aura<span className="text-emerald-400">Giving</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                  DApp
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
                Decentralized Transparent Giving
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}

            {/* Interactive Tutorial Button */}
            <button
              onClick={onOpenTutorial}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-emerald-300 hover:text-white hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <span>Tutorial</span>
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-all"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>How It Works</span>
            </button>
          </nav>

          {/* Right Action Hub: Network & Wallet */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Network Badge */}
            <button
              onClick={() => switchNetwork(CHAIN_ID)}
              title={isCurrentNetwork ? `Connected to ${NETWORK_NAME}` : `Click to switch to ${NETWORK_NAME}`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isCurrentNetwork
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isCurrentNetwork ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-mono">{NETWORK_NAME}</span>
            </button>

            {/* Wallet Button / Dropdown */}
            {address ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] transition-all duration-200 group shadow-lg"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {balance} ETH
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 p-0.5 shadow-md">
                    <div className="w-full h-full bg-[#0d1527] rounded-[10px] flex items-center justify-center text-xs font-bold text-white">
                      {address.slice(2, 4).toUpperCase()}
                    </div>
                  </div>

                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f172a]/95 border border-white/[0.12] backdrop-blur-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 border-b border-white/[0.08] mb-2">
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        Connected Account
                      </p>
                      <p className="text-xs font-mono text-white mt-1 break-all select-all">
                        {address}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyAddress}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      <span>{copied ? 'Copied to clipboard' : 'Copy Address'}</span>
                    </button>

                    <a
                      href={`${EXPLORER_URL}/address/${address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>View on Explorer</span>
                    </a>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-emerald-400" />
                      <span>My Dashboard</span>
                    </Link>

                    <div className="pt-2 border-t border-white/[0.08] mt-1">
                      <Link
                        to="/create-campaign"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Launch New Cause</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={connectWallet}
                disabled={isConnecting}
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {address && (
              <button
                onClick={() => navigate('/profile')}
                className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-mono text-emerald-400 font-bold"
              >
                {address.slice(2, 4).toUpperCase()}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#070a13]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTutorial();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-emerald-300 hover:bg-white/[0.05] text-left"
            >
              <PlayCircle className="w-5 h-5 text-emerald-400" />
              <span>Interactive Tutorial</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-300 hover:bg-white/[0.05] text-left"
            >
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>How It Works</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-slate-400 font-medium">Network</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {NETWORK_NAME}
              </span>
            </div>

            {address ? (
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Balance</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{balance} ETH</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>{address.slice(0, 8)}...{address.slice(-6)}</span>
                  <button onClick={handleCopyAddress} className="text-emerald-400 hover:underline">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  connectWallet();
                }}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/25"
              >
                <Wallet className="w-5 h-5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect MetaMask'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;