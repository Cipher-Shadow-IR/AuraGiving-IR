import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Coins,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStateContext } from '../context';

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

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#38bdf8'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setQuickDonateCampaign(null);
      }, 2500);
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Donation failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-[#12151C] border border-white/[0.08] shadow-modal p-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickDonateCampaign(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Donation Successful
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Sent {effectiveAmount} ETH directly to campaign creator.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDonateSubmit} className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                Direct Giving
              </span>
              <h3 className="text-base font-semibold text-white truncate">
                {quickDonateCampaign.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Goal: {quickDonateCampaign.target} ETH • Collected: {quickDonateCampaign.amountCollected} ETH
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Amount (ETH)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ETH_PRESETS.map((val) => {
                  const isSelected = !isCustom && amount === val;
                  return (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handlePresetClick(val)}
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
                  placeholder="0.05"
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

            {/* Impact Calculation Preview */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Goal Impact:</span>
              <span className="text-emerald-400 font-semibold">+{impactPercentage}%</span>
            </div>

            {/* Submit */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 text-xs font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Donation ({effectiveAmount || '0'} ETH)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>100% direct smart contract transfer</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default QuickDonateModal;
