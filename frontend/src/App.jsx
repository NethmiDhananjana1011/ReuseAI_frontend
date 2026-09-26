import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-green-600 text-white shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-wide">ReuseAI ♻️</h1>
          <p className="text-green-100 font-medium hidden sm:block">Give Your Unused Items a Second Life!</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-6 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* වම් පැත්ත: Add Item Form */}
        <section>
          <AddItem />
        </section>

        {/* දකුණු පැත්ත: Saved Items List */}
        <section>
          <ViewItems />
        </section>
      </main>
    </div>
  );
}

export default App;