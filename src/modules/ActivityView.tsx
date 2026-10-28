import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, HeartHandshake, Percent, PackageCheck, BookOpen, Zap, Building2, ArrowRight } from 'lucide-react';

export const ActivityView: React.FC = () => {
  const { state, setActiveModule } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">My Ekam Activity</h1>
        <p className="text-slate-400 text-sm mt-1">Track your wedding guest lists, group-buy cohorts, book exchanges, and EV bookings in one place.</p>
      </div>

      <div className="space-y-6">
        
        {/* Weddings Activity */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Ekam Weddings</h3>
                <p className="text-xs text-slate-400">Guest management & RSVP tracking</p>
              </div>
            </div>
            <button onClick={() => setActiveModule('weddings')} className="text-xs text-rose-400 hover:underline flex items-center space-x-1">
              <span>Manage Wedding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {state?.weddings.map(w => (
              <div key={w.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white">{w.title}</p>
                  <p className="text-slate-400">📅 {w.date} • 📍 {w.location}</p>
                </div>
                <span className="bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full font-semibold border border-rose-500/30">
                  {w.expectedGuests} Expected Guests
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deals Activity */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Ekam Deals</h3>
                <p className="text-xs text-slate-400">Active collective buying cohorts</p>
              </div>
            </div>
            <button onClick={() => setActiveModule('deals')} className="text-xs text-amber-400 hover:underline flex items-center space-x-1">
              <span>View Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {state?.deals.map(d => (
              <div key={d.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white">{d.title}</p>
                  <p className="text-slate-400">Cohort size: {d.joinedCount} / {d.targetCohort} buyers</p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-semibold border border-amber-500/30">
                  {d.estimatedSaving}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Books Activity */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Ekam Books & Credits</h3>
                <p className="text-xs text-slate-400">Your credit balance: <span className="text-emerald-400 font-bold">{state?.currentUser.credits} Credits</span></p>
              </div>
            </div>
            <button onClick={() => setActiveModule('books')} className="text-xs text-emerald-400 hover:underline flex items-center space-x-1">
              <span>Browse Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {state?.books.slice(0, 2).map(b => (
              <div key={b.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white">{b.title}</p>
                  <p className="text-slate-400">Owner: {b.owner}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
