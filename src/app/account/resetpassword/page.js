"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function page() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, Setpassword] = useState();
    const [confirmpassword, Setconfirmpassword] = useState();
    const [dob, Setdob] = useState();

const handleResetPassword = async (e) =>{
    e.preventDefault();
    console.log(password + " " + confirmpassword + " " + dob);

    const response = await fetch(`${API_URL}/setpassword`,{
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body :  JSON.stringify({password, dob, token, email})
    })

    if(!response.ok){
        const result = await response.json();
        toast.error('Sorry unable to set password at this moment'); // Displays a success message
        return;
    }

    const data = await response.json();
    console.log(data);
    toast.success(data);

    setTimeout(function () {
        window.location.href = "../account/login"; //will redirect to your blog page (an ex: blog.html)
     }, 4000); //will call the function after 2 secs.

}


    useEffect(()=> {
        console.log(token + " ||| " + email);
    })
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Set Password</h2>
      {/* <p className="text-sm text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p> */}
      <form onSubmit={handleResetPassword}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => Setpassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
           Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => Setconfirmpassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">
              Date of birth
            </label>
            <input
              type="text"
              id="dob"
                onChange={(e) => Setdob(e.target.value)}
              
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/DD/YYYY"
            />
          </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm
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
