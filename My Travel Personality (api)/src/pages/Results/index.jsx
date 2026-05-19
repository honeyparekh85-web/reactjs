import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, RotateCcw, Globe, Palette, Share2, Download, Check, ArrowRight } from 'lucide-react';
import useTravelStore from '../../store/useTravelStore';
import AnimatedButton from '../../components/ui/AnimatedButton';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }),
};

export default function Results() {
  const navigate = useNavigate();
  const { personality, dreamCountry, countryData, resetQuiz, hasGenerated } = useTravelStore();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!hasGenerated || !personality) {
      navigate('/quiz');
    }
  }, [hasGenerated, personality, navigate]);

  if (!personality) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    // Simulate saving profile to local storage or API
    const savedProfiles = JSON.parse(localStorage.getItem('wander_souls') || '[]');
    const newProfile = {
      id: Date.now(),
      personality: personality.type,
      country: dreamCountry,
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem('wander_souls', JSON.stringify([...savedProfiles, newProfile]));
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-28 pb-20 relative overflow-hidden bg-[#050816]">
      {/* Dynamic Aura Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-pink-500/10 via-transparent to-transparent rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          {/* Circular Glass Container for Emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.1 }}
            className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full glass mb-6 relative group"
          >
            {/* Glowing ring */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${personality.color} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500`} />
            <span className="text-5xl sm:text-6xl z-10 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {personality.emoji}
            </span>
          </motion.div>

          {/* Badge (Cleanly stacked below) */}
          <div className="flex justify-center mb-4">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-wider text-orange-400 border border-orange-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Travel Personality Type
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-4"
          >
            You are a <span className="text-gradient-sunset">{personality.type}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="text-white/60 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic"
          >
            "{personality.tagline}"
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {/* Card 1: Dream Country */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">Dream Destination</span>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1">{dreamCountry}</h3>
            {countryData && (
              <p className="text-white/50 text-xs mt-1">
                Capital: {countryData.capital} · {countryData.subregion || countryData.region}
              </p>
            )}
          </div>

          {/* Card 2: Travel Aura */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden group hover:border-orange-500/30 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">Travel Aura</span>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1 flex items-center gap-2">
              <span className={`inline-block w-4 h-4 rounded-full bg-gradient-to-r ${personality.color} shadow-sm`} />
              {personality.aura}
            </h3>
            <p className="text-white/50 text-xs mt-1">Reflecting your energetic preferences</p>
          </div>

          {/* Card 3: Personality Vibe */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden group hover:border-pink-500/30 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">Design Aesthetic</span>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1">{personality.type.split(' ')[0]}</h3>
            <p className="text-white/50 text-xs mt-1">Cravings for matching visuals & arts</p>
          </div>

          {/* Card 4: Soul Summary (Spans 3 cols on desktop) */}
          <div className="md:col-span-3 glass rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/15 to-pink-500/15 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">Your Soul Summary</span>
            </div>
            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              {personality.summary}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons & Share Options */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center justify-center gap-6"
        >
          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <AnimatedButton to="/country" icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto">
              Explore {dreamCountry}
            </AnimatedButton>
            <AnimatedButton to="/mood-board" variant="secondary" icon={<Palette className="w-5 h-5" />} className="w-full sm:w-auto">
              View Mood Board
            </AnimatedButton>
          </div>

          {/* Save & Share Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2.5 max-w-md w-full">
            {/* Save Profile Button */}
            {/* Save Profile Button */}
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm font-semibold transition-all text-white/80 hover:text-white cursor-pointer"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Profile Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-orange-400" />
                  <span>Save Profile</span>
                </>
              )}
            </button>

            {/* Splitter */}
            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            {/* Share Link Button */}
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm font-semibold transition-all text-white/80 hover:text-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>Share Results</span>
                </>
              )}
            </button>
          </div>

          {/* Retake Journey */}
          <button
            onClick={() => { resetQuiz(); navigate('/quiz'); }}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium transition-colors mt-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Start New Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
}
