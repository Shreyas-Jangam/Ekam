import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Users, Package, Activity, AlertTriangle, IndianRupee } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { state } = useApp();
  const stats = state?.adminStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-3 py-1 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Secure Admin Control Plane</span>
          </div>
          <h1 className="text-3xl font-black text-white">Ekam Administration Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Platform moderation, verification reviews, and cross-service transaction audit.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Registered Users</p>
            <p className="text-2xl font-black text-white mt-1">{stats?.totalUsers.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Active Listings</p>
            <p className="text-2xl font-black text-white mt-1">{stats?.activeListings.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Transactions Today</p>
            <p className="text-2xl font-black text-white mt-1">{stats?.transactionsToday}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Platform GMV Volume</p>
            <p className="text-2xl font-black text-white mt-1">₹{stats?.platformVolumeINR}</p>
          </div>
        </div>

      </div>

      {/* Module Moderation Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        <h3 className="font-bold text-white text-base">Module Governance & Safety Review</h3>
        
        <div className="divide-y divide-slate-800 text-xs text-slate-300">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Ekam Weddings — Guest List Privacy Enforcements</p>
              <p className="text-slate-400 mt-0.5">Zero public guest list leaks verified across all public invitation links.</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">Compliant</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Ekam Deals — Supplier Quotation Verification</p>
              <p className="text-slate-400 mt-0.5">3 active dealer partners verified with valid insurance and tax filings.</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">Verified</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Ekam Books — Credit Ledger Integrity</p>
              <p className="text-slate-400 mt-0.5">Atomic transaction locking verified for book exchange reservations.</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">Balanced</span>
          </div>
        </div>
      </div>

    </div>
  );
};
