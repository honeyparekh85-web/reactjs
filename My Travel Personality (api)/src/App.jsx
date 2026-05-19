import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './components/layouts/MainLayout';

const Home = lazy(() => import('./pages/Home/index'));
const Quiz = lazy(() => import('./pages/Quiz/index'));
const Results = lazy(() => import('./pages/Results/index'));
const Country = lazy(() => import('./pages/Country/index'));
const MoodBoard = lazy(() => import('./pages/MoodBoard/index'));

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm font-medium">Loading your journey...</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/country" element={<Country />} />
            <Route path="/mood-board" element={<MoodBoard />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
