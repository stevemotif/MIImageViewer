'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';

import {useParams, useSearchParams } from 'next/navigation';

import { useState, useEffect } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


const BookingPage = () => {
const { id } = useParams();
  const searchParams = useSearchParams();
  const scan = searchParams.get('scan');

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [fetchedSlots, setFetchedSlots] = useState([]);
const [loadingSlots, setLoadingSlots] = useState(false);
  const [product, setProduct] = useState(null);
  const [subservice, setSubService] = useState(null);

useEffect(() => {

  const fetchSlots = async () => {
    if (!selectedDate) return;

    setLoadingSlots(true);
console.log("Selected scan : ", scan);
console.log("Selected date : ", selectedDate);

    const formattedDate = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd

    try {
      const response = await fetch(`${API_URL}/getslotsforaday?date=${formattedDate}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      console.log("Fetched date slots from API:", data);
      setFetchedSlots(data); // Assuming API returns an array of booked time strings like ["09:00 AM", "09:30 AM"]
    } catch (error) {
      console.error("API error:", error);
      setFetchedSlots([]); // fallback
    }

    setLoadingSlots(false);
  };

  fetchSlots();
}, [selectedDate]);

useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3006/products/subservice/${id}`);
        const data = await res.json();
        console.log("fetch main Product : ", data.product);
        //setProduct(data);
        console.log(data.subService);
        setProduct(data.product);
        setSubService(data.subService);

      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    if (id) fetchProduct();
  }, [id]);


const navigateToAuth = () => {

    console.log("Selected scan : ", scan);
    console.log("Selected date : ", fetchedSlots.date);
    console.log("Selected time : ", selectedTime);
    const scanEncoded = encodeURIComponent(scan);
    const dateEncoded = encodeURIComponent(fetchedSlots.date);
    const timeEncoded = encodeURIComponent(selectedTime);

     window.location.href = `/account/signup?scan=${scanEncoded}&date=${dateEncoded}&time=${timeEncoded}`;


}

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="text-center py-2 text-gray-400">
          {prevMonthDays - firstDay + i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
  const date = new Date(currentYear, currentMonth, i);
  const isToday = date.toDateString() === today.toDateString();
  const isSelected =
    selectedDate?.getDate?.() === i &&
    selectedDate?.getMonth?.() === currentMonth &&
    selectedDate?.getFullYear?.() === currentYear;

  const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  days.push(
    <div
      key={`day-${i}`}
      className={`text-center py-2 rounded-full calendar-day
        ${isToday ? 'bg-blue-100 text-blue-800' : ''}
        ${isSelected ? 'bg-blue-500 text-white font-bold' : ''}
        ${isPastDate ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
      onClick={() => {
        if (!isPastDate) setSelectedDate(date);
      }}
    >
      {i}
    </div>
  );
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="text-center py-2 text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

 const renderTimeSlots = () => {
  if (!selectedDate || !fetchedSlots?.slots) return [];

  const isToday =
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear();

  return fetchedSlots.slots
    .map(slot => slot.time)
    .filter(time => {
      if (!isToday) return true;

      const [timeString, meridian] = time.split(' ');
      let [hours, minutes] = timeString.split(':').map(Number);
      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      const slotDate = new Date(selectedDate);
      slotDate.setHours(hours, minutes, 0, 0);

      return slotDate > today;
    })
    .map(time => (
      <div
        key={time}
        className={`text-center py-2 px-3 rounded-md border border-gray-200
          ${selectedTime === time ? 'bg-blue-500 text-white font-bold' : 'cursor-pointer hover:bg-blue-100'}`}
        onClick={() => setSelectedTime(time)}
      >
        {time}
      </div>
    ));
};


  if (!product) return <p className="p-6">Loading...</p>;

  return (

    <div id="app" className="min-h-screen">
  
    <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <i className="fas fa-cube text-blue-500 text-2xl mr-2"></i>
                        <span className="text-xl font-semibold text-gray-900">ScanVision</span>
                    </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button id="cart-btn" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                        <i className="fas fa-shopping-cart text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>


    <main id="content" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

    <div className="booking-page">
      <div className="flex justify-between items-center mb-8">

        <Link href={'../'}>
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Services
        </button>

</Link>
        <h2 className="text-2xl font-bold text-gray-900">Book a Service</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
            <div className="calendar-container bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <button className="p-2 rounded-full hover:bg-gray-100" onClick={handlePrevMonth}>
                  <FaChevronLeft />
                </button>
                <h4 className="text-lg font-semibold">
                  {monthNames[currentMonth]} {currentYear}
                </h4>
                <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleNextMonth}>
                  <FaChevronRight />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2 text-sm text-gray-500 text-center font-medium">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2" id="calendar-days">
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
<div id="time-slots" className="grid grid-cols-2 md:grid-cols-3 gap-3">
  {renderTimeSlots()}
</div>

          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <div id="selected-service-details" className="space-y-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <i className="fas fa-baby text-white"></i>
                    </div>
                    <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">{product.serviceName}</h4>
                        {/* <p className="text-gray-600">Veracity is the new generation, targeted Non-invasive Prenatal test (NIPT) performed to detect genetic diseases such as trisomies, sex chromosome aneuploidies, and microdeletions.</p> */}
                    {/* {product.subServices.map((s, idx) => ( */}
          <div  className="flex justify-between mt-2">
            <span className="text-gray-600">{subservice.title}</span>
          </div>
        {/* ))} */}
                   
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">30 min</span>
                    </div>
                                    
 {/* {product.subServices.map((s, idx) => ( */}
          <div className="flex justify-between mt-2">
            <span className="text-gray-600"> {subservice.title}   :</span>
            <span className="font-medium text-blue-600">£{subservice.price}</span>
          </div>
        {/* ))} */}
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium text-blue-600">£{subservice.price}</span>
                    </div>
                </div>
            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">Your Appointment</h4>
                                <div id="appointment-summary" className="space-y-2 text-gray-700">
                                    <p>{fetchedSlots.date}</p>
                                    <p>{selectedTime}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-blue-100">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span id="service-price">£{subservice.price}</span>
                                    </div>
                                </div>
                                <button id="continue-to-auth" onClick={navigateToAuth} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled="">
                                    Continue to Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>

    </main>
    </div>
  );
};

export default BookingPage;
