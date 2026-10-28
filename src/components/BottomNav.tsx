import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Compass, Activity, Bell, User } from 'lucide-react';
import { EkamModule } from '../types';

export const BottomNav: React.FC = () => {
  const { activeModule, setActiveModule, translate } = useApp();

  const navItems: { id: EkamModule; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'home', labelKey: 'home', icon: <Home className="w-5 h-5" /> },
    { id: 'explore', labelKey: 'explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'activity', labelKey: 'activity', icon: <Activity className="w-5 h-5" /> },
    { id: 'notifications', labelKey: 'notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'profile', labelKey: 'profile', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-slate-800/80 z-40 px-3 py-2.5 flex justify-around items-center shadow-2xl">
      {navItems.map(item => {
        const isActive = activeModule === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
              isActive ? 'text-orange-400 font-extrabold bg-orange-500/15 scale-105 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 tracking-wide">{translate(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
