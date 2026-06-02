'use client';

import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'courses', name: 'Curriculum', icon: 'menu_book' },
    { id: 'analytics', name: 'Intelligence', icon: 'psychology' },
    { id: 'performance', name: 'Performance', icon: 'leaderboard' },
    { id: 'settings', name: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-surface border-r border-outline-variant/30 backdrop-blur-xl z-50">
        <div className="flex flex-col h-full py-6 px-4">
          <div className="mb-10 px-2">
            <h1 className="font-display text-headline-md font-bold text-primary tracking-tighter">NEURAL_DASH</h1>
            <p className="text-[10px] font-label-caps text-on-surface-variant/60 mt-1 uppercase tracking-widest">High Performance Mode</p>
          </div>
          
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-300 relative text-left cursor-pointer ${
                    isActive 
                      ? 'text-primary font-bold bg-surface-container-high' 
                      : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 w-1 h-8 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  <span className="font-display text-body-lg">{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-outline-variant/20">
            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
              <p className="text-[10px] font-label-caps text-primary mb-2">ENGINE STATUS</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-on-surface font-bold text-sm">UPGRADE ENGINE</span>
                <span className="material-symbols-outlined text-primary text-sm">bolt</span>
              </div>
              <button className="w-full bg-primary text-on-primary font-bold py-2 rounded-lg text-sm active:scale-95 transition-transform duration-150 cursor-pointer">
                PRO ACCESS
              </button>
            </div>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 w-full z-40 md:hidden bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 flex justify-between items-center px-6 h-16">
        <h1 className="font-display text-headline-lg-mobile font-bold text-primary">NEURAL_DASH</h1>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50">
            <div className="w-full h-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center font-bold text-[10px] text-on-primary">
              JD
            </div>
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe z-50 md:hidden bg-surface-container-lowest/80 backdrop-blur-2xl border-t border-outline-variant/30 rounded-t-xl shadow-[0_-4px_20px_rgba(192,193,255,0.05)]">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive ? 'text-primary scale-110 font-bold' : 'text-outline hover:text-primary-fixed active:scale-90'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon === 'dashboard' ? 'home' : item.icon}</span>
              <span className="font-label-caps text-[10px]">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
