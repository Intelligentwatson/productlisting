import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function ProductListings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  }

  return (
    <div>
      <h1>Product Listings</h1>
      <Link to="/upload-listing">Upload New Listing</Link>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.picture_url} alt={product.name} style={{maxWidth: '200px'}} />
            <p>{product.description}</p>
            <p>Contact: {product.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListings;