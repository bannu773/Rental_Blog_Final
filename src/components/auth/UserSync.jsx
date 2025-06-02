"use client";

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const UserSync = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const createOrUpdateUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.picture,
              sub: user.sub
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create/update user');
          }

          const data = await response.json();
          console.log('User created/updated successfully:', data);
        } catch (error) {
          console.error('Error creating/updating user:', error);
        }
      }
    };

    createOrUpdateUser();
  }, [isAuthenticated, user]);

  return null; // This component doesn't render anything
};

export default UserSync; 