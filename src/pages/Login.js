import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Login() {
  const history = useHistory();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      
      // Fetch user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const userInfo = await userInfoResponse.json();

      // Check if user exists in Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', userInfo.email)
        .single();

      if (!existingUser) {
        // If user doesn't exist, create a new user in Supabase
        const { data, error } = await supabase.from('users').insert({
          email: userInfo.email,
          name: userInfo.name,
          avatar_url: userInfo.picture,
        });

        if (error) {
          console.error('Error creating user:', error);
          return;
        }
      }

      // Store user info in local storage
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Redirect to product listings page
      history.push('/products');
    },
    onError: errorResponse => console.error(errorResponse),
  });

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login()}>Sign in with Google</button>
    </div>
  );
}

export default Login;