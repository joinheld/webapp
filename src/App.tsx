import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const MentalHealth = lazy(() => import('./pages/MentalHealth'));
const PhysicalRecovery = lazy(() => import('./pages/PhysicalRecovery'));
const BreastfeedingSupport = lazy(() => import('./pages/BreastfeedingSupport'));
const Community = lazy(() => import('./pages/Community'));
const Journal = lazy(() => import('./pages/Journal'));
const HealthcareGuide = lazy(() => import('./pages/HealthcareGuide'));
const Resources = lazy(() => import('./pages/Resources'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mental-health" element={<MentalHealth />} />
            <Route path="physical-recovery" element={<PhysicalRecovery />} />
            <Route path="breastfeeding" element={<BreastfeedingSupport />} />
            <Route path="community" element={<Community />} />
            <Route path="journal" element={<Journal />} />
            <Route path="healthcare" element={<HealthcareGuide />} />
            <Route path="resources" element={<Resources />} />
          </Route>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;