import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Globe, User, ShieldAlert, Sparkles, Search, LogIn } from 'lucide-react';
import { Language } from '../types';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { state, activeModule, setActiveModule, language, setLanguage, translate, setAiChatOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const unreadCount = state?.notifications.filter(n => !n.read).length || 0;

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveModule('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform text-white">
              एक
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-orange-100 to-amber-300 bg-clip-text text-transparent">
                  {translate('brandName')}
                </span>
                <span className="text-[10px] bg-orange-500/15 text-orange-400 px-2.5 py-0.5 rounded-full font-bold tracking-wide border border-orange-500/30">
                  MAHARASHTRA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium tracking-wide">{translate('tagline')}</p>
            </div>
          </div>

          {/* Search Bar Quick Shortcut */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div
              onClick={() => setActiveModule('explore')}
              className="relative w-full group cursor-pointer"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
              <input
                type="text"
                placeholder={translate('searchPlaceholder')}
                readOnly
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs font-medium text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer shadow-inner group-hover:border-slate-700 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs shadow-sm hover:border-slate-700 transition-colors">
              <Globe className="w-3.5 h-3.5 text-orange-400 mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-semibold"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
              </select>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setAiChatOpen(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-600/25 transition-all hover:scale-105"
              title="Ask Ekam AI Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all hover:scale-105"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-bounce shadow-md">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && state && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel border border-slate-700/80 rounded-2xl shadow-2xl py-3 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-3 border-b border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">Notifications</span>
                    <span className="text-xs text-orange-400 font-semibold cursor-pointer hover:underline" onClick={() => { setActiveModule('notifications'); setShowNotifications(false); }}>View All</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                    {state.notifications.slice(0, 4).map(n => (
                      <div key={n.id} className="p-3.5 hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => { setActiveModule('notifications'); setShowNotifications(false); }}>
                        <p className="text-xs font-bold text-white">{n.title}</p>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-orange-400/90 mt-1.5 block font-medium">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <button
              onClick={() => setActiveModule('profile')}
              className={`p-2.5 rounded-xl flex items-center space-x-2 border transition-all ${activeModule === 'profile' ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/30' : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
              title="User Profile"
            >
              <User className="w-4 h-4" />
              <span className="text-xs font-bold hidden lg:inline">{state?.currentUser.name.split(' ')[0]}</span>
            </button>

            {/* Admin Dashboard Button */}
            <button
              onClick={() => setActiveModule('admin')}
              className={`p-2.5 rounded-xl flex items-center space-x-1.5 border transition-all ${activeModule === 'admin' ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/30' : 'bg-slate-900/90 border-slate-800 text-amber-400 hover:bg-slate-800'}`}
              title="Admin Dashboard"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold hidden xl:inline">Admin</span>
            </button>

          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
