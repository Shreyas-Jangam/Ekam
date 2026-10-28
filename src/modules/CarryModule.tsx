import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageCheck, Plus, Plane, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CarryModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const carryRequests = state?.carry || [];

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [category, setCategory] = useState('Electronics & Gadgets');
  const [route, setRoute] = useState('San Francisco (SFO) to Bengaluru (BLR)');
  const [reward, setReward] = useState('₹5,000 tip');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleCreateCarry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle || !route) return;

    try {
      await fetch('/api/carry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle,
          category,
          route,
          reward,
          description: description || 'Requested via Ekam Carry secure traveller matching.'
        })
      });
      setItemTitle('');
      setDescription('');
      setShowModal(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-blue-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide">
              Ekam Carry — Traveller-Assisted Delivery
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Turn Your Suitcase into a Side-Hustle</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Connect product requests (gadgets, apparel, rare items) with verified travellers flying from America, Europe, or domestic routes.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Carry Request</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex items-center space-x-3 text-emerald-300 text-xs font-bold animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Carry request successfully published! Verified travellers on this route will be notified instantly.</span>
        </div>
      )}

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {carryRequests.map(c => (
          <div key={c.id} className="rounded-3xl glass-card border border-slate-800 p-7 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-black tracking-widest bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                  {c.category}
                </span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                  Reward: {c.reward}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{c.itemTitle}</h3>
              <p className="text-xs text-slate-300 flex items-center space-x-2">
                <Plane className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Route: <strong>{c.route}</strong></span>
              </p>
              {c.description && (
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                  {c.description}
                </p>
              )}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center shadow-inner">
                <span>Traveller: <strong className="text-white">{c.travellerName}</strong></span>
                <span className="text-orange-400 font-extrabold">{c.status}</span>
              </div>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold py-3 rounded-2xl text-xs transition-colors border border-slate-700">
              View Delivery & Escrow Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for New Carry Request */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-700 rounded-3xl max-w-md w-full p-7 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-white text-lg">Create New Carry Request</h3>
            <form onSubmit={handleCreateCarry} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Item Title & Model</label>
                <input
                  type="text"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 Headphones"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Apparel & Handlooms">Apparel & Handlooms</option>
                    <option value="Cosmetics & Perfumes">Cosmetics & Perfumes</option>
                    <option value="Speciality Goods">Speciality Goods</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Traveller Reward (Tip)</label>
                  <input
                    type="text"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    placeholder="e.g. ₹3,500 tip"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Flight / Travel Route</label>
                <input
                  type="text"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="e.g. New York (JFK) to Mumbai (BOM)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Item Description & Links</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide purchase links, dimensions, or specific color preference..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-blue-600/30"
                >
                  Publish Carry Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
