import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Token එක සහ User විස්තර Save කරගන්නවා
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/'; // Login වුණාම Home page එකට යවනවා
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
        <button type="submit" className="bg-green-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-green-700 transition">Log In</button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <Link to="/signup" className="text-green-600 font-bold hover:underline">Sign up</Link>
      </p>
    </div>
  );
}