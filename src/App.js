import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import pages and components
import Login from './pages/Login';
import ProductListings from './pages/ProductListings';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import UploadListing from './pages/UploadListing';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/products" component={ProductListings} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile-edit" component={ProfileEdit} />
          <PrivateRoute path="/upload-listing" component={UploadListing} />
        </Switch>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;