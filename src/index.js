import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// Replace these values with your Auth0 app values
const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID';

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
