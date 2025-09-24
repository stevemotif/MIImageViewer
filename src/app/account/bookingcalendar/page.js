"use client"
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';


const generateTimeSlots = () => {
  const slots = [];
  let start = 9 * 60; // 9:00 AM
  const end = 19 * 60; // 7:00 PM
  while (start < end) {
    const hour = Math.floor(start / 60);
    const minutes = start % 60;
    slots.push(
      `${hour % 12 === 0 ? 12 : hour % 12}:${minutes === 0 ? "00" : minutes} ${hour >= 12 ? "PM" : "AM"}`
    );
    start += 15;
  }
  return slots;
};

const timeSlots = generateTimeSlots();

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1); // Monday as start of the week
  d.setUTCDate(diff);
  return d;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getWeekDates(startDate) {
  const start = new Date(startDate);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    return d;
  });
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [copiedSlots, setCopiedSlots] = useState(null);
  const [copiedWeek, setCopiedWeek] = useState(null);
  const [blockedSchedule, setBlockedSchedule] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);

    const [error, setError] = useState('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [year, month, day] = selectedDate.split("-");
  const startOfWeek = getStartOfWeek(new Date(Date.UTC(year, month - 1, day)));
  const weekDates = getWeekDates(startOfWeek);

  const isSelectedDayInWeek = weekDates.some(
    (d) => formatDate(d) === selectedDay
  );

  const toggleSlot = (day, slot) => {
    setSchedule((prev) => {
      const daySlots = new Set(prev[day] || []);
      if (daySlots.has(slot)) {
        daySlots.delete(slot);
      } else {
        daySlots.add(slot);
      }
      return { ...prev, [day]: Array.from(daySlots) };
    });
  };

  const handlePaste = (day) => {
    if (copiedSlots) {
      setSchedule((prev) => ({
        ...prev,
        [day]: Array.from(new Set([...(prev[day] || []), ...copiedSlots])),
      }));
    }
  };

  const handleWeekPaste = () => {
    if (copiedWeek) {
      setSchedule(copiedWeek);
    }
  };

  const getBlockedDates = async() =>{
    try {
        const response = await fetch(`${API_URL}/getallblockeddates`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
    
        const data = await response.json();
    
        const transformed = {};
    
        data.forEach((entry) => {
          transformed[entry.date] = entry.slots.map((slot) => slot.time);
        });
    
        setBlockedSchedule(transformed);
        console.log("Blocked schedule:", transformed);
      } catch (error) {
        console.error("API error:", error);
      }
  }

  useEffect(()=>{
    getBlockedDates();
  },[])
  const handleSubmit = async () => {
    console.log("Selected Schedule:", schedule);
  
    // Transform the schedule to match Option 1 schema
    const transformedSchedule = Object.entries(schedule).map(([date, slots]) => ({
      date,
      slots: slots.map((time) => ({
        time,
        patientId: null  // Add patientId if known, or leave null for available slots
      }))
    }));
  
    try {
      const response = await fetch(`${API_URL}/bookingcalendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookings: transformedSchedule }) // send as "bookings"
      });
  
      if (!response.ok) {
        const errorData = await response.json();
    //    console.error("Server error:", errorData);
        toast.error("Calendar data not updated");
        setError("Calendar data not updated");
        return;
      }
  
      toast.success("Calendar saved successfully");
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong");
    }
  };
  

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Booking System</h1>

      <label className="mb-4 block">
        <span className="font-semibold">Select a date to show its week:</span>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedDay(null);
          }}
          className="mt-2 border rounded px-3 py-1"
        />
      </label>

      <div className="flex gap-2 mb-6 mt-4">
        {weekDates.map((date) => {
          const dayStr = date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "Europe/London" });
          const dateKey = formatDate(date);
          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDay(dateKey)}
              className={`px-4 py-2 rounded border ${
                selectedDay === dateKey ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {dayStr} <br /> {date.getUTCDate()}/{date.getUTCMonth() + 1}
            </button>
          );
        })}
      </div>

      {selectedDay && isSelectedDayInWeek && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Slots for {selectedDay}
          </h2>
          <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((slot) => {
  const isSelected = schedule[selectedDay]?.includes(slot);
  const isBlocked = blockedSchedule[selectedDay]?.includes(slot);

  return (
    <button
      key={slot}
      onClick={() => {
        if (!isBlocked) toggleSlot(selectedDay, slot);
      }}
      disabled={isBlocked}
      className={`border rounded px-2 py-1 text-sm ${
        isBlocked
          ? "bg-red-400 text-white cursor-not-allowed"
          : isSelected
          ? "bg-green-500 text-white"
          : "bg-gray-100"
      }`}
    >
      {slot}
    </button>
  );
})}

          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-yellow-400 px-3 py-1 rounded"
              onClick={() => setCopiedSlots(schedule[selectedDay] || [])}
            >
              Copy Day
            </button>
            <button
              className="bg-green-300 px-3 py-1 rounded"
              onClick={() => handlePaste(selectedDay)}
            >
              Paste to Day
            </button>
          </div>
        </div>
      )}





      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCopiedWeek(schedule)}
        >
          Copy Week
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleWeekPaste}
        >
          Paste Week
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
