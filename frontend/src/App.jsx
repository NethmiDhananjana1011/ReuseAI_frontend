import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  // LocalStorage එකෙන් user ඉන්නවද කියලා බලනවා
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout වෙන Function එක
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        
        {/* Navigation Bar */}
        <nav className="bg-green-600 text-white shadow-lg py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-extrabold tracking-wider">ReuseAI ♻️</h1>
            <div className="flex gap-6 items-center">
              {user ? (
                // Login වෙලා නම් පේන කොටස
                <>
                  <span className="font-medium mr-4 hidden sm:block">Hi, {user.name} 👋</span>
                  <Link to="/" className="text-lg font-semibold hover:text-green-200 transition">Add Item</Link>
                  <Link to="/saved-items" className="text-lg font-semibold hover:text-green-200 transition">Saved Items</Link>
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-bold transition shadow-sm">
                    Logout
                  </button>
                </>
              ) : (
                // Login වෙලා නැත්නම් පේන කොටස
                <>
                  <Link to="/login" className="text-lg font-semibold hover:text-green-200 transition">Login</Link>
                  <Link to="/signup" className="bg-white text-green-700 px-4 py-1.5 rounded-lg font-bold hover:bg-green-100 transition shadow-sm">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Pages Load වෙන තැන */}
        <main className="max-w-4xl mx-auto p-6 mt-8">
          <Routes>
            <Route path="/" element={user ? <AddItem /> : <Login />} />
            <Route path="/saved-items" element={user ? <ViewItems /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
