import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function GET({ url }) {
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Missing session_id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ error: 'Payment not completed' }), {
        status: 402,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (session.metadata?.product !== 'brigade_pro_v1') {
      return new Response(JSON.stringify({ error: 'Invalid product' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = createHash('sha256')
      .update(`${sessionId}:${env.PRO_TOKEN_SECRET}`)
      .digest('hex')
      .slice(0, 32);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Verification error:', err);
    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}