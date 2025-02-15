"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Navbar from '../navbar/page'
import { useAuth } from '../../AuthProvider'
import Link from 'next/link'
import Cookies from 'js-cookie';

const page = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

     const { user } = useAuth();
        const router = useRouter();
       
    
    console.log("Logged in user : ", user?.email, user?.name, user?.role);
    
    const [scanlist, Setscanlist] = useState([]);
    const [welcomeemail, Setwelcomeemail] = useState([]);


    
    const handleinviteEmail = async (email,fname,lname) => {
      console.log("clicked handleinviteEmail", email);
    
      email = "stevemotif@gmail.com";
      const response =  await fetch(`${API_URL}/sendwelcomeemail`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify({email, fname, lname})
    })
      .then(response => response.json())
      .then(data => {
        console.log("Welcome email : ", data);
        Setwelcomeemail(data);
      })
      .catch(error => console.error("API error:", error));
    }

    
    const fetchPatientImages = async (email,role) => {
    
    if(role === 'Admin')
    {
      console.log("Trying to get for users list for Admin");
      const response =  await fetch(`http://localhost:3006/getallpatientslist`, {
        method: "GET",
        headers: {'Content-Type' : 'application/json'}
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user list from API:", data);
       Setscanlist(data);
      })
      .catch(error => console.error("API error:", error));
    }
      };
    
    
    useEffect (() => {
      const token = Cookies.get('authToken');
      const role = Cookies.get('role');
    
      console.log("Logged in Token in user list Page : ", token);
      console.log("Role in user list Page : ", role);
      if (!token) {
        router.push('/login');
      }
    
        const email = user.email;
        fetchPatientImages(email,role);
    },[])
    

const modifyDate = (date) => {
    const dates = new Date(date);
    
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    
    return dates.toLocaleString('en-US', options);
    
    }

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}

      
        <Navbar/>

     

 {/* Main Content */}
 <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">New Patients</h1>

        </div>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        <div className="mt-6 space-y-4">

            {scanlist.map((items) => (

            <div key={items._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">

            <div>
                <h2 className="text-lg font-semibold text-gray-800">
              {items.firstname}  
                </h2>
                
                <p className="text-sm text-gray-600">  {items.email}  </p>
                <p className="text-sm text-gray-600">
                {items.password? "" : "Password is not set"  }  
                </p>
                <p className="text-sm text-gray-600"> 
                    Enrolled on :  
                     {modifyDate(items.createdAt)}  </p>
            </div>
            </div>
            <button className="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800" onClick={() => handleinviteEmail(items.email,items.firstname,items.lastname)}>
            Send Invite Email
            </button>
            </div>
                
            ))}
         
          {/* Add more events here */}
        </div>
      </main>
  </div>
  )
}

export default page
