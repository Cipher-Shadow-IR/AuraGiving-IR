import React, { useState, useEffect, useCallback } from 'react';
import { Hero, DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = ({ onOpenHowItWorks, onOpenTutorial }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contract, address, getCampaigns } = useStateContext();

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data || []);
    } catch (error) {
      console.error("Failed to load campaigns in Home:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getCampaigns]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns, contract, address]);

  const handleScrollToExplore = () => {
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section with Live Stats & Spotlight */}
      <Hero 
        campaigns={campaigns} 
        onOpenHowItWorks={onOpenHowItWorks}
        onOpenTutorial={onOpenTutorial}
        onScrollToExplore={handleScrollToExplore}
      />

      {/* Main Campaign Discovery Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisplayCampaigns
          title="All Charitable Causes"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </div>
    </div>
  );
};

export default Home;