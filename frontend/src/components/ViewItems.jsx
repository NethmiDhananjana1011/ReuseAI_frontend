import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // User ගේ ID එක URL එකේ අගට එකතු කරලා යවනවා
        const res = await axios.get(`http://localhost:5000/api/items?userId=${user.id}`);
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Projects 🛠️</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">You haven't saved any projects yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 capitalize mb-2">{item.name}</h3>
              <p className="text-gray-600"><strong>Material:</strong> {item.material}</p>
              <p className="text-gray-600"><strong>Condition:</strong> {item.condition}</p>
              {item.description && <p className="text-gray-600 mt-2"><strong>Notes:</strong> {item.description}</p>}
              
              {/* AI Recommendations පෙන්වන අලුත් කොටස */}
              {item.recommendations && item.recommendations.length > 0 && (
                <div className="mt-4 bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">💡 AI Ideas to Try:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {item.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                onClick={() => handleDelete(item._id)} 
                className="mt-4 bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition"
              >
                Delete Project
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}