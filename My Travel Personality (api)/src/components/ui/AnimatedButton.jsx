import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function AnimatedButton({ children, to, onClick, className = '', variant = 'primary', icon, disabled = false }) {
  const base = 'relative inline-flex items-center justify-center gap-2.5 font-semibold rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:from-pink-500 hover:to-orange-500 border border-transparent',
    secondary: 'glass text-white px-8 py-4 text-base hover:bg-white/10 hover:border-white/20',
    ghost: 'text-white/70 hover:text-white px-6 py-3 text-sm',
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1 },
    whileTap: { scale: disabled ? 1 : 0.97 },
    className: `${base} ${variants[variant]} ${className}`
  };

  if (to && !disabled) {
    return (
      <MotionLink to={to} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button onClick={onClick} disabled={disabled} {...motionProps}>
      {content}
    </motion.button>
  );
}
