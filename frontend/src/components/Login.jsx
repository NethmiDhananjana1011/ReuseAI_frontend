import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/login.png'; // 1. Import the new image

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    // h-screen යොදා තිරයේ උසටම සීමා කර ඇත (Scroll වීම වැළැක්වීමට)
    <div className="h-screen bg-[#FDFBF7] flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
      
      {/* md:h-[600px] මගින් කොටුවේ උපරිම උසක් ලබා දී ඇත */}
      <div className="flex bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl w-full md:h-[600px] relative border border-gray-100">

        {/* වම් පැත්ත: Login Form එක (Paddings සහ Margins අඩු කර ඇත) */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative z-10">
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold text-[#14532d] flex items-center gap-2">
              <span className="text-2xl">♻️</span> ReuseAI
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-2 tracking-tight">Welcome Back!</h2>
          <p className="text-gray-500 mb-8 font-medium">Please Log in to your account.</p>

          {error && <div className="bg-red-50 text-red-600 p-2.5 rounded-lg mb-4 text-sm border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 placeholder-gray-400"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] transition-colors bg-white text-gray-800 placeholder-gray-400"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-2 mb-6">
              <label className="flex items-center text-gray-500 cursor-pointer font-medium">
                <input type="checkbox" className="mr-2 w-4 h-4 rounded border-gray-300 text-[#14532d] focus:ring-[#14532d]" />
                Remember me
              </label>
              <a href="#" className="text-[#14532d] hover:underline font-medium">Forgot password?</a>
            </div>

            <div className="flex gap-4 mt-6">
              <button type="submit" className="flex-1 bg-[#14532d] hover:bg-[#166534] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md">
                Login
              </button>
              <Link to="/signup" className="flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-center inline-block">
                Create account
              </Link>
            </div>
          </form>

          <div className="mt-8 text-xs text-gray-400 font-medium">
            By sign up, you agree to our terms and that you have read our data policy.
          </div>
        </div>

        {/* දකුණු පැත්ත: පින්තූරය */}
        <div className="hidden md:block w-1/2 relative bg-green-900 h-full">
           <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 w-12 h-12 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white cursor-pointer hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6z" />
              </svg>
           </div>

          <img
            src={bgImage}
            alt="ReuseAI Background"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;