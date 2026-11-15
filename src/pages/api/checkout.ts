import type { APIRoute } from "astro";
import Stripe from "stripe";
export const prerender = false;
const expected = { starter: { month: 8999, year: 92870 }, growth: { month: 17999, year: 185750 }, scale: { month: 29999, year: 309590 } } as const;
const reply = (status: number, error: string) => Response.json({success: false, error}, {status, headers: {'Cache-Control':'no-store'}});
export const POST: APIRoute = async ({request}) => {
  if (request.headers.get('origin') !== 'https://cleanmaapp.com' && request.headers.get('origin') !== 'https://cleanma-landing.vercel.app') return reply(403, 'Origin not allowed.');
  let body: Record<string, unknown>;
  try { const raw = await request.text(); if(raw.length > 4096) return reply(413, 'Request too large.'); body = JSON.parse(raw); } catch { return reply(400, 'Invalid request.'); }
  if (!body || typeof body !== 'object' || 'price' in body || 'price_id' in body || 'amount' in body || 'currency' in body) return reply(400, 'Only a plan and billing interval may select a price.');
  const {plan, interval, email} = body;
  if ((plan !== 'starter' && plan !== 'growth' && plan !== 'scale') || (interval !== 'month' && interval !== 'year') || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, 'Invalid plan, billing interval or email.');
  const ids = {
    starter: {month: import.meta.env.STRIPE_PRICE_STARTER_MONTH, year: import.meta.env.STRIPE_PRICE_STARTER_YEAR},
    growth: {month: import.meta.env.STRIPE_PRICE_GROWTH_MONTH, year: import.meta.env.STRIPE_PRICE_GROWTH_YEAR},
    scale: {month: import.meta.env.STRIPE_PRICE_SCALE_MONTH, year: import.meta.env.STRIPE_PRICE_SCALE_YEAR},
  };
  const id = ids[plan][interval];
  const secret = import.meta.env.STRIPE_SECRET_KEY;
  if (!secret || !id || !/^price_[A-Za-z0-9]+$/.test(id)) return reply(503, 'Checkout is not configured yet. Please contact support.');
  try {
    const stripe = new Stripe(secret);
    const price = await stripe.prices.retrieve(id);
    if (!price.active || price.currency !== 'gbp' || price.type !== 'recurring' || price.recurring?.interval !== interval || price.recurring.interval_count !== 1 || price.billing_scheme !== 'per_unit' || price.unit_amount !== expected[plan][interval] || price.custom_unit_amount || price.currency_options) return reply(503, 'The selected plan is unavailable. Please contact support.');
    const session = await stripe.checkout.sessions.create({mode:'subscription', currency:'gbp', customer_email:email.trim().toLowerCase(), line_items:[{price:id, quantity:1}], metadata:{plan,interval}, success_url:'https://cleanmaapp.com/admin/login?checkout=returned', cancel_url:'https://cleanmaapp.com/#pricing'});
    return Response.json({success:true,url:session.url},{headers:{'Cache-Control':'no-store'}});
  } catch { return reply(502, 'Checkout could not be started. Please try again later.'); }
};
