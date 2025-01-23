"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

    const [firstname, setFirstname] =  useState('');
    const [lastname, setLastname] =  useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [conpassword, setPasswordcon] =  useState('');
    const [dob, setDob] =  useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== conpassword){
            toast.error("Password doesn't match");
            return;
        }

        const response = await fetch("https://miscanimageapi.vercel.app/signup",{
            method : "POST",
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({firstname, lastname, email, password,dob})
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            toast.error(errorData.message);
           // toast.error('Invalid email or password!'); // Displays a success message
         
            return;
        }
    
        const data = await response.json();
        console.log('Signup response:', data);

        toast.success(data.message);

        setTimeout(function () {
            window.location.href = "/login"; //will redirect to your blog page (an ex: blog.html)
         }, 4000); //will call the function after 2 secs.

         
     //   window.location.href = '/login';
    }

  return (
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign up</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="f-name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="l-name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* dob */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">
              Date of birth
            </label>
            <input
              type="text"
              id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/DD/YYYY"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={conpassword}
              onChange={(e) => setPasswordcon(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default page
