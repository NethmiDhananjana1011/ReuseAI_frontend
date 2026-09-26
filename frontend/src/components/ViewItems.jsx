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
    <div className="max-w-3xl mx-auto mt-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          📦 My Saved Items
        </h2>
        
        {items.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-xl text-gray-600 font-medium">No items found.</p>
            <p className="text-gray-500 mt-2">Go to "Add Item" to start adding unused items!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <div key={item._id} className="bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 capitalize">{item.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 font-medium">
                      🛠️ {item.material}
                    </span>
                    <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg border border-orange-200 font-medium">
                      ✨ {item.condition}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 mt-4 bg-gray-50 p-3 rounded-xl text-sm italic border border-gray-100">
                      "{item.description}"
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => handleDelete(item._id)}
                  className="bg-white text-red-500 border-2 border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Delete 🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}