'use client'
import { useState } from "react";
import React from 'react'
import Cookies from 'js-cookie';
import { useAuth } from '../AuthProvider';
import { toast } from 'react-hot-toast';


export default function page() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }


    const handleSubmit = async (e) => {

      try{
        e.preventDefault();
        setLoading(true);
       const response = await fetch("http://localhost:3006/login",{
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, password})
       })

       if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error('Invalid email or password!'); // Displays a success message
        setError('Invalid credentials');
        return;
    }

    const data = await response.json();
    console.log('Login data:', data);
    setLoading(false);
    // Update auth context
    login(data);
        window.location.href = '/scan';
      }catch{

      }finally {
       
      }
        
    };

  return (
//     <div>
//     <h1>Login</h1>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Login</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   </div>

<div className="flex items-center justify-center min-h-screen bg-gray-100">
<div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
<h2 className="text-3xl font-semibold text-gray-800 mb-6">Miracle inside</h2>
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
        Email
      </label>
      <input
        type="email"
        value={email}
        id="username"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
    </div>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember-me"
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
          Remember me
        </label>
      </div>
      <a href="/forgotpassword" className="text-sm text-blue-500 hover:underline">
        Forgot password?
      </a>
    </div>
    <button
      type="submit"
      className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    Login
    </button>
  </form>
  <p className="text-sm text-center text-gray-600 mt-6">
    Don’t have an account?{' '}
    <a href="/signup" className="text-blue-500 hover:underline">
      Sign up
    </a>
  </p>
</div>
</div>
  )
}
