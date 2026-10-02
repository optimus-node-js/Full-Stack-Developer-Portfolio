import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import SEO from '@/components/SEO';
import SpotlightOverlay, { useSpotlight } from '@/components/SpotlightSearch';
import AIChatbot from '@/components/AIChatbot';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const JourneyPage = lazy(() => import('@/pages/JourneyPage'));
const WorkPage = lazy(() => import('@/pages/WorkPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ContactedPage = lazy(() => import('@/pages/Contacted'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const CaseStudiesPage = lazy(() => import('@/pages/CaseStudiesPage'));
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'));
const HowIWorkPage = lazy(() => import('@/pages/HowIWorkPage'));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground animate-pulse">
            RV
          </div>
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contacted" element={<ContactedPage />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/how-i-work" element={<HowIWorkPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function ThemeBootstrap() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);
  return null;
}

function AppShell() {
  const { isOpen, open, close, platform } = useSpotlight();

  return (
    <>
      <ThemeBootstrap />
      <SEO />
      <Navigation onSearchOpen={open} platform={platform} />
      <AnimatedRoutes />
      <Footer />
      <MobileBottomNav onSearchOpen={open} />
      <SpotlightOverlay isOpen={isOpen} onClose={close} />
      <AIChatbot />
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
