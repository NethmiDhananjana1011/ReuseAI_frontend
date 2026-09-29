import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home'; // අලුතින් හැදූ Home පිටුව Import කර ඇත
import Login from './components/Login';
import Signup from './components/Signup';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* මෙහි / (මුල් පිටුව) සඳහා Home component එක ලබා දී ඇත */}
        <Route path="/" element={<Home />} /> 
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>
    </Router>
  );
}

export default App;