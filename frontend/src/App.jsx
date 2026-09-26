import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        
        {/* Navigation Bar */}
        <nav className="bg-green-600 text-white shadow-lg py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-extrabold tracking-wider">ReuseAI ♻️</h1>
            <div className="flex gap-6">
              <Link to="/" className="text-lg font-semibold hover:text-green-200 transition">
                Add Item
              </Link>
              <Link to="/saved-items" className="text-lg font-semibold hover:text-green-200 transition">
                Saved Items
              </Link>
            </div>
          </div>
        </nav>

        {/* පිටු Load වෙන තැන */}
        <main className="max-w-4xl mx-auto p-6 mt-8">
          <Routes>
            <Route path="/" element={<AddItem />} />
            <Route path="/saved-items" element={<ViewItems />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;