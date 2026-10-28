import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Compass, HeartHandshake, Percent, PackageCheck, BookOpen, Zap, Building2 } from 'lucide-react';
import { EkamModule } from '../types';

export const QuickNavPills: React.FC = () => {
  const { activeModule, setActiveModule } = useApp();

  const pills: { id: EkamModule; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'explore', label: 'Explore', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'weddings', label: 'Weddings', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
    { id: 'deals', label: 'Deals', icon: <Percent className="w-3.5 h-3.5" /> },
    { id: 'carry', label: 'Carry', icon: <PackageCheck className="w-3.5 h-3.5" /> },
    { id: 'books', label: 'Books', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'charge', label: 'Charge', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'build', label: 'Build', icon: <Building2 className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="sticky top-18 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 no-scrollbar">
        {pills.map(p => {
          const isActive = activeModule === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveModule(p.id)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
