import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/create">Create Post</Link>
    </nav>
  );
};

const user = authService.getCurrentUser();

{user ? (
  <button onClick={authService.logout}>Logout</button>
) : (
  <Link to="/login">Login</Link>
)}

export default Navbar;