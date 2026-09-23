import { useState } from 'react';
import axios from 'axios';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '', material: '', condition: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items', formData);
      alert("Item Added Successfully! ♻️");
      setFormData({ name: '', material: '', condition: '', description: '' }); // Form එක clear කරන්න
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
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
  );
}