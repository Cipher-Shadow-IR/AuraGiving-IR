import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Heart, 
  Coins, 
  Users, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Trash2, 
  Copy, 
  Check, 
  Crown,
  Medal,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
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

  // Fallback if accessed without router state
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

      // Trigger celebratory confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
      });

      // Refetch donators
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
    showToast("Campaign link copied to clipboard! 🔗", "info");
  };

  const handleCopyOwner = () => {
    navigator.clipboard.writeText(campaign.owner);
    setCopied(true);
    showToast("Creator address copied! 📋", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  // Sort donators by amount descending for the leaderboard
  const sortedDonators = [...donators].sort((a, b) => parseFloat(b.donation || 0) - parseFloat(a.donation || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {isLoading && <Loader message="Executing smart contract on Ethereum..." />}

      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Causes</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleBookmark(campaign.pId)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Image Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#0f172a] h-80 sm:h-96">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent opacity-80" />

            {/* Category Pill */}
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-black/60 backdrop-blur-md border border-white/10 text-emerald-300">
                {campaign.category || "Emergency Relief"}
              </span>
            </div>

            {/* On-Chain Verification Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified On-Chain</span>
            </div>

            {/* Title Overlay on Mobile/Banner */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                {campaign.title}
              </h1>
            </div>
          </div>

          {/* Creator Profile Card */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0d1527] rounded-[14px] flex items-center justify-center font-mono font-bold text-white text-sm">
                  {campaign.owner ? campaign.owner.slice(2, 4).toUpperCase() : '0X'}
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Beneficiary & Creator
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-white">
                    {campaign.owner ? `${campaign.owner.slice(0, 8)}...${campaign.owner.slice(-6)}` : 'Anonymous'}
                  </span>
                  <button onClick={handleCopyOwner} className="text-slate-400 hover:text-white">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <a
              href={`${EXPLORER_URL}/address/${campaign.owner}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              <span>View On Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Story Narrative */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="font-display font-black text-xl text-white">
                About The Mission
              </h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {campaign.description}
            </p>

            {/* Smart Contract Zero Intermediary Guarantee */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-xs text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">100% Direct Smart Contract Forwarding</p>
                <p className="text-emerald-300/80 mt-0.5">
                  All contributed ETH is forwarded directly into the creator's wallet with zero platform cut or intermediate custodian holding.
                </p>
              </div>
            </div>
          </div>

          {/* Donator Leaderboard & Hall of Fame */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <h2 className="font-display font-black text-xl text-white">
                  Backers & Donors ({donators.length})
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Verified on-chain
              </span>
            </div>

            {sortedDonators.length > 0 ? (
              <div className="space-y-3">
                {sortedDonators.map((item, index) => {
                  const isFirst = index === 0;
                  const isSecond = index === 1;
                  const isThird = index === 2;

                  return (
                    <div
                      key={index}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        isFirst
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                          : isSecond
                          ? 'bg-slate-300/10 border-slate-300/30 text-slate-200'
                          : isThird
                          ? 'bg-amber-700/10 border-amber-700/30 text-amber-300'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-bold text-xs font-mono">
                          {isFirst && <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />}
                          {isSecond && <Medal className="w-4 h-4 text-slate-300" />}
                          {isThird && <Award className="w-4 h-4 text-amber-600" />}
                          {!isFirst && !isSecond && !isThird && `#${index + 1}`}
                        </div>

                        <div>
                          <p className="font-mono text-xs sm:text-sm font-semibold truncate max-w-[160px] sm:max-w-xs">
                            {item.donator}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {isFirst ? 'Top Champion Backer' : 'Verified Supporter'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-emerald-400">
                          {item.donation} ETH
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 space-y-2 border border-dashed border-white/[0.08] rounded-2xl">
                <p className="text-sm font-semibold text-slate-300">
                  No donations yet.
                </p>
                <p className="text-xs text-slate-400">
                  Be the very first pioneer to back this humanitarian mission!
                </p>
              </div>
            )}
          </div>

          {/* Owner Zone (Delete Option) */}
          {isOwner && (
            <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-display font-bold text-base">
                  Campaign Owner Controls
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                As the creator, you can delete this campaign from the on-chain directory if needed.
              </p>

              {deleteConfirmOpen ? (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 space-y-3">
                  <p className="text-xs text-rose-200 font-semibold">
                    Are you sure you want to permanently delete this campaign?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteCampaign}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                    >
                      Yes, Delete On-Chain
                    </button>
                    <button
                      onClick={() => setDeleteConfirmOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Campaign</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Floating Donation Dock */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          {/* Key Metrics Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <CountBox
              title="Days Left"
              value={isExpired ? "0" : remainingDays}
              subtitle={isExpired ? "Ended" : "Time remaining"}
              icon={Clock}
            />
            <CountBox
              title="Raised"
              value={campaign.amountCollected}
              subtitle={`of ${campaign.target} ETH`}
              icon={Coins}
            />
            <CountBox
              title="Backers"
              value={donators.length}
              subtitle="Supporters"
              icon={Users}
            />
          </div>

          {/* Interactive Donation Station */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a]/90 border border-white/[0.12] backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  Direct Donation
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {percentage}% Funded
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                Back This Cause
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 shadow-glow-emerald"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0.0 ETH</span>
                <span>Target: {campaign.target} ETH</span>
              </div>
            </div>

            <form onSubmit={handleDonate} className="space-y-5">
              
              {/* Preset Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Donation (ETH)
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
                        className={`py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 border-transparent'
                            : 'bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] border border-white/[0.08]'
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
                  <span className="text-slate-300 font-semibold">Or enter custom amount:</span>
                  {address && (
                    <span className="text-slate-400 font-mono text-[11px]">
                      Balance: <span className="text-emerald-400">{balance} ETH</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Coins className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
                    className="w-full pl-10 pr-16 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white text-base font-mono font-bold placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                    ETH
                  </span>
                </div>
              </div>

              {/* Live Impact Preview */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Contribution Impact:</span>
                </div>
                <span className="font-mono font-bold text-emerald-300 text-sm">
                  +{impactPercentage}% of Goal
                </span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Confirming on MetaMask...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Fund Campaign ({effectiveAmount || '0'} ETH)</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                Transactions are recorded permanently on the Ethereum blockchain.
              </p>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CampaignDetails;