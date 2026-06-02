'use client';

import { MouseEvent, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import ActivityChart from './ActivityChart';
import { Course } from '@/lib/supabase';
import { AlertCircle, ServerCrash } from 'lucide-react';

interface BentoGridProps {
  courses: Course[];
  isMock: boolean;
  dbError: string | null;
}

export default function BentoGrid({ courses, isMock, dbError }: BentoGridProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      }
    },
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {isMock && (
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Local Mock Data Mode:</strong> Supabase environment variables are missing. Configure <code>.env.local</code> to fetch real-time course progress.
            </span>
          </div>
        </motion.div>
      )}

      {dbError && (
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <ServerCrash className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>
              <strong>Database Connection Issue:</strong> {dbError}. Showing fallback courses.
            </span>
          </div>
        </motion.div>
      )}

      {!isMock && !dbError && (
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-sm animate-pulse">database</span>
            <span>
              <strong>Supabase Connection Live:</strong> Securely connected to PostgreSQL DB via Next.js Server Components (RSC).
            </span>
          </div>
        </motion.div>
      )}

      <div className="bento-grid">
        <motion.section 
          variants={itemVariants}
          onMouseMove={handleMouseMove}
          className="col-span-12 md:col-span-8 glass-tile active-glow rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 27, 0.75), rgba(24, 24, 27, 0.75)),
              radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, rgba(192, 193, 255, 0.14), transparent)
            `
          }}
          whileHover={{
            scale: 1.01,
          }}
          transition={{
            type: 'spring' as const,
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-label-caps text-[10px] mb-4">
              SYSTEMS NOMINAL
            </span>
            <h2 className="font-display text-[42px] md:text-[56px] font-bold leading-none mb-2 text-white">
              Welcome back,<br/>
              <span className="text-primary-container">Alex</span>
            </h2>
            <p className="text-on-surface-variant font-body-lg max-w-md">
              Your cognitive throughput is up 12% today. You have {courses.length} high-priority modules awaiting completion.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6 relative z-10">
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-caps text-[10px]">CURRENT STREAK</span>
              <div className="flex items-center gap-2">
                <span className="text-headline-lg font-bold text-primary">14</span>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant/30"></div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-caps text-[10px]">KNOWLEDGE POINTS</span>
              <div className="flex items-center gap-2 text-headline-lg font-bold">
                4,892 <span className="text-primary-container">XP</span>
              </div>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'wght' 100" }}>
              psychology
            </span>
          </div>
        </motion.section>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-4">
          <ActivityChart />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 flex items-center justify-between mt-4">
          <h3 className="font-headline-lg text-primary text-xl font-bold">Active Modules</h3>
          <button className="text-on-surface-variant font-label-caps text-xs hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
            VIEW SYLLABUS <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </motion.div>

        {courses.map((course, index) => (
          <motion.div key={course.id} variants={itemVariants} className="col-span-12 md:col-span-4">
            <CourseCard course={course} index={index} />
          </motion.div>
        ))}

        <motion.section 
          variants={itemVariants} 
          className="col-span-12 glass-tile rounded-xl p-6 md:p-8 mt-4"
          whileHover={{
            scale: 1.005,
          }}
          transition={{
            type: 'spring' as const,
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-1">
              <h3 className="font-headline-lg text-lg font-bold text-white mb-2">Intelligence Brief</h3>
              <p className="text-on-surface-variant text-body-lg">
                Based on your recent performance in &quot;Neural Networks&quot;, we suggest focusing on 1D-Convolution layers.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
                <span className="text-[10px] font-label-caps text-on-surface-variant mb-1 block">FOCUS TIME</span>
                <span className="text-headline-md font-bold text-primary">42.5h</span>
              </div>
              <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
                <span className="text-[10px] font-label-caps text-on-surface-variant mb-1 block">ACCURACY</span>
                <span className="text-headline-md font-bold text-tertiary">94.2%</span>
              </div>
              <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
                <span className="text-[10px] font-label-caps text-on-surface-variant mb-1 block">RETENTION</span>
                <span className="text-headline-md font-bold text-secondary">88%</span>
              </div>
              <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
                <span className="text-[10px] font-label-caps text-on-surface-variant mb-1 block">WORLD RANK</span>
                <span className="text-headline-md font-bold text-primary-container">#128</span>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}
