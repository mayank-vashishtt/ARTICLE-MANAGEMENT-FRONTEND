import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';  // Global or specific styles

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token to log out
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/articles">Articles</Link>
      <Link to="/add-article">Add Article</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;