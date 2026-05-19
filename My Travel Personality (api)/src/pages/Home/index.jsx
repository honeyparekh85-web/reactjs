import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Compass, Star, Palette, Music, Globe, ChevronRight } from 'lucide-react';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { featuredDestinations, testimonials } from '../../services/api/mockData';

const FloatingParticles = lazy(() => import('../../components/animations/FloatingParticles'));

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const personalityTypes = [
  { name: 'Moonlight Explorer', emoji: '🌙', desc: 'Dreamy & artistic', color: 'from-indigo-500/20 to-purple-500/20' },
  { name: 'Sunset Wanderer', emoji: '🌅', desc: 'Warm & romantic', color: 'from-orange-500/20 to-pink-500/20' },
  { name: 'Neon Nomad', emoji: '💜', desc: 'Bold & electric', color: 'from-fuchsia-500/20 to-cyan-500/20' },
  { name: 'Ocean Dreamer', emoji: '🌊', desc: 'Calm & deep', color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Golden Soul', emoji: '✨', desc: 'Elegant & passionate', color: 'from-yellow-500/20 to-red-500/20' },
  { name: 'Wild Spirit', emoji: '🌿', desc: 'Free & fearless', color: 'from-emerald-500/20 to-yellow-500/20' },
];

const features = [
  { icon: Globe, title: 'Dream Destination', desc: 'AI matches your personality to the perfect country' },
  { icon: MapPin, title: 'Curated Itinerary', desc: '3-5 day aesthetic travel plan with hidden gems' },
  { icon: Palette, title: 'Travel Mood Board', desc: 'Pinterest-style visual collage of your dream trip' },
  { icon: Music, title: 'Playlist Vibes', desc: 'Soundtrack that matches your destination energy' },
];

const steps = [
  { num: '01', title: 'Take the Quiz', desc: 'Answer 10 beautiful questions about your travel soul' },
  { num: '02', title: 'Discover Your Type', desc: 'Get your unique travel personality and dream country' },
  { num: '03', title: 'Explore & Dream', desc: 'Dive into itineraries, food, playlists, and mood boards' },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particles Background */}
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="initial" animate="animate">
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-white/70 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              AI-Powered Travel Personality Engine
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              <span className="text-white">Discover Your</span>
              <br />
              <span className="text-gradient-sunset">Travel Soul</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Answer 10 soul-searching questions and unlock your dream destination, 
              aesthetic itinerary, and cinematic travel experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton to="/quiz" icon={<Compass className="w-5 h-5" />}>
                Discover Your Travel Soul
              </AnimatedButton>
              <AnimatedButton to="/mood-board" variant="secondary" icon={<Palette className="w-5 h-5" />}>
                View Mood Boards
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {[
                { val: '8', label: 'Personality Types' },
                { val: '50+', label: 'Destinations' },
                { val: '10K+', label: 'Souls Discovered' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient-sunset font-display">{s.val}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          </div>
        </motion.div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Three steps to your <span className="text-gradient-sunset">dream trip</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative glass rounded-3xl p-8 text-center card-hover group"
              >
                <div className="text-5xl font-display font-bold text-gradient-sunset opacity-30 mb-4">{step.num}</div>
                <h3 className="text-white text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                {i < 2 && <ChevronRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DESTINATIONS ========== */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Popular Destinations</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Where will your soul <span className="text-gradient-ocean">take you?</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] card-hover cursor-pointer"
              >
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">{dest.country}</p>
                  <h3 className="text-white text-2xl font-bold font-display">{dest.name}</h3>
                  <p className="text-orange-300/80 text-sm mt-1">{dest.vibe}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PERSONALITY TYPES ========== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">Personality Types</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Which one are <span className="text-gradient-gold">you?</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {personalityTypes.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`rounded-3xl bg-gradient-to-br ${p.color} border border-white/5 p-6 text-center card-hover cursor-pointer`}
              >
                <div className="text-4xl mb-3">{p.emoji}</div>
                <h3 className="text-white font-bold text-sm sm:text-base">{p.name}</h3>
                <p className="text-white/50 text-xs mt-1">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Everything your soul <span className="text-gradient-sunset">needs</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 card-hover group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Loved by <span className="text-gradient-ocean">wanderers</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{t.avatar}</div>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FOOTER ========== */}
      <section className="section-padding relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-12 sm:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">Ready to find your <span className="text-gradient-sunset">soul destination?</span></h2>
              <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">Your dream trip is just 10 questions away. Let your soul guide you.</p>
              <AnimatedButton to="/quiz" icon={<Sparkles className="w-5 h-5" />}>
                Begin Your Journey
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
