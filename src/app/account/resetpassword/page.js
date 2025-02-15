"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(password, confirmPassword, dob);

    const response = await fetch(`${API_URL}/setpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, dob, token, email }),
    });

    if (!response.ok) {
      toast.error("Sorry, unable to set password at this moment");
      return;
    }

    const data = await response.json();
    console.log(data);
    toast.success("Password successfully reset!");

    setTimeout(() => {
      window.location.href = "../account/login";
    }, 4000);
  };

  useEffect(() => {
    console.log(token, email);
  }, [token, email]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Set Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="text"
              id="dob"
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <a href="/account/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
