import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lenis from 'lenis';
import { 
  Navbar, 
  Footer, 
  Toast, 
  QuickDonateModal, 
  HowItWorksModal,
  TutorialModal 
} from './components';
import SpotlightGlow from './components/SpotlightGlow';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  // Initialize Lenis Momentum Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#F3F4F6] flex flex-col relative selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Interactive Cursor Spotlight Glow */}
      <SpotlightGlow />

      {/* Floating Pill Header */}
      <Navbar 
        onOpenHowItWorks={() => setHowItWorksOpen(true)}
        onOpenTutorial={() => setTutorialOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onOpenHowItWorks={() => setHowItWorksOpen(true)}
                onOpenTutorial={() => setTutorialOpen(true)}
              />
            } 
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </main>

      {/* Modals & Notifications */}
      <QuickDonateModal />
      <HowItWorksModal 
        isOpen={howItWorksOpen} 
        onClose={() => setHowItWorksOpen(false)} 
      />
      <TutorialModal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />
      <Toast />

      {/* Minimal Footer */}
      <Footer 
        onOpenHowItWorks={() => setHowItWorksOpen(true)} 
      />
    </div>
  );
};

export default App;