import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Plus, Award, ArrowRight } from 'lucide-react';

export const BooksModule: React.FC = () => {
  const { state, refreshState } = useApp();
  const books = state?.books || [];
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState('Bengaluru');
  const [creditValue, setCreditValue] = useState(25);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        edition: '1st Edition',
        condition,
        location,
        creditValue: Number(creditValue),
        price: `₹300 or ${creditValue} Credits`,
        owner: state?.currentUser.name,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
      })
    });
    setTitle('');
    setAuthor('');
    setShowAddModal(false);
    await refreshState();
  };

  const handleRequestBook = async (bookId: string) => {
    await fetch('/api/books/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    });
    await refreshState();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            Ekam Books Module
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Second-Hand Book Exchange & Credit Ledger</h1>
          <p className="text-slate-400 text-sm mt-1">Exchange textbooks and novels using audited Ekam credits or direct cash exchange.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Book Listing</span>
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(b => (
          <div key={b.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-semibold border border-emerald-500/30">
                  {b.condition}
                </span>
                <span className="text-xs font-bold text-orange-400">{b.creditValue} Credits</span>
              </div>
              <h3 className="font-bold text-white text-base mt-2">{b.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">By {b.author}</p>
              <p className="text-xs text-slate-500 mt-1">📍 {b.location} • Owner: {b.owner}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">{b.price}</span>
              <button
                onClick={() => handleRequestBook(b.id)}
                disabled={b.status === 'Reserved'}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                {b.status}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <h3 className="font-bold text-white text-lg">List a Book for Exchange</h3>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Book Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operating System Concepts"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Abraham Silberschatz"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Credit Value</label>
                  <input
                    type="number"
                    value={creditValue}
                    onChange={(e) => setCreditValue(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold"
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
