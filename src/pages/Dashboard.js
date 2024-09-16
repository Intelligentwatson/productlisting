import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Dashboard() {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    fetchUserListings();
  }, []);

  async function fetchUserListings() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.sub);
      
      if (error) {
        console.error('Error fetching user listings:', error);
      } else {
        setUserListings(data);
      }
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Listings</h2>
      {userListings.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <img src={product.picture_url} alt={product.name} style={{maxWidth: '200px'}} />
          <p>{product.description}</p>
          <p>Contact: {product.phone_number}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;