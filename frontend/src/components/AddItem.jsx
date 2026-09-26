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
      // React Router පාවිච්චි කරන නිසා page එක ඉබේ refresh වෙන්න ඕන නැහැ, අලුත් Item එක saved items පිටුවට ගිහින් බලන්න පුළුවන්.
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          Add Unused Item <span className="text-4xl">♻️</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input name="name" value={formData.name} placeholder="Item Name (e.g., Old Wooden Door)" onChange={handleChange} className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition" required />
          <input name="material" value={formData.material} placeholder="Material (e.g., Wood)" onChange={handleChange} className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition" required />
          <select name="condition" value={formData.condition} onChange={handleChange} className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition text-gray-700 bg-white" required>
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <textarea name="description" value={formData.description} placeholder="Description (Optional)" onChange={handleChange} className="border border-gray-300 p-4 rounded-xl h-32 focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition resize-none" />
          
          <button type="submit" className="mt-2 bg-green-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-green-500/50">
            Get AI Recommendations ✨
          </button>
        </form>
      </div>

      {/* AI Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
            🎯 Top Recommendations
          </h3>
          <div className="flex flex-col gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-green-200 flex justify-between items-center hover:shadow-md transition-shadow">
                <span className="text-lg font-semibold text-gray-800">{rec.reuse_option}</span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
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