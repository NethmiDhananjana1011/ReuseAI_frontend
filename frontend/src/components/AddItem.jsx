import { useState } from 'react';
import axios from 'axios';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '', material: '', condition: '', description: ''
  });
  
  // AI Results පෙන්නන්න අලුත් State එකක්
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend එකට request එක යවනවා
      const res = await axios.post('http://localhost:5000/api/items', formData);
      
      // Backend එකෙන් එන ML recommendations ටික state එකට දාගන්නවා
      setRecommendations(res.data.recommendations);
      
      setFormData({ name: '', material: '', condition: '', description: '' });
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Unused Item ♻️</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={formData.name} placeholder="Item Name (e.g., Old Wooden Door)" onChange={handleChange} className="border p-2 rounded" required />
          <input name="material" value={formData.material} placeholder="Material (e.g., Wood)" onChange={handleChange} className="border p-2 rounded" required />
          <select name="condition" value={formData.condition} onChange={handleChange} className="border p-2 rounded text-gray-600" required>
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <textarea name="description" value={formData.description} placeholder="Description (Optional)" onChange={handleChange} className="border p-2 rounded h-24" />
          <button type="submit" className="bg-green-600 text-white font-bold p-2 rounded hover:bg-green-700 transition">
            Get AI Recommendations
          </button>
        </form>
      </div>

      {/* AI Recommendations පෙන්නන කොටස */}
      {recommendations.length > 0 && (
        <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">✨ AI Recommendations</h3>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-sm border border-green-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">{rec.reuse_option}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
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