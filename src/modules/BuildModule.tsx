import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Plus, ShieldCheck } from 'lucide-react';

export const BuildModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const buildItems = state?.build || [];
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Reusable Timber');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Bengaluru');

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !quantity) return;
    await fetch('/api/build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        quantity,
        condition: 'Grade-A Surplus',
        price,
        location,
        seller: state?.currentUser.name,
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f249e?auto=format&fit=crop&w=400&q=80'
      })
    });
    setTitle('');
    setQuantity('');
    setPrice('');
    setShowAddModal(false);
    await refreshState();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            Ekam Build Module
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Reusable Surplus Construction Materials</h1>
          <p className="text-slate-400 text-sm mt-1">Buy and sell surplus timber, tiles, and renovation materials to reduce waste and expenditure.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-orange-600/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Material Listing</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildItems.map(m => (
          <div key={m.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <img src={m.image} alt={m.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded font-semibold border border-orange-500/30">
                {m.category}
              </span>
              <h3 className="font-bold text-white text-base mt-2">{m.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Quantity: {m.quantity} • {m.condition}</p>
              <p className="text-xs text-slate-500 mt-1">📍 {m.location} • Seller: {m.seller}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="font-bold text-orange-400 text-sm">{m.price}</span>
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <h3 className="font-bold text-white text-lg">List Surplus Material</h3>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Material Description</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Teak Wood Beams"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Reusable Timber">Reusable Timber</option>
                    <option value="Tiles & Flooring">Tiles & Flooring</option>
                    <option value="Doors & Windows">Doors & Windows</option>
                    <option value="Sanitary Fixtures">Sanitary Fixtures</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Quantity</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 150 sq.ft"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₹120 / sq.ft"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
