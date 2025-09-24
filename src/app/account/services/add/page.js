'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../../navbar/page'
import { useSearchParams } from 'next/navigation';


const ServicesPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [serviceName, setServiceName] = useState('');
  const [subServices, setSubServices] = useState([{ title: '', price: '' }]);

  // Fetch product for editing
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3006/products/${productId}`);
        const data = await res.json();

        setServiceName(data.serviceName || '');
        setSubServices(data.subServices || [{ title: '', price: '' }]);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubChange = (index, field, value) => {
    const updated = [...subServices];
    updated[index][field] = field === 'price' ? parseFloat(value) || '' : value;
    setSubServices(updated);
  };

  const addSubService = () => {
    setSubServices([...subServices, { title: '', price: '' }]);
  };

  const totalPrice = subServices.reduce((sum, sub) => sum + (parseFloat(sub.price) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      serviceName,
      totalPrice,
      subServices,
    };

    const url = productId
      ? `http://localhost:3006/products/${productId}`
      : 'http://localhost:3006/addservice';

    const method = productId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const result = await response.json();
      alert(`Product ${productId ? 'updated' : 'added'} successfully!`);

      if (!productId) {
        setServiceName('');
        setSubServices([{ title: '', price: '' }]);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Something went wrong');
    }
  };

  return (
        <div className="flex min-h-screen bg-gray-100">


      
        <Navbar/>
    <main className="flex-1 p-6">
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Service */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Main Product Name</span>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. NIPT Test"
                required
              />
            </label>

            {/* Sub-services List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Sub Product</h3>

              {subServices.map((sub, idx) => (
                <div key={idx} className="flex gap-4">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Sub service title"
                    value={sub.title}
                    onChange={(e) => handleSubChange(idx, 'title', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Price (£)"
                    value={sub.price}
                    onChange={(e) => handleSubChange(idx, 'price', e.target.value)}
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addSubService}
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
              >
                + Add another sub product
              </button>
            </div>

            {/* Total Price */}
            <div className="border-t pt-4 mt-4">
              <p className="text-md text-gray-800 font-semibold">
                Total Price: <span className="text-blue-600">£{totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
    </main>
        </div>

  );
};

export default ServicesPage;
