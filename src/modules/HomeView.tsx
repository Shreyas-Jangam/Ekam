import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, Percent, PackageCheck, BookOpen, Zap, Building2, ArrowRight, Sparkles, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';
import { EkamModule } from '../types';

export const HomeView: React.FC = () => {
  const { state, setActiveModule, translate } = useApp();

  const services: { id: EkamModule; titleKey: string; descKey: string; icon: React.ReactNode; color: string; badge: string; highlight: string }[] = [
    {
      id: 'weddings',
      titleKey: 'weddingsTitle',
      descKey: 'weddingsDesc',
      icon: <HeartHandshake className="w-7 h-7 text-rose-400" />,
      color: 'from-rose-500/15 via-slate-900 to-slate-900 border-rose-500/30 hover:border-rose-500/60',
      badge: 'Weddings',
      highlight: 'Save ₹85k+ on Catering'
    },
    {
      id: 'deals',
      titleKey: 'dealsTitle',
      descKey: 'dealsDesc',
      icon: <Percent className="w-7 h-7 text-amber-400" />,
      color: 'from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/30 hover:border-amber-500/60',
      badge: 'Group Deals',
      highlight: 'Wholesale Car Discounts'
    },
    {
      id: 'carry',
      titleKey: 'carryTitle',
      descKey: 'carryDesc',
      icon: <PackageCheck className="w-7 h-7 text-blue-400" />,
      color: 'from-blue-500/15 via-slate-900 to-slate-900 border-blue-500/30 hover:border-blue-500/60',
      badge: 'Carry Delivery',
      highlight: 'Suitcase Side-Hustle'
    },
    {
      id: 'books',
      titleKey: 'booksTitle',
      descKey: 'booksDesc',
      icon: <BookOpen className="w-7 h-7 text-emerald-400" />,
      color: 'from-emerald-500/15 via-slate-900 to-slate-900 border-emerald-500/30 hover:border-emerald-500/60',
      badge: 'Book Exchange',
      highlight: 'Audited Credit Ledger'
    },
    {
      id: 'charge',
      titleKey: 'chargeTitle',
      descKey: 'chargeDesc',
      icon: <Zap className="w-7 h-7 text-yellow-400" />,
      color: 'from-yellow-500/15 via-slate-900 to-slate-900 border-yellow-500/30 hover:border-yellow-500/60',
      badge: 'P2P EV Charging',
      highlight: 'Sharma Uncle’s Charger'
    },
    {
      id: 'build',
      titleKey: 'buildTitle',
      descKey: 'buildDesc',
      icon: <Building2 className="w-7 h-7 text-orange-400" />,
      color: 'from-orange-500/15 via-slate-900 to-slate-900 border-orange-500/30 hover:border-orange-500/60',
      badge: 'Surplus Materials',
      highlight: '30-70% Off Contractor Stock'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner with Dimensional Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/60 border border-slate-700/80 p-8 sm:p-14 shadow-2xl glow-orange">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>{translate('verified')}</span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            One Connected Ecosystem for India.
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Welcome back, <span className="text-orange-400 font-bold">{state?.currentUser.name}</span>. Discover six practical services designed for everyday transactions, resource sharing, and community commerce.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveModule('explore')}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 bg-slate-800/90 px-4 py-3.5 rounded-2xl border border-slate-700/80 shadow-inner">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>{state?.currentUser.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Six Services Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{translate('servicesTitle')}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Independent business domains operating on one shared secure platform</p>
          </div>
          <span className="text-xs font-bold bg-orange-500/15 text-orange-400 px-3.5 py-1.5 rounded-xl border border-orange-500/30">
            6 Modules Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveModule(s.id)}
              className={`group relative rounded-3xl bg-gradient-to-b ${s.color} border p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/15 flex flex-col justify-between glass-card`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold bg-slate-800/90 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                    {s.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
                  {translate(s.titleKey)}
                </h3>
                
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal">
                  {translate(s.descKey)}
                </p>

                <div className="mt-4 inline-flex items-center space-x-1.5 text-[11px] font-bold text-orange-400/90 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{s.highlight}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Access module</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Summary Bar */}
      <div className="rounded-3xl glass-panel border border-slate-800 p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-extrabold text-white text-base">Active Ecosystem Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time platform metrics across all verified Indian users</p>
          </div>
          <span className="text-xs text-orange-400 font-bold cursor-pointer hover:underline" onClick={() => setActiveModule('activity')}>View My Activity</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-3xl font-black text-orange-400">{state?.weddings.length || 0}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Active Wedding</p>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-3xl font-black text-amber-400">{state?.deals.length || 0}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Group Deals</p>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-3xl font-black text-emerald-400">{state?.books.length || 0}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Book Listings</p>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-3xl font-black text-blue-400">{state?.currentUser.credits || 0}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Ekam Credits</p>
          </div>
        </div>
      </div>

    </div>
  );
};
