import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { 
  Sparkles, 
  PlusCircle, 
  Image as ImageIcon, 
  Calendar, 
  Coins, 
  FileText, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  HeartHandshake
} from 'lucide-react';
import { useStateContext } from '../context';
import { FormField, Loader, CustomButton, FundCard } from '../components';
import { checkIfImage } from '../utils';

const CURATED_IMAGES = [
  {
    name: "Clean Water",
    url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=80",
    category: "Emergency Relief"
  },
  {
    name: "Rainforest",
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80",
    category: "Environment & Nature"
  },
  {
    name: "Healthcare",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    category: "Healthcare & Medicine"
  },
  {
    name: "STEM Education",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    category: "Education & Youth"
  },
  {
    name: "Animal Sanctuary",
    url: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200&auto=format&fit=crop&q=80",
    category: "Animal Rescue"
  },
];

const CATEGORIES = [
  "Emergency Relief",
  "Environment & Nature",
  "Healthcare & Medicine",
  "Education & Youth",
  "Animal Rescue",
  "Open Source & Tech",
  "Community"
];

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign, address, connectWallet, showToast } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    category: 'Emergency Relief',
    description: '',
    target: '',
    deadline: '',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=80'
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleDateShortcut = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const dateStr = d.toISOString().split('T')[0];
    setForm({ ...form, deadline: dateStr });
  };

  const handleSelectPresetImage = (preset) => {
    setForm({
      ...form,
      image: preset.url,
      category: preset.category
    });
    showToast(`Selected ${preset.name} image preset! 🎨`, "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      connectWallet();
      return;
    }

    if (!form.title.trim() || !form.description.trim() || !form.target || !form.deadline) {
      showToast("Please fill out all required fields", "error");
      return;
    }

    if (parseFloat(form.target) <= 0) {
      showToast("Target goal must be greater than 0 ETH", "error");
      return;
    }

    const selectedDeadline = new Date(form.deadline).getTime();
    if (selectedDeadline <= Date.now()) {
      showToast("Deadline must be a future date", "error");
      return;
    }

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          // Pass target in standard ETH unit; createCampaign parses into wei
          await createCampaign({
            ...form,
            target: form.target,
          });
          navigate('/');
        } catch (error) {
          console.error("Create campaign failed:", error);
          showToast(error?.message || "Failed to create campaign on blockchain", "error");
        } finally {
          setIsLoading(false);
        }
      } else {
        showToast("Please provide a valid, accessible image URL", "error");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {isLoading && <Loader message="Deploying new cause to Ethereum smart contract..." />}

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span>100% Direct Blockchain Philanthropy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Creation Wizard */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch a New Mission</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Create a Transparent Cause
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Your campaign will be deployed onto the Ethereum blockchain, allowing anyone in the world to contribute directly to your wallet.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Creator Name & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                labelName="Organizer / Organization Name *"
                placeholder="e.g. Elena Rostova or SolarAid Initiative"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
                required
              />

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Cause Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleFormFieldChange('category', e)}
                  className="w-full py-3 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-emerald-500/50 backdrop-blur-md cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0f172a] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campaign Title */}
            <FormField
              labelName="Campaign Title *"
              placeholder="e.g. Clean Water Wells for Rural Communities"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
              required
            />

            {/* Story / Description */}
            <FormField
              labelName="Story & Mission Narrative *"
              placeholder="Explain the background, why this cause matters, and how every wei of donated ETH will be utilized..."
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
              hint="Be transparent and inspiring"
              required
            />

            {/* Direct Payout Guarantee Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-emerald-300">You Receive 100% of All Donations</p>
                <p className="text-slate-300 mt-0.5">
                  Ethereum smart contracts automatically send all funds directly to your connected wallet. AuraGiving takes 0% cut.
                </p>
              </div>
            </div>

            {/* Goal & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                labelName="Funding Goal (ETH) *"
                placeholder="e.g. 5.0"
                inputType="number"
                step="0.01"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
                icon={Coins}
                hint="Target in Ether"
                required
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    End Date *
                  </label>
                  <div className="flex gap-1 text-[10px] font-semibold text-emerald-400">
                    <button type="button" onClick={() => handleDateShortcut(7)} className="hover:underline">+7d</button>
                    <span>•</span>
                    <button type="button" onClick={() => handleDateShortcut(30)} className="hover:underline">+30d</button>
                    <span>•</span>
                    <button type="button" onClick={() => handleDateShortcut(90)} className="hover:underline">+90d</button>
                  </div>
                </div>

                <input
                  type="date"
                  required
                  value={form.deadline}
                  onChange={(e) => handleFormFieldChange('deadline', e)}
                  className="w-full py-3 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-emerald-500/50 backdrop-blur-md cursor-pointer"
                />
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div className="space-y-3">
              <FormField
                labelName="Campaign Cover Image URL *"
                placeholder="https://images.unsplash.com/..."
                inputType="url"
                value={form.image}
                handleChange={(e) => handleFormFieldChange('image', e)}
                icon={ImageIcon}
                hint="Provide high-res URL or pick a preset below"
                required
              />

              {/* Quick Image Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Quick Image Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {CURATED_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => handleSelectPresetImage(preset)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Launch Campaign On-Chain</span>
              </button>
            </div>

          </form>

        </div>

        {/* Right Column: Real-Time Live Card Preview */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
              Live Realtime Preview
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              As seen by donors
            </span>
          </div>

          <FundCard
            owner={address || "0xYourWalletAddress..."}
            title={form.title || "Your Campaign Title Goes Here"}
            description={form.description || "Your mission story will appear here for backers and donors to read..."}
            target={form.target || "10.0"}
            deadline={form.deadline ? new Date(form.deadline).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 30}
            amountCollected="0.0"
            image={form.image || "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200"}
            category={form.category}
            pId={9999}
            donators={[]}
            isSample={false}
          />

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1.5 text-center">
            <p className="font-semibold text-slate-300">Tips for a Great Campaign</p>
            <p>Use an authentic high-resolution image, explain your budget breakdown, and share with your community once published.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateCampaign;