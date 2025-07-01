// src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  // State for items, loading and errors
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your backend API base URL
  const API_BASE = 'https://bmagrilink-production.up.railway.app/api';


  // Fetch items on mount
  useEffect(() => {
    fetch(`${API_BASE}/items`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">BM AgriLink Dashboard</h1>
      {loading && <p className="text-gray-500">Loading data…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-700">No items to display.</p>
          ) : (
            <table className="w-full border-collapse">
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
        </>
      )}
    </div>
  );
}

export default App;



