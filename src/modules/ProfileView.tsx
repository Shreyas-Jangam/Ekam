import React from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, MapPin, Mail, Phone, Award, Globe, LogOut, CheckCircle2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { state, setActiveModule } = useApp();
  const user = state?.currentUser;

  const handleLogout = () => {
    localStorage.removeItem('ekam_token');
    // Forward user to login / signup / onboarding state
    setActiveModule('home');
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header Card */}
      <div className="rounded-3xl glass-panel border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 relative z-10">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <img src={user?.avatar} alt={user?.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500 shadow-xl" />
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h1 className="text-2xl font-black text-white">{user?.name}</h1>
                {user?.verified && (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-1 rounded-full" title="Verified Identity">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs text-orange-400 font-extrabold">{user?.role}</p>
              <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start space-x-1 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user?.location}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Logout & Onboarding</span>
          </button>
        </div>
      </div>

      {/* Details & Credits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-4">
          <h3 className="font-extrabold text-white text-sm">Account & Security Information</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-3 text-slate-300">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{user?.phone}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-4">
          <h3 className="font-extrabold text-white text-sm">Ekam Books & Rewards Ledger</h3>
          <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Available Credits</p>
                <p className="text-xl font-black text-white">{user?.credits} Credits</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
              Audited Ledger
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
