'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

const [dob, setDob] = useState();
const [email, setEmail] = useState();


const url = process.env.NEXT_PUBLIC_APIURL;

  const handleForgotpwd = async (e) => {
    e.preventDefault();

      const response = await fetch(`${API_URL}/forgotpassword`,{
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, dob})
      })

      if(!response.ok){
          const result = await response.json();
          toast.error(result);
      }

      const data = await response.json();     
      toast.success(data);
      setEmail("");
      setDob("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forgot Password</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleForgotpwd}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email" onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">
            Date of birth in MM/DD/YYYY
          </label>
          <input
            type="text"
            id="dob" onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM/DD/YYYY"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back to Login */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Remember your password?{' '}
        <a href="/account/login" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  </div>
  )
}

export default page
