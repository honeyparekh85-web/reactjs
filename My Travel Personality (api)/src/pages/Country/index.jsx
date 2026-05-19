import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Globe, Languages, Banknote, Clock, ArrowRight, Utensils, Music, CalendarDays, Star, Compass, Play, Pause, ChevronRight } from 'lucide-react';
import useTravelStore from '../../store/useTravelStore';
import { fetchCountryByName } from '../../services/api/countries';
import { itineraryData, defaultItinerary } from '../../services/api/mockData';
import AnimatedButton from '../../components/ui/AnimatedButton';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const countryImages = {
  Japan: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  Greece: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
  'South Korea': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1200&q=80',
  'New Zealand': 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=80',
  Italy: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1200&q=80',
  Maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
  Morocco: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80',
  Iceland: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80',
};

export default function Country() {
  const navigate = useNavigate();
  const { dreamCountry, countryData, setCountryData, personality } = useTravelStore();
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!dreamCountry) {
      navigate('/quiz');
      return;
    }
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCountryByName(dreamCountry);
        if (data) setCountryData(data);
      } catch (err) {
        console.error("Error loading country data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dreamCountry, navigate, setCountryData]);

  const itinerary = itineraryData[dreamCountry] || defaultItinerary;
  const heroImg = countryImages[dreamCountry] || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-orange-400"
        >
          <Compass className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }

  const stats = countryData ? [
    { icon: MapPin, label: 'Capital', value: countryData.capital, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: Users, label: 'Population', value: (countryData.population / 1e6).toFixed(1) + 'M', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: Languages, label: 'Language', value: countryData.languages[0] || 'N/A', color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { icon: Banknote, label: 'Currency', value: countryData.currencies[0] || 'N/A', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Globe, label: 'Region', value: countryData.subregion || countryData.region, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { icon: Clock, label: 'Timezone', value: countryData.timezones?.[0] || 'N/A', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ] : [];

  return (
    <div className="bg-[#050816] min-h-screen text-white pb-24 relative overflow-hidden">
      {/* Top Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40vh] right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Parallax Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={heroImg} alt={dreamCountry} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 sm:pb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {countryData?.flag && (
              <img
                src={countryData.flag}
                alt=""
                className="w-16 h-10 rounded-lg object-cover mb-6 shadow-xl border border-white/10"
              />
            )}
            <p className="text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">Your Soul Match Destination</p>
            <h1 className="font-display text-5xl sm:text-8xl font-black tracking-tight leading-none text-white mb-4">
              {dreamCountry}
            </h1>
            {personality && (
              <p className="text-white/60 text-lg sm:text-xl font-medium italic max-w-xl border-l-2 border-orange-500/50 pl-4 py-1">
                "{personality.tagline}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info & Stats Grid (Bento Style) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass rounded-3xl p-5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-36"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-0.5">{s.label}</p>
                <p className="text-white font-bold text-sm sm:text-base truncate">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main content grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        
        {/* Left 2 Columns: Itinerary */}
        <div className="lg:col-span-2 space-y-16">
          {/* Itinerary Timeline */}
          <section>
            <div className="mb-10">
              <span className="text-cyan-400 text-xs font-extrabold tracking-widest uppercase block mb-2">Curated Journey</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                {itinerary.days.length}-Day <span className="text-gradient-ocean">Dream Trip</span>
              </h2>
            </div>
            
            {/* Timeline */}
            <div className="relative border-l border-white/10 pl-6 ml-4 space-y-10">
              {itinerary.days.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-orange-500 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  
                  <div className="glass rounded-3xl p-6 sm:p-8 hover:border-orange-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-orange-400 text-xs font-extrabold uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-md">
                        Day {day.day}
                      </span>
                      <h3 className="text-white font-extrabold text-lg sm:text-xl">{day.title}</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {day.activities.map((act, j) => (
                        <li key={j} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-orange-400/80 flex-shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Column: Hotels & Music Player */}
        <div className="space-y-12">
          {/* Handpicked Hotels */}
          <section>
            <div className="mb-8">
              <span className="text-yellow-400 text-xs font-extrabold tracking-widest uppercase block mb-2">Curated Stays</span>
              <h2 className="font-display text-2xl font-extrabold text-white">
                Handpicked <span className="text-gradient-gold">Luxury</span>
              </h2>
            </div>
            <div className="space-y-4">
              {itinerary.hotels.map((hotel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass rounded-3xl p-5 hover:border-yellow-500/20 transition-all duration-300 flex items-center gap-4 relative overflow-hidden group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/15 to-orange-500/15 flex items-center justify-center flex-shrink-0 text-2xl">
                    🏨
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{hotel.name}</h4>
                    <p className="text-white/40 text-xs mt-0.5">{hotel.type} · {hotel.price}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xs">{hotel.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Playlist (Music Card) */}
          <section>
            <div className="mb-8">
              <span className="text-purple-400 text-xs font-extrabold tracking-widest uppercase block mb-2">Soundtrack</span>
              <h2 className="font-display text-2xl font-extrabold text-white">
                Wanderlust <span className="text-purple-400">Vibes</span>
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 relative overflow-hidden border border-purple-500/20"
            >
              <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-purple-500/20 blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0 group overflow-hidden">
                  <div className="absolute inset-1 rounded-full border border-neutral-800" />
                  <div className="absolute inset-3 rounded-full border border-neutral-700" />
                  <div className="absolute inset-5 rounded-full border border-neutral-600" />
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center z-10" />
                  
                  <motion.div
                    className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  />
                </div>
                
                <div className="min-w-0">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Now Playing</span>
                  <h4 className="text-white font-extrabold text-base truncate mb-0.5">{itinerary.playlist.name}</h4>
                  <p className="text-purple-300 text-xs font-semibold">{itinerary.playlist.mood}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                  </button>
                  
                  <div className="flex-1 flex items-end justify-center gap-0.5 h-6">
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full"
                        animate={{ height: isPlaying ? [4, 16 + Math.random() * 8, 4] : 4 }}
                        transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/30 font-bold">
                  <span>{isPlaying ? '0:45' : '0:00'}</span>
                  <span>3:12</span>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Food Recommendations (Full Width Section below the grid) */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="mb-10 text-center md:text-left">
          <span className="text-pink-400 text-xs font-extrabold tracking-widest uppercase block mb-2">Local Cuisine</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Taste the <span className="text-gradient-sunset">Destination</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itinerary.foods.map((food, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass rounded-3xl p-6 hover:border-pink-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                <Utensils className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{food.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{food.desc}</p>
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-orange-400/10 text-orange-300 px-2.5 py-1 rounded-md">
                {food.vibe}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="mt-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <AnimatedButton to="/mood-board" icon={<ArrowRight className="w-5 h-5" />}>
            View Your Mood Board
          </AnimatedButton>
          
          <div className="mt-6">
            <Link to="/" className="inline-block text-white/40 hover:text-white/70 text-sm font-semibold transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
