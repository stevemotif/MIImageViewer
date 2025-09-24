import 'server-only'

import Stripe from 'stripe'

  const STRIPE_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
export const stripe = new Stripe(STRIPE_KEY)