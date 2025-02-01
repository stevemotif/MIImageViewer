"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../navbar/page";
import Link from "next/link";

async function fetchScanDetails(id) {
  const res = await fetch(`https://miscanimageapi.vercel.app/getpatientimages/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function ScanDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap the `params` promise
  const { id } = params; // Access dynamic route parameter
  const [scanDetails, setScanDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchScanDetails(id);
        console.log(data);
        setScanDetails(data);
      } catch (error) {
        console.error("Error fetching scan details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!scanDetails) {
    return <div>Error: Unable to load scan details</div>;
  }

  const handleDownload = async (url) => {
    try {
     
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = url.split("/").pop(); // Extract the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/scan">Back to Scan</Link>
          <h1 className="text-2xl font-semibold text-gray-800">{scanDetails.scantype}</h1>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {scanDetails.images.map((image) => (
            <div key={image._id} className="bg-white rounded-lg shadow p-4">
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  width={300}
                  height={200}
                />
              </a>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-800">{image.name}</p>
               

                <button
  onClick={() => handleDownload(image.url)}
  className="text-blue-500 hover:text-blue-700 transition-colors"
>
<svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 16l4-4H8l4 4zm0-14c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z" />
                </svg>
</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
