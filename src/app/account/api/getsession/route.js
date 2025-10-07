import { NextResponse } from 'next/server'
//import Stripe from 'stripe'

  const STRIPE_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

const stripe = new Stripe(STRIPE_KEY)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
 const sessionId = searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json(session)
  } catch (err) {
    console.error('Stripe retrieve error:', err)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
