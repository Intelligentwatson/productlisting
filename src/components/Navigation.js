import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/products">Product Listings</Link></li>
        <li><Link to="/upload-listing">Upload Listing</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile-edit">Edit Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;