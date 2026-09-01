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
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col relative selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Background Ambient Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-500/08 rounded-full blur-[140px]" />
      </div>

      {/* Floating Navbar */}
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

      {/* Global Modals & Notifications */}
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

      {/* Aesthetic Web3 Footer */}
      <Footer 
        onOpenHowItWorks={() => setHowItWorksOpen(true)} 
      />
    </div>
  );
};

export default App;