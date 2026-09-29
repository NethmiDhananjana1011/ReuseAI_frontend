import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Emoji වෙනුවට Professional SVG Icon එකක් යොදා ඇත */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-[#14532d] p-2 rounded-lg shadow-sm group-hover:bg-[#166534] transition-colors duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              ReuseAI
            </span>
          </Link>

          {/* Center Links - Emojis අයින් කර පිරිසිදු පෙනුමක් ලබා දී ඇත */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${isActive('/') ? 'text-[#14532d] bg-green-50' : 'text-gray-600 hover:text-[#14532d] hover:bg-gray-50'}`}>
              Home
            </Link>
            <Link to="/add" className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${isActive('/add') ? 'text-[#14532d] bg-green-50' : 'text-gray-600 hover:text-[#14532d] hover:bg-gray-50'}`}>
              Add Item
            </Link>
            <Link to="/view" className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${isActive('/view') ? 'text-[#14532d] bg-green-50' : 'text-gray-600 hover:text-[#14532d] hover:bg-gray-50'}`}>
              My Projects
            </Link>
          </div>

          {/* Right Section: User Profile & Auth */}
          <div className="flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  {/* නමේ මුල් අකුර සහිත Professional Avatar එක */}
                  <div className="w-8 h-8 rounded-full bg-[#14532d] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-gray-700">
                    {user.name}
                  </span>
                </div>
                
                <div className="w-px h-5 bg-gray-200"></div> {/* වෙන් කරන ඉර */}
                
                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-[#14532d] transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="bg-[#14532d] hover:bg-[#166534] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md">
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