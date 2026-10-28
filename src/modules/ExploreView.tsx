import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, BookOpen, Zap, Building2, Percent, PackageCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { EkamModule } from '../types';

export const ExploreView: React.FC = () => {
  const { state, setActiveModule } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'books' | 'charge' | 'build' | 'deals'>('all');

  const books = state?.books || [];
  const chargers = state?.charge || [];
  const buildItems = state?.build || [];
  const deals = state?.deals || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Search */}
      <div className="space-y-4">
        <h1 className="text-3xl font-black text-white">Ekam Explore Marketplace</h1>
        <p className="text-slate-400 text-sm">Discover second-hand books, EV chargers, surplus construction materials, and collective group deals near you.</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items by title, location or category..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'books', 'charge', 'build', 'deals'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Sections */}
      <div className="space-y-12">
        
        {/* Books Section */}
        {(selectedTab === 'all' || selectedTab === 'books') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Ekam Books Exchange</h2>
              </div>
              <button onClick={() => setActiveModule('books')} className="text-xs text-orange-400 hover:underline flex items-center space-x-1">
                <span>View Full Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map(b => (
                <div key={b.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                      {b.condition}
                    </span>
                    <h3 className="font-bold text-white text-base mt-2">{b.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">By {b.author} • {b.edition}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center">📍 {b.location}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-orange-400 text-sm">{b.price}</span>
                    <button onClick={() => setActiveModule('books')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Exchange
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EV Chargers Section */}
        {(selectedTab === 'all' || selectedTab === 'charge') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-bold text-white">Ekam Charge P2P Stations</h2>
              </div>
              <button onClick={() => setActiveModule('charge')} className="text-xs text-orange-400 hover:underline flex items-center space-x-1">
                <span>View Full Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {chargers.map(c => (
                <div key={c.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-semibold border border-yellow-500/30">
                        {c.status}
                      </span>
                      <span className="text-xs font-bold text-white">⭐ {c.rating}</span>
                    </div>
                    <h3 className="font-bold text-white text-base mt-2">{c.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Connector: {c.connector}</p>
                    <p className="text-xs text-slate-500 mt-1">📍 {c.location}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-yellow-400 text-sm">{c.rate}</span>
                    <button onClick={() => setActiveModule('charge')} className="bg-yellow-600 hover:bg-yellow-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Book Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Surplus Construction Materials */}
        {(selectedTab === 'all' || selectedTab === 'build') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-bold text-white">Ekam Build Surplus Materials</h2>
              </div>
              <button onClick={() => setActiveModule('build')} className="text-xs text-orange-400 hover:underline flex items-center space-x-1">
                <span>View Full Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {buildItems.map(m => (
                <div key={m.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
                  <div>
                    <img src={m.image} alt={m.title} className="w-full h-36 object-cover rounded-xl mb-4" />
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-semibold border border-orange-500/30">
                      {m.category}
                    </span>
                    <h3 className="font-bold text-white text-base mt-2">{m.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Quantity: {m.quantity} • {m.condition}</p>
                    <p className="text-xs text-slate-500 mt-1">📍 {m.location}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-orange-400 text-sm">{m.price}</span>
                    <button onClick={() => setActiveModule('build')} className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
