import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert("Signup successful! Please login.");
      navigate('/login'); // සාර්ථක වුණාම Login පිටුවට යවනවා
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
        <button type="submit" className="bg-green-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-green-700 transition">Sign Up</button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
      </p>
    </div>
  );
}