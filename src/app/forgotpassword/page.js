import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forgot Password</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
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
        <a href="/login" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  </div>
  )
}

export default page
