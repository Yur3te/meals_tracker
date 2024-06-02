import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function PrivateRoute({ component: Component }) {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp > currentTime) {
        // Token is valid
        return <Component />;
      } else {
        // Token is expired
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
      }
    } catch (error) {
      // Token is invalid or some other error occurred
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } else {
    // No token found
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
