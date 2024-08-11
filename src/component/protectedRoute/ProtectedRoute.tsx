"use client"
import { useUser } from '@/context/userContext/userProvider';
import { useRouter } from 'next/router';
import * as React from 'react';

const ProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAuth: React.FC<P> = (props) => {
      const { user } = useUser();
      const router = useRouter();
  
      if (typeof window !== 'undefined' && !user) {
        router.replace('/auth/login');
        return null;
      }
  
      return <WrappedComponent {...props} />;
    };

    return WithAuth;
}; 

export default ProtectedRoute;