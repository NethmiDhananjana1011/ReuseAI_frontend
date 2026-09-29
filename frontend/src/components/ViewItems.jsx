import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items?userId=${user?.id}`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchItems();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Add Item පිටුවේ තිබූ ලස්සන Gradient පසුබිම මෙහි යොදා ඇත
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#bbf7d0] via-[#f0fdf4] to-[#FDFBF7] p-4 sm:p-8 font-sans">
      
      <div className="max-w-7xl mx-auto pb-12">
        
        {/* Header කොටස */}
        <div className="flex items-center justify-between mb-10 pt-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">My Projects 🛠️</h2>
          <span className="bg-[#14532d] text-white px-5 py-2 rounded-full font-bold text-sm shadow-md">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} Saved
          </span>
        </div>

        {items.length === 0 ? (
          // Projects කිසිවක් නැති විට පෙන්වන ලස්සන කොටුව
          <div className="bg-white/70 backdrop-blur-md p-12 rounded-[2rem] shadow-xl border border-white text-center max-w-2xl mx-auto mt-16">
            <div className="text-6xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No projects yet!</h3>
            <p className="text-gray-500 mb-8 font-medium text-lg">Go to "Add Item" to generate your first AI upcycling idea.</p>
            <Link to="/add" className="inline-block bg-[#14532d] hover:bg-[#166534] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md">
              Start Upcycling
            </Link>
          </div>
        ) : (
          
          // Projects තිබෙන විට පෙන්වන Cards (Grid)
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              
              // සැම Card එකකටම Glassmorphism Effect එක දී ඇත (bg-white/80 backdrop-blur-md)
              <div key={item._id} className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-lg border border-white hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                
                {/* Delete Button (Hover කළාම පමණක් මතුවෙනවා) */}
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="absolute top-6 right-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm opacity-0 group-hover:opacity-100 z-10"
                  title="Delete Project"
                >
                  ✕
                </button>

                <h3 className="text-2xl font-extrabold text-gray-800 capitalize mb-2 pr-10">{item.name}</h3>
                <div className="flex gap-2 mt-3 mb-6 flex-wrap">
                  <span className="bg-green-50 text-[#14532d] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-green-100">{item.material}</span>
                  <span className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-gray-100">{item.condition}</span>
                </div>
                
                {/* AI Recommendations Box */}
                {item.recommendations && item.recommendations.length > 0 && (
                  <div className="mt-6 bg-gradient-to-br from-green-50/50 to-white p-5 rounded-2xl border border-green-100">
                    <h4 className="font-bold text-[#14532d] mb-4 flex items-center gap-2">
                      <span className="text-xl">💡</span> AI Ideas to Try:
                    </h4>
                    <ul className="space-y-3">
                      {item.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start gap-3 leading-relaxed">
                          <span className="text-green-500 mt-0.5 text-lg">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewItems;