'use client';

import { motion } from 'framer-motion';

export default function ActivityChart() {
  const cellCount = 35;
  
  const levels = Array.from({ length: cellCount }, (_, idx) => {
    const x = Math.sin(idx + 1) * 10000;
    const rand = x - Math.floor(x);
    if (rand < 0.35) return 0;
    if (rand < 0.6) return 1;
    if (rand < 0.85) return 2;
    return 3;
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-zinc-800/40 border-white/5';
      case 1: return 'bg-primary/20 border-primary/10';
      case 2: return 'bg-primary/50 border-primary/20';
      case 3: return 'bg-primary border-primary/30 shadow-[0_0_8px_rgba(192,193,255,0.3)]';
      default: return 'bg-zinc-800/40';
    }
  };

  return (
    <motion.section
      className="glass-tile rounded-xl p-6 flex flex-col h-full justify-between"
      whileHover={{
        scale: 1.02,
        borderColor: 'rgba(192, 193, 255, 0.4)',
        boxShadow: '0 0 20px rgba(192, 193, 255, 0.05)',
      }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md font-bold text-white text-base tracking-wide">Learning Activity</h3>
        <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer select-none">more_horiz</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-4">
        <div className="grid grid-cols-7 grid-rows-5 gap-1.5 w-full max-w-[240px] aspect-[7/5]">
          {levels.map((level, idx) => (
            <motion.div
              key={idx}
              className={`heatmap-cell w-full h-full rounded transition-all duration-300 border ${getCellColor(level)} cursor-pointer`}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 10 }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] font-label-caps text-on-surface-variant/60">
        <span>LESS</span>
        <div className="flex gap-1.5">
          <div className="heatmap-cell w-3.5 h-3.5 bg-zinc-800/40 rounded-[2px] border border-white/5"></div>
          <div className="heatmap-cell w-3.5 h-3.5 bg-primary/20 rounded-[2px] border border-primary/10"></div>
          <div className="heatmap-cell w-3.5 h-3.5 bg-primary/50 rounded-[2px] border border-primary/20"></div>
          <div className="heatmap-cell w-3.5 h-3.5 bg-primary rounded-[2px] border border-primary/30"></div>
        </div>
        <span>MORE</span>
      </div>
    </motion.section>
  );
}
