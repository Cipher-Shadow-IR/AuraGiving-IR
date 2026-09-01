import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Wallet, 
  Heart, 
  Sparkles, 
  Coins, 
  Bookmark, 
  PlusCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Award, 
  Layers,
  ArrowUpRight
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

      // Filter saved campaigns based on bookmarks
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
    showToast("Address copied to clipboard! 📋", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  // Metrics calculation
  const totalRaised = createdCampaigns.reduce(
    (acc, c) => acc + (parseFloat(c.amountCollected) || 0),
    0
  ).toFixed(2);

  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
          <Wallet className="w-10 h-10" />
        </div>
        <h2 className="font-display font-black text-3xl text-white">
          Connect Your Wallet to Access Your Impact Hub
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Track your created causes, donation history, and saved bookmarks directly from your Ethereum wallet.
        </p>
        <button
          onClick={connectWallet}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 shadow-xl shadow-emerald-500/25 transition-all"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect MetaMask</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/[0.08] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 p-0.5 shadow-xl shadow-emerald-500/20 flex-shrink-0">
              <div className="w-full h-full bg-[#0d1527] rounded-[22px] flex items-center justify-center font-display font-black text-xl sm:text-2xl text-white">
                {address.slice(2, 4).toUpperCase()}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl sm:text-2xl text-white">
                  Philanthropist Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Level 1 Hero</span>
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <span>{address.slice(0, 10)}...{address.slice(-8)}</span>
                <button onClick={handleCopyAddress} className="text-slate-400 hover:text-white transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span>•</span>
                <a
                  href={`${EXPLORER_URL}/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/create-campaign"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 shadow-lg shadow-emerald-500/20 transition-all text-xs sm:text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch New Cause</span>
            </Link>
          </div>

        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Wallet Balance</span>
            <p className="font-display font-bold text-xl sm:text-2xl text-white font-mono">
              {balance} <span className="text-xs font-normal text-emerald-400">ETH</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Causes Launched</span>
            <p className="font-display font-bold text-xl sm:text-2xl text-white">
              {createdCampaigns.length}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total ETH Raised</span>
            <p className="font-display font-bold text-xl sm:text-2xl text-emerald-400 font-mono">
              {totalRaised} <span className="text-xs font-normal text-slate-400">ETH</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Causes Supported</span>
            <p className="font-display font-bold text-xl sm:text-2xl text-white">
              {backedCampaigns.length}
            </p>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('created')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'created'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>My Created Causes ({createdCampaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('backed')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'backed'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Backed Causes ({backedCampaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Bookmarks ({savedCampaigns.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'created' && (
          <div>
            {createdCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md mx-auto">
                <Layers className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">
                  No Created Causes Yet
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Start your own charitable mission with 0% intermediary fee and transparent smart contract tracking.
                </p>
                <Link
                  to="/create-campaign"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 shadow-md shadow-emerald-500/20"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Start Your First Cause</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'backed' && (
          <div>
            {backedCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {backedCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md mx-auto">
                <Heart className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">
                  No Backed Causes Yet
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You haven't made any donations with this wallet yet. Support an inspiring mission today!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 shadow-md shadow-emerald-500/20"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Explore Causes to Support</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {savedCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCampaigns.map((campaign, idx) => (
                  <FundCard key={campaign.pId ?? idx} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md mx-auto">
                <Bookmark className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">
                  No Saved Bookmarks
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click the bookmark icon on any campaign card to save it here for quick tracking.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 shadow-md shadow-emerald-500/20"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Explore Causes</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;