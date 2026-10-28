import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Calendar, MapPin, ShieldCheck, CheckCircle2, BatteryCharging, Star, Sparkles, Plus, Search } from 'lucide-react';

export const ChargeModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const chargers = state?.charge || [];
  const [successSlot, setSuccessSlot] = useState<string | null>(null);

  // Search & Filter State
  const [searchLocation, setSearchLocation] = useState('');

  // Modal State for Listing Charger
  const [showListModal, setShowListModal] = useState(false);
  const [title, setTitle] = useState('');
  const [connector, setConnector] = useState('Type 2 / Bharat AC001');
  const [rate, setRate] = useState('₹14 / kWh');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [successListMsg, setSuccessListMsg] = useState(false);

  const handleBook = async (chargerId: string, slot: string) => {
    try {
      await fetch('/api/charge/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chargerId, slot })
      });
      setSuccessSlot(slot);
      setTimeout(() => setSuccessSlot(null), 4000);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleListCharger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    try {
      await fetch('/api/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          connector,
          owner: state?.currentUser.name + ' (Verified Host)',
          rate,
          location,
          batteryEmergencyHelp: 'Listed by local neighbor host. Ready for battery rescue!'
        })
      });
      setTitle('');
      setShowListModal(false);
      setSuccessListMsg(true);
      setTimeout(() => setSuccessListMsg(false), 4000);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChargers = chargers.filter(c => 
    c.title.toLowerCase().includes(searchLocation.toLowerCase()) ||
    c.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
    c.connector.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-yellow-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide">
              Ekam Charge — P2P EV Charger Sharing Network
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Battery at 4%? Sharma Uncle’s Charger is Nearby</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Airbnb for EV chargers. Your neighbor has a home charger sitting idle 22 hours a day. Book a slot instantly, charge your vehicle, and avoid range anxiety.
            </p>
          </div>
          <button
            onClick={() => setShowListModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-yellow-500/30 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>List Your EV Charger</span>
          </button>
        </div>
      </div>

      {successSlot && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex items-center space-x-3 text-emerald-300 text-xs font-bold animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>EV charging slot "{successSlot}" successfully reserved! Host access instructions sent to your phone.</span>
        </div>
      )}

      {successListMsg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex items-center space-x-3 text-emerald-300 text-xs font-bold animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>EV charger successfully listed! Nearby EV owners can now discover and book your station.</span>
        </div>
      )}

      {/* Search Bar for Nearby Location */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Search EV charging point nearby location (e.g. Indiranagar, Koramangala)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        />
      </div>

      {/* Chargers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredChargers.map(c => (
          <div key={c.id} className="rounded-3xl glass-card border border-slate-800 p-7 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-black tracking-widest bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/30">
                  {c.status}
                </span>
                <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800 flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>{c.rating}</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white">{c.title}</h3>
              <p className="text-xs text-slate-300 flex items-center space-x-1.5">
                <BatteryCharging className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Connector: <strong>{c.connector}</strong></span>
              </p>
              <p className="text-xs text-slate-400 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{c.location}</span>
              </p>

              {c.batteryEmergencyHelp && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3.5 rounded-2xl text-xs text-yellow-300 font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{c.batteryEmergencyHelp}</span>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Select Available Time Slot:</p>
                <div className="flex flex-wrap gap-2.5">
                  {c.slots?.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBook(c.id, slot)}
                      className="bg-slate-900/90 hover:bg-yellow-500 hover:text-slate-950 text-slate-200 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-105"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-base font-black text-yellow-400">{c.rate}</span>
              <span className="text-slate-400 font-semibold">Host: {c.owner}</span>
            </div>
          </div>
        ))}
      </div>

      {/* List Your Charger Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-700 rounded-3xl max-w-md w-full p-7 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-white text-lg">List Your Home EV Charging Point</h3>
            <form onSubmit={handleListCharger} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Station Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sharma Ji's Home Fast Charger (7.4 kW)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Connector Type</label>
                  <select
                    value={connector}
                    onChange={(e) => setConnector(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="Type 2 / Bharat AC001">Type 2 / Bharat AC001</option>
                    <option value="CCS-2 (DC Fast 30kW)">CCS-2 (DC Fast 30kW)</option>
                    <option value="15A Heavy Socket">15A Heavy Socket</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Charging Rate</label>
                  <input
                    type="text"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="e.g. ₹14 / kWh"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Location / Neighborhood</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Indiranagar 3rd Cross, Bengaluru"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-yellow-500/30"
                >
                  Publish Charger Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
