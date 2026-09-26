import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span>📦 My Saved Items</span>
      </h2>
      
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-lg">No items found.</p>
          <p className="text-sm">Add some items from the left panel!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: '600px' }}>
          {items.map((item) => (
            <div key={item._id} className="bg-gray-50 border border-gray-200 p-5 rounded-xl hover:shadow-md transition group relative flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize">{item.name}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                  <span className="bg-white px-2 py-1 rounded border shadow-sm"><strong>Material:</strong> {item.material}</span>
                  <span className="bg-white px-2 py-1 rounded border shadow-sm"><strong>Condition:</strong> {item.condition}</span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-2 italic bg-white p-2 rounded border">"{item.description}"</p>
                )}
              </div>

              <button 
                onClick={() => handleDelete(item._id)}
                className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Delete <span className="text-lg">🗑️</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}