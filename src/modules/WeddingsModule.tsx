import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, Users, Calendar, MapPin, Plus, Sparkles, CheckCircle2, MessageSquare, QrCode, Utensils, ShieldCheck, Search, ArrowRight, PlusCircle } from 'lucide-react';

export const WeddingsModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const weddings = state?.weddings || [];
  const wedding = weddings[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'guests' | 'functions' | 'whatsapp' | 'catering' | 'checkin'>('overview');
  
  // Wedding Creation Form State
  const [showCreateModal, setShowCreateModal] = useState(weddings.length === 0);
  const [weddingTitle, setWeddingTitle] = useState('Sharma & Verma Wedding Celebration');
  const [coupleNames, setCoupleNames] = useState('Aarav & Priya');
  const [weddingDate, setWeddingDate] = useState('2026-12-15');
  const [venueLocation, setVenueLocation] = useState('The Leela Palace, Bengaluru');
  const [expectedGuests, setExpectedGuests] = useState(400);
  const [cateringBudget, setCateringBudget] = useState(2500000);

  // Guest Form State
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [householdName, setHouseholdName] = useState('');
  const [membersCount, setMembersCount] = useState(2);
  const [mealPref, setMealPref] = useState<'Veg' | 'Non-Veg' | 'Jain'>('Veg');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateWedding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingTitle || !coupleNames) return;

    try {
      await fetch('/api/weddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: weddingTitle,
          couple: coupleNames,
          date: weddingDate,
          location: venueLocation,
          budget: Number(cateringBudget),
          expectedGuests: Number(expectedGuests),
          confirmedGuests: Math.round(Number(expectedGuests) * 0.7),
          noShowRiskBuffer: Math.round(Number(expectedGuests) * 0.15),
          foodWastageSavedINR: 85000,
          functions: [
            { id: 'fn_01', name: 'Sangeet Night', date: weddingDate, time: '19:00', venue: 'Grand Ballroom', rsvpCount: 280, vegCount: 180, nonVegCount: 100 },
            { id: 'fn_02', name: 'Wedding Ceremony', date: weddingDate, time: '09:00', venue: 'Main Lawn', rsvpCount: 320, vegCount: 210, nonVegCount: 110 }
          ]
        })
      });
      setShowCreateModal(false);
      await refreshState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(`https://ekam.in/invite/sharma-verma-wedding-2026?token=ekam_secure_rsvp`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !householdName || !wedding) return;
    
    wedding.households.unshift({
      id: 'hh_' + Date.now(),
      name: householdName + ' (' + guestName + ')',
      membersCount: Number(membersCount),
      status: 'Confirmed',
      mealPref,
      arrivalTime: '2026-12-15 11:00'
    });
    wedding.expectedGuests += Number(membersCount);
    
    setGuestName('');
    setHouseholdName('');
    setShowAddGuestModal(false);
    await refreshState();
  };

  if (!wedding || showCreateModal) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-300">
        <div className="glass-panel border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10">
            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide">
              Ekam Weddings Onboarding
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Create Your Wedding Event Announcement</h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Set up your wedding workspace to eliminate guest no-shows, track WhatsApp RSVPs, and prevent unnecessary catering waste.
            </p>
          </div>

          <form onSubmit={handleCreateWedding} className="space-y-5 relative z-10 pt-2">
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Wedding Title / Family Announcement</label>
              <input
                type="text"
                value={weddingTitle}
                onChange={(e) => setWeddingTitle(e.target.value)}
                placeholder="e.g. Sharma & Verma Wedding Celebration"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Couple Names</label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  placeholder="e.g. Aarav & Priya"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Wedding Date</label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Venue / City Location</label>
              <input
                type="text"
                value={venueLocation}
                onChange={(e) => setVenueLocation(e.target.value)}
                placeholder="e.g. The Leela Palace, Bengaluru"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Approximate Guest Invitation Count</label>
                <input
                  type="number"
                  value={expectedGuests}
                  onChange={(e) => setExpectedGuests(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Estimated Catering Budget (INR)</label>
                <input
                  type="number"
                  value={cateringBudget}
                  onChange={(e) => setCateringBudget(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-8 py-3.5 rounded-2xl text-xs font-extrabold shadow-xl shadow-rose-600/30 flex items-center space-x-2 transition-all"
              >
                <span>Launch Wedding Intelligence Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-rose-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide">
              Ekam Weddings — Guest Intelligence & Catering Optimization
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">{wedding?.title}</h1>
            <p className="text-slate-300 text-sm flex items-center space-x-2">
              <span>💑 {wedding?.couple}</span>
              <span>•</span>
              <span>📅 {wedding?.date}</span>
              <span>•</span>
              <span>📍 {wedding?.location}</span>
            </p>
          </div>
          
          {/* Prominent Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 px-5 py-3 rounded-2xl text-xs font-black shadow-lg shadow-amber-600/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ New Wedding</span>
            </button>
            
            <button
              onClick={() => setShowAddGuestModal(true)}
              className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-lg shadow-rose-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Guest / Household</span>
            </button>

            <button
              onClick={handleCopyInviteLink}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span>{copiedLink ? 'Link Copied!' : 'WhatsApp Invite'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Attendance & Catering Savings Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner">
          <p className="text-3xl font-black text-white">{wedding?.expectedGuests}</p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Total Invited</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner">
          <p className="text-3xl font-black text-emerald-400">{wedding?.confirmedGuests || 280}</p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Confirmed RSVPs</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner">
          <p className="text-3xl font-black text-amber-400">{wedding?.noShowRiskBuffer || 60}</p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">No-Show Risk Buffer</p>
        </div>
        <div className="bg-gradient-to-br from-rose-950/50 to-slate-900 border border-rose-500/30 p-5 rounded-2xl shadow-inner">
          <p className="text-3xl font-black text-rose-400">₹{(wedding?.foodWastageSavedINR || 85000).toLocaleString('en-IN')}</p>
          <p className="text-xs text-rose-300 mt-1 font-bold uppercase tracking-wider">Catering Waste Saved</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-4 overflow-x-auto no-scrollbar">
        {(['overview', 'guests', 'functions', 'whatsapp', 'catering', 'checkin'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold capitalize whitespace-nowrap transition-all ${
              activeTab === tab ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-4">
              <h3 className="font-extrabold text-white text-base">Attendance Forecast & Scenario Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on historical Indian wedding RSVP reliability, 15% of confirmed guests may experience last-minute travel delays. Ekam filters out uncertainty so caterers don't over-prepare.
              </p>
              <div className="space-y-3 pt-2">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">Conservative Headcount (Guaranteed)</span>
                  <span className="font-black text-emerald-400 text-sm">260 Attendees</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">Expected Attendance (AI Weighted)</span>
                  <span className="font-black text-amber-400 text-sm">280 Attendees</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">Maximum Capacity Ceiling</span>
                  <span className="font-black text-rose-400 text-sm">340 Attendees</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-4">
              <h3 className="font-extrabold text-white text-base">Upcoming Operational Milestones</h3>
              <div className="space-y-3">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Catering Final Headcount Lock</p>
                    <p className="text-slate-400 text-[11px]">Due 48 hours prior to Reception</p>
                  </div>
                  <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-bold border border-amber-500/30">Pending Lock</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">WhatsApp Reminder Broadcast</p>
                    <p className="text-slate-400 text-[11px]">Scheduled for Dec 10, 2026</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">Automated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guests' && (
        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-extrabold text-white text-base">Household & Guest CRM</h3>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search households or guests..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {wedding?.households?.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase())).map(hh => (
              <div key={hh.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                <div>
                  <p className="font-black text-white text-sm">{hh.name}</p>
                  <p className="text-slate-400 mt-0.5">Members: <strong>{hh.membersCount}</strong> • Meal: <strong className="text-orange-400">{hh.mealPref}</strong> • Arrival: {hh.arrivalTime}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                  {hh.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'functions' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {wedding?.functions?.map(fn => (
            <div key={fn.id} className="rounded-3xl glass-card border border-slate-800 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-rose-500/30">
                  Function RSVP
                </span>
                <span className="text-xs font-black text-white">{fn.rsvpCount} Confirmed</span>
              </div>
              <h3 className="font-black text-white text-lg">{fn.name}</h3>
              <p className="text-xs text-slate-400">📅 {fn.date} at {fn.time}</p>
              <p className="text-xs text-slate-400">📍 {fn.venue}</p>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-semibold text-slate-300">
                <span>🥗 Veg: {fn.vegCount || 180}</span>
                <span>🍗 Non-Veg: {fn.nonVegCount || 100}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'whatsapp' && (
        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-6">
          <h3 className="font-extrabold text-white text-base">WhatsApp Invitation & Automated Reminder Automation</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Official WhatsApp Business API integration generates secure, tokenized RSVP invitation cards that open instantly in any mobile browser without requiring app installation.
          </p>
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300 shadow-inner">
            <p className="text-orange-400 font-bold"># WhatsApp Broadcast Template Preview:</p>
            <p className="leading-relaxed">
              "Namaste ji! Cordially inviting you to {wedding?.couple}’s Wedding Celebration at {wedding?.location}. Please confirm your attendance and meal preferences via Ekam secure link: https://ekam.in/invite/sharma-verma-wedding-2026"
            </p>
          </div>
          <button
            onClick={handleCopyInviteLink}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/20"
          >
            {copiedLink ? 'Copied to Clipboard!' : 'Copy WhatsApp Broadcast Message'}
          </button>
        </div>
      )}

      {activeTab === 'catering' && (
        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-6">
          <h3 className="font-extrabold text-white text-base">Catering Intelligence & Plate Cost Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <p className="text-3xl font-black text-rose-400">₹1,450</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Average Veg Plate Rate</p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <p className="text-3xl font-black text-amber-400">₹1,850</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Average Non-Veg Plate Rate</p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <p className="text-3xl font-black text-emerald-400">₹{(wedding?.budget || 2500000).toLocaleString('en-IN')}</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Allocated Catering Budget</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checkin' && (
        <div className="rounded-3xl glass-card border border-slate-800 p-7 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-500/20 text-rose-400 rounded-3xl mx-auto flex items-center justify-center border border-rose-500/30 shadow-xl">
            <QrCode className="w-10 h-10" />
          </div>
          <h3 className="font-extrabold text-white text-lg">Gate QR Check-In Terminal Simulator</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Staff at venue entrances can scan guest WhatsApp QR invitation passes or search by phone number for instant check-in verification.
          </p>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3.5 rounded-2xl text-xs font-extrabold shadow-xl shadow-rose-600/30 transition-all">
            Launch Camera Scanner
          </button>
        </div>
      )}

      {/* Add Guest Modal */}
      {showAddGuestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-700 rounded-3xl max-w-md w-full p-7 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-white text-lg">Add Household & Guest CRM Record</h3>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Household / Family Name</label>
                <input
                  type="text"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  placeholder="e.g. Verma Family (Delhi)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Primary Contact Person</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rajesh Verma"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Number of Members</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={membersCount}
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Meal Preference</label>
                  <select
                    value={mealPref}
                    onChange={(e) => setMealPref(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Jain">Jain</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGuestModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-rose-600/30"
                >
                  Save Guest Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
