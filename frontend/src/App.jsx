import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';


import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        
        
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
        <Route 
          path="/add" 
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view" 
          element={
            <ProtectedRoute>
              <ViewItems />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;