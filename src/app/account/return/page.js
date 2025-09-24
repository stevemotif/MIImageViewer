'use client'

import { useSearchParams ,useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ReturnPage() {
 const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState(null)
  const [emailSent, setEmailSent] = useState(false)
 const [countdown, setCountdown] = useState(5)
 const router = useRouter()

 useEffect(() => {
    if (!sessionId) return

    const fetchSession = async () => {
      const response = await fetch(`/account/api/getsession?session_id=${sessionId}`)
      const data = await response.json()
      console.log("return data",data);
      setSessionData(data)
    }



    fetchSession()
  }, [sessionId])

  // Send email once sessionData is available
  useEffect(() => {
    if (!sessionData || emailSent) return

    const sendEmail = async () => {
      try {
        const response = await fetch('http://localhost:3006/sendappointmentconfirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:sessionData.metadata.patient_name,
            scanType: sessionData.metadata.scan_type,
            date: sessionData.metadata.appointment_date,
            time: sessionData.metadata.appointment_time,
            email: sessionData.customer_email,
          }),
        })

        if (response.ok) {
          console.log('Email sent successfully')
          setEmailSent(true)
        } else {
          console.error('Email sending failed')
        }
      } catch (error) {
        console.error('Error while sending email:', error)
      }
    }

    sendEmail()
  }, [sessionData, emailSent])

// Redirect with countdown
  useEffect(() => {
    if (!sessionData) return

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      router.push('/account/login') // Redirect to home page
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [sessionData, router])

  useEffect(() => {
    if (!sessionData || emailSent) return

    const updateDB = async () => {
      try {
       const date = encodeURIComponent(sessionData.metadata.appointment_date);
      const time = encodeURIComponent(sessionData.metadata.appointment_time);
      const email = encodeURIComponent(sessionData.customer_email);

      const response = await fetch(
        `http://localhost:3006/updateappointmentbooking?date=${date}&time=${time}&email=${email}`,
        {
          method: 'PUT',
        }
      );



        if (response.ok) {
          console.log('Db updated successfully')
          //setEmailSent(true)
        } else {
           console.log(response);
          console.error('Db update failed')
        }
      } catch (error) {
        console.error('Error while updating db', error)
      }
    }

    updateDB()
  }, [sessionData, emailSent])

if (!sessionData) return <p>Loading session...</p>

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">Payment Successful!</h1>
      <p><strong>Scan Type:</strong> {sessionData.metadata.scan_type}</p>
      <p><strong>Date:</strong> {sessionData.metadata.appointment_date}</p>
      <p><strong>Time:</strong> {sessionData.metadata.appointment_time}</p>
      <p><strong>Email:</strong> {sessionData.customer_email}</p>

      <br></br>

      <br></br>

      <br></br>

{emailSent && (
        <p className="mt-4 text-green-600">
          Confirmation email sent! Redirecting you in {countdown} seconds...
        </p>
      )}
    </div>
  )
}
