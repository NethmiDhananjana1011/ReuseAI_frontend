import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>

     
      <Footer />
      
    </Router>
  );
}

export default App;