import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // දැනට ඉන්නේ login හෝ signup පිටුවේ නම්, Footer එක පෙන්නන්නේ නැහැ (return null)
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-[#111827] text-white py-12 border-t border-green-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <span className="text-2xl font-extrabold text-green-400 flex items-center gap-2 mb-4 tracking-tight">
            <span>♻️</span> ReuseAI
          </span>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Empowering eco-friendly decisions through artificial intelligence. Join us in making the world a cleaner, greener place.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-200">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
            <li><Link to="/add" className="hover:text-green-400 transition-colors">Add Item</Link></li>
            <li><Link to="/view" className="hover:text-green-400 transition-colors">My Projects</Link></li>
            {!user && <li><Link to="/login" className="hover:text-green-400 transition-colors">Login / Sign Up</Link></li>}
          </ul>
        </div>
        
        {/* Credits & Connect */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-200">Connect</h4>
          <p className="text-sm text-gray-400 mb-2">Developed for a greener future.</p>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Nethmi Dhananjana. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;