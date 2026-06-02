'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import BentoGrid from './BentoGrid';
import CourseCard from './CourseCard';
import { Course } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardContainerProps {
  courses: Course[];
  isMock: boolean;
  dbError: string | null;
}

export default function DashboardContainer({ courses, isMock, dbError }: DashboardContainerProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [engineGpu, setEngineGpu] = useState(true);
  const [prefetchRoute, setPrefetchRoute] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <BentoGrid courses={courses} isMock={isMock} dbError={dbError} />;
        
      case 'courses':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-label-caps text-[10px] mb-2">
                ACTIVE STATUS
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tighter">
                Registered Curriculum
              </h2>
              <p className="text-on-surface-variant text-body-sm mt-1">
                Your registered modules configured via the high-performance Neural database.
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.map((course, index) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'analytics': // Intelligence Page
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-caps text-[10px] mb-2">
                COGNITIVE ENGINE
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tighter">
                Intelligence Brief
              </h2>
              <p className="text-on-surface-variant text-body-sm mt-1">
                Deep analysis of cognitive speed, retention rates, and active focus sectors.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats Card */}
              <motion.div variants={itemVariants} className="glass-tile rounded-xl p-6 space-y-6">
                <h3 className="font-headline-md font-bold text-white text-lg">Key Performance Metrics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-on-surface-variant">
                      <span>COGNITIVE ACCURACY</span>
                      <span className="text-tertiary">94.2%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: '94.2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-on-surface-variant">
                      <span>KNOWLEDGE RETENTION</span>
                      <span className="text-secondary">88.0%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-on-surface-variant">
                      <span>CONCENTRATION DEPTH</span>
                      <span className="text-primary">82.5%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '82.5%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Analysis Recommendations */}
              <motion.div variants={itemVariants} className="glass-tile rounded-xl p-6 space-y-4">
                <h3 className="font-headline-md font-bold text-white text-lg">Focus Suggestions</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/10 flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Target 1D-Convolution</h4>
                      <p className="text-xs text-on-surface-variant">Revise kernel padding patterns to improve accuracy.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/10 flex gap-3 items-center">
                    <span className="material-symbols-outlined text-tertiary text-xl">bolt</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Accelerate Math Integrals</h4>
                      <p className="text-xs text-on-surface-variant">Solve 5 extra Multivariable Calculus modules.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'performance': // Performance Page
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 rounded-full bg-tertiary/20 text-tertiary font-label-caps text-[10px] mb-2">
                METRIC MONITOR
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tighter">
                Performance Status
              </h2>
              <p className="text-on-surface-variant text-body-sm mt-1">
                Visualizing weekly upgrades, cognitive spikes, and historical performance tracking.
              </p>
            </motion.div>

            {/* Glowing Analytics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="glass-tile rounded-lg p-5 border border-outline-variant/20 flex flex-col justify-between h-28">
                <span className="text-[10px] font-label-caps text-on-surface-variant">FOCUS TIME</span>
                <span className="text-2xl font-bold text-primary">42.5h</span>
              </motion.div>
              <motion.div variants={itemVariants} className="glass-tile rounded-lg p-5 border border-outline-variant/20 flex flex-col justify-between h-28">
                <span className="text-[10px] font-label-caps text-on-surface-variant">ACCURACY</span>
                <span className="text-2xl font-bold text-tertiary">94.2%</span>
              </motion.div>
              <motion.div variants={itemVariants} className="glass-tile rounded-lg p-5 border border-outline-variant/20 flex flex-col justify-between h-28">
                <span className="text-[10px] font-label-caps text-on-surface-variant">RETENTION</span>
                <span className="text-2xl font-bold text-secondary">88.0%</span>
              </motion.div>
              <motion.div variants={itemVariants} className="glass-tile rounded-lg p-5 border border-outline-variant/20 flex flex-col justify-between h-28">
                <span className="text-[10px] font-label-caps text-on-surface-variant">GLOBAL RANK</span>
                <span className="text-2xl font-bold text-primary-container">#128</span>
              </motion.div>
            </div>

            {/* Graphic visualizer representation */}
            <motion.div variants={itemVariants} className="glass-tile rounded-xl p-6 space-y-4">
              <h3 className="font-headline-md font-bold text-white text-lg">Weekly Performance Tracking</h3>
              <div className="h-48 rounded-lg bg-surface-container flex items-end gap-2 p-4 border border-outline-variant/10 relative overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span>LIVE ACCELEROMETER METRICS CONNECTED</span>
                </div>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <motion.div
                      className="w-full bg-gradient-to-t from-primary-container to-primary rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${20 + ((i * 19 + 7) % 75)}%` }}
                      transition={{ type: 'spring' as const, delay: i * 0.02 }}
                    />
                    <span className="text-[9px] text-on-surface-variant font-mono">D{i + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-label-caps text-[10px] mb-2">
                SYSTEM PREFERENCES
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tighter">
                System Configurations
              </h2>
              <p className="text-on-surface-variant text-body-sm mt-1">
                Configure acceleration engines, rendering cores, and local API limits.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-tile rounded-xl p-6 space-y-4">
              <h3 className="font-headline-md font-bold text-white text-lg">Engine Configurations</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-surface-container border border-outline-variant/10">
                  <div>
                    <h4 className="text-sm font-bold text-white">Enable GPU Painting Acceleration</h4>
                    <p className="text-xs text-on-surface-variant">Utilize hardware threads for rendering springs.</p>
                  </div>
                  <button 
                    onClick={() => setEngineGpu(!engineGpu)}
                    className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-200 cursor-pointer ${
                      engineGpu ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 bg-white rounded-full shadow" 
                      animate={{ x: engineGpu ? 24 : 0 }}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg bg-surface-container border border-outline-variant/10">
                  <div>
                    <h4 className="text-sm font-bold text-white">Prefetch Dynamic Subroutes</h4>
                    <p className="text-xs text-on-surface-variant">Cache database schemas on background threads.</p>
                  </div>
                  <button 
                    onClick={() => setPrefetchRoute(!prefetchRoute)}
                    className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-200 cursor-pointer ${
                      prefetchRoute ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 bg-white rounded-full shadow" 
                      animate={{ x: prefetchRoute ? 24 : 0 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-dark text-on-surface font-display">
      {/* Sidebar Navigation */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-20 md:pt-0 min-h-screen">
        <div className="max-w-[1440px] mx-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
          {/* Mobile padding for bottom nav */}
          <div className="h-24 md:hidden" />
        </div>
      </main>
    </div>
  );
}
