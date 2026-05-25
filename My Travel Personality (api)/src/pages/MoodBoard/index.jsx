import { motion } from 'framer-motion';
import { Image, Quote, Download, RotateCcw, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useTravelStore from '../../store/useTravelStore';
import AnimatedButton from '../../components/ui/AnimatedButton';

const travelQuotes = [
  '"The world is a book and those who do not travel read only one page." — St. Augustine',
  '"Travel is the only thing you buy that makes you richer."',
  '"Not all those who wander are lost." — J.R.R. Tolkien',
  '"Life is short and the world is wide."',
  '"Adventure is worthwhile." — Aesop',
  '"To travel is to live." — Hans Christian Andersen',
];

const moodImages = {
  Japan: [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80',
    'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80',
    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80',
    'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&q=80',
    'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&q=80',
  ],
  Greece: [
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80',
    'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&q=80',
    'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80',
    'https://images.unsplash.com/photo-1601581975053-7c899da7347e?w=400&q=80',
    'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&q=80',
  ],
};

const defaultImages = [
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
  'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=400&q=80',
];

// Masonry layout sizes
const sizes = ['row-span-2', '', 'row-span-2', '', '', 'row-span-2', '', ''];

export default function MoodBoard() {
  const { dreamCountry, personality } = useTravelStore();
  const navigate = useNavigate();
  const images = moodImages[dreamCountry] || defaultImages;
  const quote = travelQuotes[Math.floor(Math.random() * travelQuotes.length)];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-pink-500/8 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-pink-300 mb-4">
            <Image className="w-3.5 h-3.5" />
            Travel Mood Board
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-3">
            {dreamCountry ? (
              <><span className="text-gradient-sunset">{dreamCountry}</span> Aesthetic</>
            ) : (
              <>Your Travel <span className="text-gradient-sunset">Aesthetic</span></>
            )}
          </h1>
          {personality && (
            <p className="text-white/40 text-sm">{personality.emoji} {personality.type} · {personality.aura}</p>
          )}
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-10 text-center max-w-2xl mx-auto"
        >
          <Quote className="w-5 h-5 text-orange-400/60 mx-auto mb-3" />
          <p className="text-white/50 text-sm italic leading-relaxed">{quote}</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className={`${sizes[i] || ''} rounded-2xl overflow-hidden group cursor-pointer relative`}
            >
              <img src={img} alt={`Mood ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {!dreamCountry && (
            <AnimatedButton to="/quiz" icon={<Sparkles className="w-5 h-5" />}>
              Take the Quiz First
            </AnimatedButton>
          )}
          {dreamCountry && (
            <>
              <AnimatedButton to="/country" icon={<Sparkles className="w-5 h-5" />}>
                Explore {dreamCountry}
              </AnimatedButton>
              <button onClick={() => { navigate('/quiz'); }}
                className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> New Personality
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
