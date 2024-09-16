import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function UploadListing() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('You must be logged in to upload a listing');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        picture_url: pictureUrl,
        phone_number: phoneNumber,
        user_id: user.sub, // Assuming Google's 'sub' field is used as user_id
      });

    if (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product. Please try again.');
    } else {
      alert('Product uploaded successfully!');
      history.push('/products');
    }
  };

  return (
    <div>
      <h1>Upload New Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pictureUrl">Picture URL:</label>
          <input
            type="url"
            id="pictureUrl"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Upload Listing</button>
      </form>
    </div>
  );
}

export default UploadListing;