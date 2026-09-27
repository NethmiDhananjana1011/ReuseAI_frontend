import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import Login from './components/Login';
import Signup from './components/Signup';

const Navigation = ({ user, handleLogout }) => {
  const location = useLocation();
  
  if (!user || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-green-600 text-white shadow-lg py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wider">ReuseAI ♻️</h1>
        <div className="flex gap-6 items-center">
          <span className="font-medium mr-4 hidden sm:block">Hi, {user.name} 👋</span>
          <Link to="/" className="text-lg font-semibold hover:text-green-200 transition">Add Item</Link>
          <Link to="/my-projects" className="text-lg font-semibold hover:text-green-200 transition">My Projects</Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-bold transition shadow-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Navigation user={user} handleLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={user ? <div className="max-w-4xl mx-auto p-6 mt-8"><AddItem /></div> : <Navigate to="/login" />} />
          <Route path="/my-projects" element={user ? <div className="max-w-4xl mx-auto p-6 mt-8"><ViewItems /></div> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;