import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Heart, 
  Users, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  ExternalLink, 
  Trash2, 
  Copy, 
  Check, 
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import { EXPLORER_URL } from '../config/contract';

const ETH_PRESETS = ["0.05", "0.1", "0.25", "0.5", "1.0"];

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { 
    donate, 
    getDonations, 
    deleteCampaign, 
    contract, 
    address, 
    balance, 
    connectWallet, 
    bookmarks, 
    toggleBookmark, 
    showToast 
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('0.1');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [donators, setDonators] = useState([]);
  const [copied, setCopied] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const campaign = state || {
    pId: 0,
    title: "Charity Initiative",
    description: "Empowering communities with decentralized aid.",
    target: "10",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 14,
    amountCollected: "3.5",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200",
    owner: "0x0000000000000000000000000000000000000000",
    category: "Emergency Relief",
    isSample: false,
  };

  const remainingDays = daysLeft(campaign.deadline);
  const isExpired = Number(remainingDays) <= 0;
  const percentage = calculateBarPercentage(campaign.target, campaign.amountCollected);
  const isOwner = address && campaign.owner && address.toLowerCase() === campaign.owner.toLowerCase();
  const isBookmarked = bookmarks.includes(campaign.pId);

  const effectiveAmount = isCustom ? customAmount : amount;
  const targetFloat = parseFloat(campaign.target) || 1;
  const donateFloat = parseFloat(effectiveAmount) || 0;
  const impactPercentage = ((donateFloat / targetFloat) * 100).toFixed(1);

  const fetchDonators = useCallback(async () => {
    if (campaign.pId !== undefined) {
      try {
        const data = await getDonations(campaign.pId);
        setDonators(data || []);
      } catch (err) {
        console.error("Could not fetch donators:", err);
      }
    }
  }, [campaign.pId, getDonations]);

  useEffect(() => {
    fetchDonators();
  }, [fetchDonators, contract, address]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!effectiveAmount || parseFloat(effectiveAmount) <= 0) {
      showToast("Please enter a valid donation amount", "error");
      return;
    }

    if (!address) {
      connectWallet();
      return;
    }

    setIsLoading(true);
    try {
      await donate(campaign.pId, effectiveAmount);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#38bdf8'],
      });

      await fetchDonators();
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Donation failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCampaign = async () => {
    setIsLoading(true);
    try {
      await deleteCampaign(campaign.pId);
      navigate('/');
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Failed to delete campaign", "error");
    } finally {
      setIsLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Campaign link copied to clipboard", "info");
  };

  const handleCopyOwner = () => {
    navigator.clipboard.writeText(campaign.owner);
    setCopied(true);
    showToast("Organizer address copied", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const sortedDonators = [...donators].sort((a, b) => parseFloat(b.donation || 0) - parseFloat(a.donation || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(campaign.pId)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-xs text-slate-300 transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-xs text-slate-300 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Banner */}
          <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0D0F15] h-72 sm:h-80">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-transparent to-transparent opacity-80" />

            <div className="absolute top-3.5 left-3.5">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#090A0F]/90 border border-white/[0.08] text-slate-200">
                {campaign.category || "Emergency Relief"}
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5">
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {campaign.title}
              </h1>
            </div>
          </div>

          {/* Organizer Card */}
          <div className="p-4 rounded-xl bg-[#12151C] border border-white/[0.08] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Campaign Organizer
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-200 font-medium">
                  {campaign.owner ? `${campaign.owner.slice(0, 10)}...${campaign.owner.slice(-6)}` : 'Anonymous'}
                </span>
                <button onClick={handleCopyOwner} className="text-slate-400 hover:text-white">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <a
              href={`${EXPLORER_URL}/address/${campaign.owner}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 font-mono"
            >
              <span>Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mission Description */}
          <div className="p-6 rounded-xl bg-[#12151C] border border-white/[0.08] space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              About This Mission
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
              {campaign.description}
            </p>

            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>100% direct smart contract routing. Zero platform intermediary withholding.</span>
            </div>
          </div>

          {/* Backer Leaderboard */}
          <div className="p-6 rounded-xl bg-[#12151C] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Backers & Donors ({donators.length})
              </h2>
              <span className="text-xs font-mono text-slate-500">
                On-Chain Verified
              </span>
            </div>

            {sortedDonators.length > 0 ? (
              <div className="space-y-2">
                {sortedDonators.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-slate-500 w-5">#{index + 1}</span>
                      <span className="font-mono text-slate-300 truncate max-w-xs">{item.donator}</span>
                    </div>
                    <span className="font-mono font-medium text-emerald-400">
                      {item.donation} ETH
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 border border-dashed border-white/[0.06] rounded-lg">
                No donations recorded yet. Be the first backer.
              </div>
            )}
          </div>

          {/* Owner Deletion Control */}
          {isOwner && (
            <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-500/20 space-y-2.5">
              <p className="text-xs font-medium text-rose-300">
                Campaign Creator Controls
              </p>
              <p className="text-xs text-slate-400">
                You have permissions to remove this campaign from the on-chain directory.
              </p>

              {deleteConfirmOpen ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleDeleteCampaign}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete Campaign</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Donation Dock */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3.5 rounded-xl bg-[#12151C] border border-white/[0.08] text-left">
              <p className="text-[11px] font-medium text-slate-400">Days Left</p>
              <p className="font-mono font-semibold text-lg text-white mt-0.5">{isExpired ? "0" : remainingDays}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12151C] border border-white/[0.08] text-left">
              <p className="text-[11px] font-medium text-slate-400">Raised (ETH)</p>
              <p className="font-mono font-semibold text-lg text-emerald-400 mt-0.5">{campaign.amountCollected}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12151C] border border-white/[0.08] text-left">
              <p className="text-[11px] font-medium text-slate-400">Backers</p>
              <p className="font-mono font-semibold text-lg text-white mt-0.5">{donators.length}</p>
            </div>
          </div>

          {/* Donation Station */}
          <div className="p-5 rounded-xl bg-[#12151C] border border-white/[0.08] space-y-4 shadow-sm">
            
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-slate-200 font-medium">
                {campaign.amountCollected} <span className="text-slate-500">/ {campaign.target} ETH</span>
              </span>
              <span className="text-emerald-400 font-semibold">{percentage}%</span>
            </div>

            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <form onSubmit={handleDonate} className="space-y-4 pt-1">
              
              {/* Preset Buttons */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Select Amount (ETH)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ETH_PRESETS.map((val) => {
                    const isSelected = !isCustom && amount === val;
                    return (
                      <button
                        type="button"
                        key={val}
                        onClick={() => {
                          setIsCustom(false);
                          setAmount(val);
                        }}
                        className={`py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                          isSelected
                            ? 'bg-emerald-400 text-slate-950 font-semibold'
                            : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] border border-white/[0.06]'
                        }`}
                      >
                        {val} ETH
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Or custom amount</span>
                  {address && (
                    <span className="text-slate-500 font-mono text-[11px]">
                      Bal: <span className="text-slate-300">{balance} ETH</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    min="0.0001"
                    placeholder="0.1"
                    value={isCustom ? customAmount : amount}
                    onChange={(e) => {
                      setIsCustom(true);
                      setCustomAmount(e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F15] border border-white/[0.08] text-white text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                    ETH
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Impact on Target:</span>
                <span className="text-emerald-400 font-semibold">+{impactPercentage}%</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 text-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Confirming on MetaMask...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Fund Campaign ({effectiveAmount || '0'} ETH)</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CampaignDetails;