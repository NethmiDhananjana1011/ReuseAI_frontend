import { useState } from 'react';
import axios from 'axios';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '', material: '', condition: '', description: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/items', formData);
      setRecommendations(res.data.recommendations);
      setFormData({ name: '', material: '', condition: '', description: '' });
      // Item එක add වුණාම page එක refresh කරමු (දැනට ලේසිම ක්‍රමය)
      setTimeout(() => window.location.reload(), 2000); 
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>Add Unused Item</span> ♻️
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input name="name" value={formData.name} placeholder="Item Name (e.g., Old Wooden Door)" onChange={handleChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
          <input name="material" value={formData.material} placeholder="Material (e.g., Wood)" onChange={handleChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
          <select name="condition" value={formData.condition} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition text-gray-700 bg-white" required>
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <textarea name="description" value={formData.description} placeholder="Description (Optional)" onChange={handleChange} className="border border-gray-300 p-3 rounded-lg h-28 focus:ring-2 focus:ring-green-500 focus:outline-none transition resize-none" />
          
          <button type="submit" className="bg-green-600 text-white font-bold text-lg p-3 rounded-lg hover:bg-green-700 active:scale-95 transition-all shadow-md">
            Get AI Recommendations
          </button>
        </form>
      </div>

      {/* AI Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-8 bg-green-50 rounded-2xl shadow-md p-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-4">✨ AI Recommendations</h3>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex justify-between items-center hover:shadow-md transition">
                <span className="font-semibold text-gray-800">{rec.reuse_option}</span>
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold border border-green-200">
                  {rec.match_score}% Match
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}