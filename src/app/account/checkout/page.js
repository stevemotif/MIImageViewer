'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchClientSecret } from '../../utils/fetchclient/page' // safe for client
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);


export default function Checkout() {

          const searchParams = useSearchParams();
      const router = useRouter();
    
      const scan = searchParams.get('scan');
      const date = searchParams.get('date');
      const time = searchParams.get('time');
 const email = searchParams.get('email');

        const [clientSecret, setClientSecret] = useState(null);

useEffect(() => {
    const loadClientSecret = async () => {
      const secret = await fetchClientSecret(scan, date, time, email);
      setClientSecret(secret);
    }

     if (scan && date && time && email) {
      loadClientSecret();
    }
  }, [scan, date, time, email]);

  if (!clientSecret) return <p>Loading checkout...</p>;



  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
