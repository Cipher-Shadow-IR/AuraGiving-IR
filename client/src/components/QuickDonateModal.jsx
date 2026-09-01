import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Wallet, 
  Coins,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStateContext } from '../context';
import { calculateBarPercentage } from '../utils';

const ETH_PRESETS = ["0.02", "0.05", "0.1", "0.25", "0.5", "1.0"];

const QuickDonateModal = () => {
  const { 
    quickDonateCampaign, 
    setQuickDonateCampaign, 
    donate, 
    address, 
    balance, 
    connectWallet,
    showToast 
  } = useStateContext();

  const [amount, setAmount] = useState('0.1');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!quickDonateCampaign) return null;

  const effectiveAmount = isCustom ? customAmount : amount;
  const targetFloat = parseFloat(quickDonateCampaign.target) || 1;
  const donateFloat = parseFloat(effectiveAmount) || 0;
  const impactPercentage = ((donateFloat / targetFloat) * 100).toFixed(1);

  const handlePresetClick = (val) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleDonateSubmit = async (e) => {
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
      await donate(quickDonateCampaign.pId, effectiveAmount);
      setIsSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setQuickDonateCampaign(null);
      }, 3000);
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Donation transaction failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/[0.12] shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={() => setQuickDonateCampaign(null)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-display font-black text-2xl text-white">
              Thank You For Your Kindness!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your contribution of <span className="text-emerald-400 font-mono font-bold">{effectiveAmount} ETH</span> was transferred directly on-chain to <span className="text-white font-medium">{quickDonateCampaign.title}</span>.
            </p>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleDonateSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  Quick Direct Giving
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white line-clamp-1">
                {quickDonateCampaign.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Goal: {quickDonateCampaign.target} ETH • Collected: {quickDonateCampaign.amountCollected} ETH
              </p>
            </div>

            {/* ETH Preset Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Select Donation Amount (ETH)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ETH_PRESETS.map((val) => {
                  const isSelected = !isCustom && amount === val;
                  return (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handlePresetClick(val)}
                      className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
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

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Or enter custom amount:</span>
                {address && (
                  <span className="text-slate-400 font-mono">
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
                  placeholder="0.05"
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

            {/* Impact Calculation Preview Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Impact on Goal:</span>
              </div>
              <span className="font-mono font-bold text-emerald-300 text-sm">
                +{impactPercentage}%
              </span>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-2">
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
                    <span>Donate {effectiveAmount || '0'} ETH Now</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% direct smart contract routing • Zero platform fee</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default QuickDonateModal;
