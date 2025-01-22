"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthProvider';
import Cookies from 'js-cookie';

const page = () => {

    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);
    const handleLogout = () => {
            Cookies.remove('authToken');
                    Cookies.remove('userEmail');
                    Cookies.remove('firstName');
        router.push('/login');
    }

    const { user } = useAuth();

    useEffect(() => {
      // Mark the component as hydrated after mounting
      setIsHydrated(true);
    }, []);

    if (!isHydrated) {
      // Return null to avoid rendering during SSR
      return null;
    }


  return (
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h1 className="text-lg font-bold text-gray-800">Miracle Inside</h1>
          </div>
    <nav className="mt-6">
    <ul>
      <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <span>🏠</span>
          <span>Home</span>
        </Link>
      </li>
      <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
        <Link href="../scan/" className="flex items-center space-x-2">
          <span>🎫</span>
          <span>Scan</span>
        </Link>
      </li>
      <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">

        <button className="lex items-center space-x-2" onClick={handleLogout}>
          <span>🎫</span>
          <span>Logout</span>
          </button>

      </li>
    </ul>
  </nav>
  <div className="flex items-center px-6 py-4 mt-auto border-t">
        <div className="ml-3">
          <p className="text-sm text-gray-800">Welcome, {user?.name } </p>
          <p className="text-xs text-gray-500">{user?.email }</p>        
        </div>
      </div>
    </aside>
  )
}

export default page
