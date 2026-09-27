import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-row-reverse bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-gray-100">
      {/* දකුණු පැත්තේ පින්තූරය (Signup එකට වෙනස් පින්තූරයක්) */}
      <div 
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="h-full w-full bg-black/30 flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">Join the Green Revolution 🌍</h2>
          <p className="text-white/90 text-lg drop-shadow-md">Upcycle, Create, and Save the Planet.</p>
        </div>
      </div>

      {/* වම් පැත්තේ Signup Form එක */}
      <div className="w-full md:w-1/2 p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Create an Account</h2>
          <p className="text-gray-500 mt-2">Start your upcycling journey today.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-50"
              placeholder="e.g. Nethmi Dhananjana"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-50"
              placeholder="nethmi@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-50"
              placeholder="Create a strong password"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-200 mt-2">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;