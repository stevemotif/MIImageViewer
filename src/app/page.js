"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./account/navbar/page";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
const [products, setProducts] = useState([]);
 const [isOpen, setIsOpen] = useState(false);
 const [modaldata, setModalData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3006/products');
        const data = await res.json();
        //console.log(data);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const selectScan = (scanName) => {
    console.log('Selected scan:', scanName);
  };

const openModal = async (id) => {
 const selectedProduct = products.find(p => p._id === id);

  if (selectedProduct) {
    setModalData(selectedProduct.subServices || []);
    setIsOpen(true);
  } else {
    console.warn("No product found with id:", id);
  }
}



  return (
    <>
      <div id="app" className="min-h-screen">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <i className="fas fa-cube text-blue-500 text-2xl mr-2"></i>
                  <span className="text-xl font-semibold text-gray-900">
                    Miracle Inside Booking System
                  </span>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  id="cart-btn"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main
          id="content"
          className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        >
          <div id="products-page" className="fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Blood Tests Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Step into the future of diagnostics with our cutting-edge blood
                testing technology.
              </p>
            </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {products
  .filter((product) => product.enabled)
  .map((product) => (
        //   <Link
        //     key={product._id}
        //     href={{
        //       pathname: `/book/${product._id}`,
        //       query: { scan: product.serviceName },
        //     }}
        //     onClick={() => selectScan(product.serviceName)}
        //     className="block"
        //   >

       < span key={product._id}
  onClick={() => openModal(product._id)}
  className="text-blue-600 hover:underline cursor-pointer">
             
            <div className="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <i className="fas fa-baby text-white text-6xl"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.serviceName}
                </h3>
                <p className="text-gray-600 mb-4">
                  {/* Optional: list sub services */}
                  {/* {product.subServices.map((s) => s.title).join(', ')} */}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    {/* £{product.totalPrice} */}
                  </span>
                  <span className="text-sm text-gray-500">30 min session</span>
                </div>
              </div>
            </div>
   </span>
        ))}
      </div>



          </div>

{/* Modal Overlay */}
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    {/* Modal Box */}
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative max-h-[90vh] overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Select a NIPT Test</h2>

      {/* Scrollable list wrapper */}
      <div className="overflow-y-auto max-h-[60vh] pr-1">
        <ul className="space-y-4">
          {modaldata.map((test, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-medium text-gray-800">{test.title}</h3>
                <p className="text-sm text-gray-600">£{test.price}</p>
              </div>
              {/* <button
                onClick={() => {
                  console.log("Booking:", test.title);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                 </button> */}
                       <Link
            key={test._id}
            href={{
              pathname: `/book/${test._id}`,
              query: { scan: test.title },
            }}
            onClick={() => selectScan(test.title)}
            className="block"
          >

                Book
             </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Close Button (X) */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </button>
    </div>
  </div>
)}



          <div
            id="success-page"
            className="hidden max-w-2xl mx-auto text-center fade-in"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-green-500 text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your booking. Your appointment has been confirmed.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-blue-800 mb-4 text-center">
                  Appointment Details
                </h3>
                <div
                  id="success-appointment-details"
                  className="space-y-3"
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                
                  className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-300"
                >
                  Browse More Services
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  View Appointment
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Need help?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>


        </main>
      </div>
    </>
  );
}
