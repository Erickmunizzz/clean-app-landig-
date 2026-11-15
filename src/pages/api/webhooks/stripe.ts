import type { APIRoute } from 'astro';
// No subscription fulfilment is configured in this landing. Do not acknowledge
// payment events as processed or mark accounts as paid without a durable handler.
export const prerender = false;
export const POST: APIRoute = async () => Response.json({error:'Subscription fulfilment is not configured.'},{status:503});
