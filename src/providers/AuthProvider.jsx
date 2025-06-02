"use client"

import { Auth0Provider } from '@auth0/auth0-react';
import UserSync from '@/components/auth/UserSync';

const AuthProvider = ({children}) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    console.error('Auth0 configuration is missing. Please check your environment variables.');
    return <div>Configuration Error</div>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
        scope: 'openid profile email',
        response_type: 'code',
        prompt: 'login'
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      advancedOptions={{
        defaultScope: 'openid profile email'
      }}
      onRedirectCallback={(appState) => {
        console.log('Auth0 redirect callback', appState);
      }}
      onError={(error) => {
        console.error('Auth0 error:', error);
      }}
    >
      <UserSync />
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider