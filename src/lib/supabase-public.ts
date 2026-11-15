// Public configuration only. Never expose a service-role credential here.
const base = import.meta.env.PUBLIC_SUPABASE_URL?.replace(/\/$/, '') || '';
export const newsletterUrl = base ? `${base}/functions/v1/newsletter-subscribe` : '';
export const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
