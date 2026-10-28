import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, Clock } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Notifications Center</h1>
          <p className="text-slate-400 text-sm mt-1">Stay updated on your wedding RSVPs, group deal cohorts, and book exchanges.</p>
        </div>
        <button className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-xl font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {state?.notifications.map(n => (
          <div key={n.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-start space-x-4 hover:border-slate-700 transition-colors">
            <div className={`p-3 rounded-xl shrink-0 ${n.read ? 'bg-slate-800 text-slate-400' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{n.title}</h3>
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{n.time}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-semibold border border-slate-700">
                  {n.module}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
