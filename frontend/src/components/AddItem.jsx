import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [formData, setFormData] = useState({ name: '', material: '', condition: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login first');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/items', {
        ...formData,
        userId: user.id
      });
      alert('Item added successfully! Check My Projects.');
      setFormData({ name: '', material: '', condition: '' });
      navigate('/view'); // සාර්ථක වුණාම My Projects පිටුවට යවයි
    } catch (err) {
      console.error(err);
      alert('Error adding item');
    }
    setLoading(false);
  };

  return (
    // පැහැදිලිව පෙනෙන ලස්සන Gradient පසුබිමක් (from-green-200 to-cream)
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#bbf7d0] via-[#f0fdf4] to-[#FDFBF7] flex items-center justify-center p-4 sm:p-6 font-sans">
      
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full p-8 md:p-14 relative border border-white/50 backdrop-blur-sm">
        
        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide uppercase mb-4 inline-block">
            Start Upcycling
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mt-2 mb-3 tracking-tight">
            Add Unused Item ♻️
          </h2>
          <p className="text-gray-500 font-medium">
            Tell AI what you have, and discover creative ways to reuse it!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">What is the item?</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Broken wooden chair, Plastic bottle"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 shadow-sm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Material</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Wood, Plastic, Glass"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 shadow-sm"
                value={formData.material}
                onChange={(e) => setFormData({...formData, material: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Old, Broken, Good"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 shadow-sm"
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-[#14532d] hover:bg-[#166534] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI Ideas...
              </>
            ) : 'Get AI Recommendations 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;