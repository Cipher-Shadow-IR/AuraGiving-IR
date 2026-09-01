import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  Inbox
} from 'lucide-react';
import { useStateContext } from '../context';
import { FundCard } from '../components';
import { EXPLORER_URL } from '../config/contract';

const Profile = () => {
  const navigate = useNavigate();
  const { 
    address, 
    balance, 
    connectWallet, 
    getUserCampaigns, 
    getUserDonatedCampaigns, 
    getCampaigns,
    bookmarks,
    showToast,
    contract
  } = useStateContext();

  const [activeTab, setActiveTab] = useState('created'); // 'created' | 'backed' | 'saved'
  const [createdCampaigns, setCreatedCampaigns] = useState([]);
  const [backedCampaigns, setBackedCampaigns] = useState([]);
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchProfileData = useCallback(async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const [created, backed, all] = await Promise.all([
        getUserCampaigns(),
        getUserDonatedCampaigns(),
        getCampaigns(),
      ]);

      setCreatedCampaigns(created || []);
      setBackedCampaigns(backed || []);

      const saved = (all || []).filter((c) => bookmarks.includes(c.pId));
      setSavedCampaigns(saved);
    } catch (err) {
      console.error("Failed to load profile data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [address, getUserCampaigns, getUserDonatedCampaigns, getCampaigns, bookmarks]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData, contract, address, bookmarks]);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    showToast("Address copied", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const totalRaised = createdCampaigns.reduce(
    (acc, c) => acc + (parseFloat(c.amountCollected) || 0),
    0
  ).toFixed(2);

  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#0c0d12] border border-white/[0.08] mx-auto flex items-center justify-center text-slate-400">
          <Wallet className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white font-display">
          Connect Your Wallet
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Access your personal organizer dashboard, contribution history, and bookmarked causes.
        </p>
        <button
          onClick={connectWallet}
          className="btn-sheen inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect MetaMask</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Profile Overview Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="gradient-border rounded-xl p-6 sm:p-7 space-y-6 shadow-sm"
      >
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white font-display">
              Organizer Dashboard
            </h1>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="truncate max-w-xs">{address}</span>
              <button onClick={handleCopyAddress} className="text-slate-400 hover:text-white">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <span>•</span>
              <a
                href={`${EXPLORER_URL}/address/${address}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-200 inline-flex items-center gap-0.5"
              >
                <span>Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <Link
            to="/create-campaign"
            className="btn-sheen inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Launch Cause</span>
          </Link>
        </div>

        {/* 4-Metric Strip with Hairline Dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Balance</span>
            <p className="font-mono font-bold text-lg text-white">
              {balance} <span className="text-xs font-normal text-slate-400 font-sans">ETH</span>
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 sm:border-l sm:border-white/[0.06]">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Created Causes</span>
            <p className="font-mono font-bold text-lg text-white">
              {createdCampaigns.length}
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 sm:border-l sm:border-white/[0.06]">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Raised Total</span>
            <p className="font-mono font-bold text-lg text-emerald-400">
              {totalRaised} <span className="text-xs font-normal text-slate-400 font-sans">ETH</span>
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 sm:border-l sm:border-white/[0.06]">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Causes Backed</span>
            <p className="font-mono font-bold text-lg text-white">
              {backedCampaigns.length}
            </p>
          </div>
        </div>

      </motion.div>

      {/* Segmented Tab Row */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <button
          onClick={() => setActiveTab('created')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'created'
              ? 'bg-white/[0.08] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Created Causes ({createdCampaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('backed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'backed'
              ? 'bg-white/[0.08] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Backed Causes ({backedCampaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'saved'
              ? 'bg-white/[0.08] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Saved Bookmarks ({savedCampaigns.length})
        </button>
      </div>

      {/* Content Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'created' && (
          <div>
            {createdCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {createdCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-6 rounded-xl bg-[#0c0d12] border border-white/[0.06] space-y-2 max-w-sm mx-auto">
                <Inbox className="w-6 h-6 text-slate-500 mx-auto" />
                <p className="text-xs font-medium text-slate-300">No campaigns launched yet</p>
                <Link
                  to="/create-campaign"
                  className="inline-block text-xs text-emerald-400 hover:underline pt-1"
                >
                  Create your first cause
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'backed' && (
          <div>
            {backedCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {backedCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-6 rounded-xl bg-[#0c0d12] border border-white/[0.06] space-y-2 max-w-sm mx-auto">
                <Inbox className="w-6 h-6 text-slate-500 mx-auto" />
                <p className="text-xs font-medium text-slate-300">No donations recorded from this wallet</p>
                <Link
                  to="/"
                  className="inline-block text-xs text-emerald-400 hover:underline pt-1"
                >
                  Explore active campaigns
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {savedCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-6 rounded-xl bg-[#0c0d12] border border-white/[0.06] space-y-2 max-w-sm mx-auto">
                <Inbox className="w-6 h-6 text-slate-500 mx-auto" />
                <p className="text-xs font-medium text-slate-300">No saved causes</p>
                <Link
                  to="/"
                  className="inline-block text-xs text-emerald-400 hover:underline pt-1"
                >
                  Browse and bookmark causes
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default Profile;