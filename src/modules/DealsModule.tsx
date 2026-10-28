import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Percent, Users, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingDown, Plus } from 'lucide-react';

export const DealsModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const deals = state?.deals || [];
  const [successDealId, setSuccessDealId] = useState<string | null>(null);

  // Modal State for Creating New Group Cohort
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Passenger Vehicles');
  const [targetCohort, setTargetCohort] = useState(20);
  const [estimatedSaving, setEstimatedSaving] = useState('₹1,00,000 savings');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('Authorized Dealership Collective');
  const [quotedPrice, setQuotedPrice] = useState(1500000);
  const [discountDesc, setDiscountDesc] = useState('Free accessories + corporate discount');

  const handleJoin = async (dealId: string) => {
    try {
      await fetch('/api/deals/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId })
      });
      setSuccessDealId(dealId);
      setTimeout(() => setSuccessDealId(null), 4000);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          targetCohort: Number(targetCohort),
          estimatedSaving,
          description: description || 'Group buying cohort to negotiate wholesale dealership pricing.',
          suppliers: [
            { name: supplierName, quotedPrice: Number(quotedPrice), discount: discountDesc }
          ],
          endDate: '2026-12-31'
        })
      });
      setTitle('');
      setDescription('');
      setShowCreateModal(false);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-amber-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide">
              Ekam Deals — Collective Purchasing & Group Buying
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Beat Car Dealership Price Haggling</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Join demand cohorts (e.g. 20 buyers for cars or monthly staples) and let authorized suppliers compete with transparent wholesale quotations.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-amber-600/30 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>+ Create Group Cohort</span>
          </button>
        </div>
      </div>

      {successDealId && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex items-center space-x-3 text-emerald-300 text-xs font-bold animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Successfully joined cohort! Your quotation lock and dealer discount have been recorded securely.</span>
        </div>
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {deals.map(d => (
          <div key={d.id} className="rounded-3xl glass-card border border-slate-800 p-7 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-black tracking-widest bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                  {d.category}
                </span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{d.estimatedSaving}</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white">{d.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{d.description}</p>

              {/* Progress */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2.5 shadow-inner">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Demand Cohort Progress</span>
                  <span className="text-orange-400 font-black">{d.joinedCount} / {d.targetCohort} Buyers Locked</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (d.joinedCount / d.targetCohort) * 100)}%` }}></div>
                </div>
              </div>

              {/* Suppliers */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Competing Dealer Quotations:</p>
                {d.suppliers?.map((s, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-extrabold text-white text-sm">{s.name}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{s.discount}</p>
                    </div>
                    <span className="font-black text-amber-400 text-sm">₹{s.quotedPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleJoin(d.id)}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-amber-600/20 hover:scale-[1.02]"
            >
              Confirm & Join Group Cohort
            </button>
          </div>
        ))}
      </div>

      {/* Create Group Cohort Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-700 rounded-3xl max-w-md w-full p-7 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-white text-lg">Create New Group-Buying Cohort</h3>
            <form onSubmit={handleCreateCohort} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Cohort Title / Product</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SUV Group Buy (Mahindra BE.6)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Passenger Vehicles">Passenger Vehicles</option>
                    <option value="Home Energy & Solar">Home Energy & Solar</option>
                    <option value="Groceries & Staples">Groceries & Staples</option>
                    <option value="Appliances">Appliances</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Target Cohort Size</label>
                  <input
                    type="number"
                    value={targetCohort}
                    onChange={(e) => setTargetCohort(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Estimated Saving Claim</label>
                <input
                  type="text"
                  value={estimatedSaving}
                  onChange={(e) => setEstimatedSaving(e.target.value)}
                  placeholder="e.g. ₹1.25 Lakh saving per vehicle"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Initial Supplier Offer (Dealer Name & Price)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="Dealer Name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="number"
                    value={quotedPrice}
                    onChange={(e) => setQuotedPrice(Number(e.target.value))}
                    placeholder="Quoted Price INR"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-amber-600/30"
                >
                  Publish Group Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
