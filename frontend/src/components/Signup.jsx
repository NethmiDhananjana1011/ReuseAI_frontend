import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import signupBg from '../assets/signup.png'; // 1. Import the new image

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login'); // සාර්ථකව Account එක හැදුවට පස්සේ Login පිටුවට යවනවා
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="h-screen bg-[#FDFBF7] flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">

      <div className="flex bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl w-full md:h-[600px] relative border border-gray-100">

        {/* වම් පැත්ත: පින්තූරය (Login එකේ දකුණේ තිබුණ එක මෙතන වමට දැම්මා) */}
        <div className="hidden md:block w-1/2 relative bg-green-900 h-full">

          {/* කහ පාට Play Button එක දැන් දකුණු මායිමේ */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white cursor-pointer hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4l12 6-12 6z" />
            </svg>
          </div>

          <img
            src={signupBg}
            alt="ReuseAI Signup Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* දකුණු පැත්ත: Signup Form එක */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative z-10">

          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold text-[#14532d] flex items-center gap-2">
              <span className="text-2xl">♻️</span> ReuseAI
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-2 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mb-8 font-medium">Join us to start your upcycling journey.</p>

          {error && <div className="bg-red-50 text-red-600 p-2.5 rounded-lg mb-4 text-sm border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 placeholder-gray-400"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 placeholder-gray-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 placeholder-gray-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button type="submit" className="flex-1 bg-[#14532d] hover:bg-[#166534] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md">
                Sign Up
              </button>
              <Link to="/login" className="flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-center inline-block">
                Login instead
              </Link>
            </div>
          </form>

          <div className="mt-8 text-xs text-gray-400 font-medium">
            By signing up, you agree to our terms and that you have read our data policy.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;