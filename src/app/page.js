"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Navbar from "../app/navbar/page";
import Cookies from 'js-cookie';

export default function Home() {

  useEffect (() => {
    const token = Cookies.get('authToken');
    console.log("Logged in Token in Home Page : ", token)
    if (!token) {
      router.push('/login');
    }

  },[])



  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}

      
        <Navbar/>

    <main className="flex-1 p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Home</h1>

    </div>

    <div className="mt-6 space-y-4">

      {/* Add more events here */}
    </div>
  </main>
  </div>
  );
}
