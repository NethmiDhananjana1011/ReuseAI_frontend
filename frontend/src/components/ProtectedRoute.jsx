import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

 
  return children;
};

export default ProtectedRoute;