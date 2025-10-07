// This is a Server Component API Route

import { NextResponse } from 'next/server'
//import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY) // Use .env.local instead of hardcoding

export async function POST(req) {
 try {

  const body = await req.json();
    const { scan, date, time, email } = body;


    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: 'http://localhost:3000/account/return?session_id={CHECKOUT_SESSION_ID}',

      line_items: [
        {
          price_data: {
            currency: 'GBP',
            product_data: {
              name: scan
            },
            unit_amount: 100, // $20.00
          },
          quantity: 1,
        },
      ],
      customer_email: email, // optional: pre-fills email at checkout
  metadata: {
     patient_name: 'Amos',
    scan_type: scan,
    appointment_date: date,
    appointment_time: time,
    patient_email: email,
  },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (err) {
    console.error('Error creating Checkout Session:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
