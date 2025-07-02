// src/App.jsx

import React, { useState, useEffect } from 'react';

const API_BASE = 'https://bmagrilink-production.up.railway.app/api';

function App() {
  // Data state
  const [items, setItems] = useState([]);
  // Form state
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  // Loading & error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from backend
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/items`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form submission to create a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity: Number(quantity) })
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setName('');
      setQuantity('');
      await fetchItems();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">BM AgriLink Dashboard</h1>

      {loading && <p className="text-gray-500">Loading data…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-700 mb-6">No items to display.</p>
          ) : (
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="block w-full border p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Add Item
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;




