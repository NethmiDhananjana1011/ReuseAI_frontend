import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    // Glassmorphism Effect එක (backdrop-blur-md) සහ Sticky Navbar
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* වම් පැත්ත: Logo එක */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">♻️</span>
            <span className="text-2xl font-extrabold text-[#14532d] tracking-tight">ReuseAI</span>
          </Link>

          {/* මැද: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#14532d] font-bold transition-colors">Home</Link>
            <Link to="/add" className="text-gray-600 hover:text-[#14532d] font-bold transition-colors">Add Item</Link>
            <Link to="/view" className="text-gray-600 hover:text-[#14532d] font-bold transition-colors">My Projects</Link>
          </div>

          {/* දකුණු පැත්ත: User Profile / Logout */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm font-bold text-[#14532d] bg-green-50 px-4 py-2 rounded-full border border-green-100">
                  Hi, {user.name} 👋
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-[#14532d] font-bold hover:bg-green-50 px-5 py-2.5 rounded-xl transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-[#14532d] hover:bg-[#166534] text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;