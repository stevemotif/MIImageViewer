"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Navbar from '../navbar/page'
import { useAuth } from '../AuthProvider'
import Link from 'next/link'
import Cookies from 'js-cookie';

const page = () => {

    const { user } = useAuth();
    const router = useRouter();
   

console.log("Logged in user : ", user?.email, user?.name);

const [scanlist, Setscanlist] = useState([]);


const fetchPatientImages = async (email) => {


  const response =  await fetch(`https://miscanimageapi.vercel.app/getpatientimages?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {'Content-Type' : 'application/json'}
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data from API:", data);
       Setscanlist(data);
      })
      .catch(error => console.error("API error:", error));
  };


useEffect (() => {
  const token = Cookies.get('authToken');
  console.log("Logged in Token in Scan Page : ", token)
  if (!token) {
    router.push('/login');
  }

    const email = user.email;
    fetchPatientImages(email);
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
        <h1 className="text-2xl font-semibold text-gray-800">Scan</h1>

      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search scan..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-6 space-y-4">

        {scanlist?.map((list) => (
            
<Link href={`/scan-details/${list._id}`} key={list._id} className='pt-60'>
 <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow" >
 <div className="flex items-center space-x-4 ">

<Image
        src={list.images[0].url}
        alt="Hussain Umaiyah"
        className="w-20 h-20 rounded-lg"
        width={20} // Specify desired width
        height={20} // Specify desired height
        priority // Optional: Loads image with higher priority
      />
   <div>
     <h2 className="text-lg font-semibold text-gray-800">
  {list.scantype}
     </h2>
     <p className="text-sm text-gray-600">
  {modifyDate(list.createdAt)}
     </p>
     <p className="text-sm text-gray-600">90 days remaining for deletion</p>
   </div>


 </div>
 {/* <span className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
   On Sale
 </span> */}
</div>
</Link>
        ))}
       


        {/* Add more events here */}
      </div>
    </main>
  </div>
  )
}

export default page
