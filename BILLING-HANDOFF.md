# Authenticated billing handoff

Companion to the cleanmaapp real-billing-connect-xero branch. The legacy pricing component now redirects to the owner's sign-in page with plan/interval instead of posting an unauthenticated email/price. The monthly/yearly secondary pricing data uses GBP and annual totals; the homepage already has the correct GBP offer.

The landing /api/checkout is an authenticated forwarding endpoint to https://cleanmaapp.com/api/payments. The main app verifies identity and company ownership and owns all official Price IDs and webhook activation. No card payment or plan activation occurs merely by redirecting to this page. Deploy only after the companion app/database are validated. The production /api namespace belongs to the owner application.

Build and Astro type check passed with zero errors/warnings. A browser flow through sign-in and payment has not yet been validated. Backend configuration, migration approval and Stripe webhook registration remain release prerequisites.
