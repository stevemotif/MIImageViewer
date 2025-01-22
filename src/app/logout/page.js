'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      // If no token is present, redirect to login
      router.replace('/login');
    } else {
      // Clear token and redirect
      Cookies.remove('authToken');
              Cookies.remove('userEmail');
              Cookies.remove('firstName');
      router.replace('/login');
    }
  }, [router]);

  return (
    <div>
      <p>Logging you out...</p>
    </div>
  );
}
