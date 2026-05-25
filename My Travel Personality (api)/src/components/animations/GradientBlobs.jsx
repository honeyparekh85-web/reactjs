import { motion } from 'framer-motion';

const blobs = [
  { color: 'bg-orange-500/20', size: 'w-96 h-96', position: 'top-0 -left-48', delay: 0 },
  { color: 'bg-blue-500/15', size: 'w-80 h-80', position: 'top-1/3 -right-40', delay: 2 },
  { color: 'bg-pink-500/10', size: 'w-72 h-72', position: 'bottom-0 left-1/4', delay: 4 },
  { color: 'bg-purple-500/10', size: 'w-64 h-64', position: '-bottom-32 right-1/3', delay: 1 },
];

export default function GradientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.position} ${blob.color} rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 12,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
