import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Image as ImageIcon, 
  Coins, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useStateContext } from '../context';
import { FormField, FundCard } from '../components';
import { checkIfImage } from '../utils';

const CURATED_IMAGES = [
  {
    name: "Clean Water",
    url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=80",
    category: "Emergency Relief"
  },
  {
    name: "Reforestation",
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80",
    category: "Environment & Nature"
  },
  {
    name: "Healthcare",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    category: "Healthcare & Medicine"
  },
  {
    name: "Education",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    category: "Education & Youth"
  },
  {
    name: "Wildlife",
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
    showToast(`Selected ${preset.name} cover`, "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      connectWallet();
      return;
    }

    if (!form.title.trim() || !form.description.trim() || !form.target || !form.deadline) {
      showToast("Please complete all required fields", "error");
      return;
    }

    if (parseFloat(form.target) <= 0) {
      showToast("Goal must be greater than 0 ETH", "error");
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
          await createCampaign({
            ...form,
            target: form.target,
          });
          navigate('/');
        } catch (error) {
          console.error("Create campaign failed:", error);
          showToast(error?.message || "Failed to deploy campaign", "error");
        } finally {
          setIsLoading(false);
        }
      } else {
        showToast("Please provide a valid image URL", "error");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-8">
      
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </button>

        <span className="text-xs font-mono text-[#34D399] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
          <span>EVM Deployment Verified</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 gradient-border rounded-xl p-6 sm:p-7 space-y-6 shadow-card bg-[#161B26]"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight font-display">
              Launch a Charitable Mission
            </h1>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Deploy your campaign directly to the Ethereum blockchain. All incoming funds route non-custodially to your address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                labelName="Organizer / Organization *"
                placeholder="e.g. Elena Rostova or SolarAid"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
                required
              />

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleFormFieldChange('category', e)}
                  className="w-full py-2 px-3 rounded-lg bg-[#0F131C] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#161B26] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FormField
              labelName="Campaign Title *"
              placeholder="e.g. Clean Drinking Water Wells for Rural Communities"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
              required
            />

            <FormField
              labelName="Mission Narrative & Execution Plan *"
              placeholder="Explain the mission, financial breakdown, timeline, and how contributions will be spent..."
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
              hint="High detail builds donor trust"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                labelName="Target Goal (ETH) *"
                placeholder="e.g. 5.0"
                inputType="number"
                step="0.01"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
                icon={Coins}
                hint="In Ether"
                required
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">
                    Deadline *
                  </label>
                  <div className="flex gap-1 text-[11px] font-mono text-[#3B82F6]">
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
                  className="w-full py-2 px-3 rounded-lg bg-[#0F131C] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <FormField
                labelName="Cover Image URL *"
                placeholder="https://images.unsplash.com/..."
                inputType="url"
                value={form.image}
                handleChange={(e) => handleFormFieldChange('image', e)}
                icon={ImageIcon}
                required
              />

              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[11px] text-[#94A3B8] font-mono">Presets:</span>
                {CURATED_IMAGES.map((preset) => (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => handleSelectPresetImage(preset)}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-[11px] text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-sheen w-full py-2.5 rounded-lg font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all flex items-center justify-center gap-1.5 text-xs active:scale-95 shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deploying Contract...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Deploy Mission On-Chain</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 sticky top-24 space-y-3"
        >
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#3B82F6] font-semibold">
              Live Realtime Preview
            </span>
            <span className="text-[#94A3B8] font-mono text-[11px]">Rendered via Hardhat node</span>
          </div>

          <FundCard
            owner={address || "0xYourAddress..."}
            title={form.title || "Your Campaign Title"}
            description={form.description || "Mission summary will appear here for donors..."}
            target={form.target || "10.0"}
            deadline={form.deadline ? new Date(form.deadline).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 30}
            amountCollected="0.0"
            image={form.image || "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200"}
            category={form.category}
            pId={9999}
            donators={[]}
            isSample={false}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default CreateCampaign;