import { Link } from 'react-router-dom';

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FDFBF7] font-sans">
      
      {/* Hero Section (ප්‍රධාන ආකර්ෂණීය කොටස) */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
            Turn Your Waste into <span className="text-[#14532d]">Wonder</span> 🌱
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            ReuseAI helps you discover creative, eco-friendly ways to upcycle your unused items using the power of Artificial Intelligence. Save the planet, one project at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* User ලොග් වෙලා නම් Add Item එකට යවනවා, නැත්නම් Signup/Login පෙන්නනවා */}
            {user ? (
              <Link to="/add" className="bg-[#14532d] hover:bg-[#166534] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
                Start Upcycling Now 🚀
              </Link>
            ) : (
              <>
                <Link to="/signup" className="bg-[#14532d] hover:bg-[#166534] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
                  Get Started for Free
                </Link>
                <Link to="/login" className="bg-white text-[#14532d] border-2 border-[#14532d] font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-50 transition-all">
                  Login to Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* How it Works Section (අමතරව එකතු කළ විශේෂාංග කොටස) */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">How ReuseAI Works 🛠️</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-green-50 to-white rounded-3xl p-8 text-center border border-green-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Add Your Item</h3>
              <p className="text-gray-600">Got an old chair or glass bottles? Just tell our AI what you have and its material condition.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-green-50 to-white rounded-3xl p-8 text-center border border-green-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Get AI Ideas</h3>
              <p className="text-gray-600">Our advanced AI will instantly generate creative, practical, and step-by-step upcycling projects.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-green-50 to-white rounded-3xl p-8 text-center border border-green-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Save the Planet</h3>
              <p className="text-gray-600">Reduce waste, create beautiful things for your home, and contribute to a greener environment.</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;