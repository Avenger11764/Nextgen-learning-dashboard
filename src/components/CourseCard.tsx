'use client';

import { motion } from 'framer-motion';
import { Course } from '@/lib/supabase';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  // Map standard Lucide names to NEURAL_DASH Material Symbol names
  const getMaterialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'code2':
      case 'code':
        return 'atm';
      case 'cpu':
        return 'neurology';
      case 'database':
        return 'calculate';
      case 'sparkles':
        return 'bolt';
      default:
        return 'menu_book';
    }
  };

  // Generate course codes like PHY-302, CS-412, MAT-250
  const getCourseCode = (name: string, idx: number) => {
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const prefix = cleanName.slice(0, 3) || 'GEN';
    return `${prefix}-${200 + idx * 52}`;
  };

  const getProgressGradient = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return 'from-indigo-500 to-emerald-400';
      case 1:
        return 'from-secondary-container to-secondary';
      default:
        return 'from-tertiary-container to-tertiary';
    }
  };

  const iconColorClass = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return 'text-primary';
      case 1:
        return 'text-secondary';
      default:
        return 'text-tertiary';
    }
  };

  return (
    <motion.article
      className="glass-tile rounded-xl p-6 mesh-gradient-1 relative group cursor-pointer flex flex-col justify-between h-[280px]"
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
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-surface/80 flex items-center justify-center border border-outline-variant/30 shadow-inner">
          <span className={`material-symbols-outlined ${iconColorClass(index)} text-3xl`}>
            {getMaterialIcon(course.icon_name)}
          </span>
        </div>
        <span className={`font-code text-xs ${index % 2 === 0 ? 'text-primary/80' : 'text-secondary/80'}`}>
          {getCourseCode(course.title, index)}
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="font-headline-md font-bold text-white tracking-wide text-lg line-clamp-1">{course.title}</h4>
        <p className="text-on-surface-variant text-body-sm line-clamp-2">
          High-performance training module. Fully synchronized hardware-accelerated learning node.
        </p>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-[10px] font-label-caps text-on-surface-variant">
          <span>PROGRESS</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressGradient(index)} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              type: 'spring' as const,
              stiffness: 80,
              damping: 15,
              delay: 0.2 + index * 0.1,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
