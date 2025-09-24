'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/page'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const ProductList = () => {
  const [products, setProducts] = useState([]);
const router = useRouter();
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3006/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleToggle = async (id) => {
    const updatedProducts = products.map((p) =>
      p._id === id ? { ...p, enabled: !p.enabled } : p
    );
    setProducts(updatedProducts);

    // Optionally update backend
    try {
      await fetch(`http://localhost:3006/products/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !products.find((p) => p._id === id).enabled }),
      });
    } catch (err) {
      console.error('Error updating toggle state:', err);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar is imported in layout */}
              <Navbar/>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <Link href="/account/services/add" >
           <button
    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
  >
    Add
  </button>
  </Link>
        </div>

 <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800">{product.serviceName}</h2>

              <div className="flex items-center space-x-4">
                {/* Toggle Button */}
                <button
                  onClick={() => handleToggle(product._id)}
                  className={`relative w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none ${
                    product.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      product.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>

                {/* Edit Button */}
<button
  onClick={() => router.push(`/account/services/add?id=${product._id}`)}
  className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
>
  Edit
</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
