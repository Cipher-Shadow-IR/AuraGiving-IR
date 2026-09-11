import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import AuraPreloader from './components/AuraPreloader';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  const location = useLocation();
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#000000] text-[#0f172a] dark:text-[#F3F4F6] flex flex-col relative selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-emerald-500/20 dark:selection:text-emerald-400 transition-colors duration-200">
      
      <AuraPreloader />

      <ScrollToTop />

      <SpotlightGlow />

      <Navbar 
        onOpenHowItWorks={() => setHowItWorksOpen(true)}
        onOpenTutorial={() => setTutorialOpen(true)}
      />

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Home 
                    onOpenHowItWorks={() => setHowItWorksOpen(true)}
                    onOpenTutorial={() => setTutorialOpen(true)}
                  />
                </PageTransition>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              } 
            />
            <Route 
              path="/create-campaign" 
              element={
                <PageTransition>
                  <CreateCampaign />
                </PageTransition>
              } 
            />
            <Route 
              path="/campaign-details/:id" 
              element={
                <PageTransition>
                  <CampaignDetails />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>

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

      <Footer 
        onOpenHowItWorks={() => setHowItWorksOpen(true)} 
      />
    </div>
  );
};

export default App;