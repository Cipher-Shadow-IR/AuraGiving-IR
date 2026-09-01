import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { 
  Navbar, 
  Footer, 
  Toast, 
  QuickDonateModal, 
  HowItWorksModal,
  TutorialModal
} from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] flex flex-col relative selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Floating Header */}
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