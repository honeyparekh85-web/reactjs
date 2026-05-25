import { Link } from 'react-router-dom';
import { Compass, Heart, Globe, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050816]/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Compass className="w-7 h-7 text-orange-400" />
              <span className="font-[Poppins] text-xl font-bold">
                <span className="text-white">Wander</span>
                <span className="text-gradient-sunset">Soul</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Discover your travel personality and unlock dream destinations curated by your soul. 
              An AI-powered cinematic travel experience.
            </p>
            <div className="flex gap-4 mt-6">
              {[Globe, Mail, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-orange-400 hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-3">
              {[{ to: '/', label: 'Home' }, { to: '/quiz', label: 'Take Quiz' }, { to: '/mood-board', label: 'Mood Board' }].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/40 hover:text-white/80 text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Vibes</h4>
            <ul className="space-y-3">
              {['Moonlight Explorer', 'Sunset Wanderer', 'Neon Nomad', 'Ocean Dreamer'].map((p) => (
                <li key={p} className="text-white/40 text-sm">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 WanderSoul. All rights reserved.</p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> for dreamers
          </p>
        </div>
      </div>
    </footer>
  );
}
