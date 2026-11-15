# CleanMa newsletter and English landing

The landing uses English (en-GB) across its pages, shared navigation, footer and client-side messages. Landing pricing and the savings calculator now use GBP with UK number formatting. Monthly plans are £89.99, £179.99 and £299.99; annual totals retain the requested 14% offer (£928.70, £1,857.50 and £3,095.90).

Footer columns are now Product, Solutions and CleanMa, with plan links and navigation to the cleaner app, features, demo, hero and login. Contact Support opens one message addressed to support@cleanma.com and contact@cleanma.com. The newsletter form and its script were removed from the footer at the owner’s request. Existing stored contacts and backend remain intact. A five-card Cleaner App section follows Features and uses the existing scroll reveal animation. Existing layout classes and animations are retained. The requested trust/uptime block is removed.

## Backend activation — 15 November 2026

Supabase project `eymkowczlmbrfxlxcwdm`: migration `landing_newsletter_and_billing_selection` applied successfully. `newsletter_subscribers` and `subscription_selections` exist with RLS. Anonymous table reads/writes are denied. The `newsletter-subscribe` Edge Function is ACTIVE and validates origin, public application key, explicit consent, email and honeypot, with server-side rate limiting. Service credentials stay inside Supabase.

A hosted HTTP test rejected a malformed email (400), accepted a reserved-domain test address (200), and the resulting database row was verified and removed. No real subscriber was used. Success is shown only after a successful backend response. No campaigns are sent.

Contacts are available to the administrator in the Supabase Table Editor. The app-side contacts interface and plan-selection/auth integration remain in `Erickmunizzz/cleanmaapp` draft PR #1; that app code has not been deployed. Creating the selection table does not activate paid subscriptions. Stripe checkout and webhooks still require provider configuration.

Validation: landing production build passed with no errors or warnings; Astro check reported 0 errors, 0 warnings and 7 existing informational hints. Footer anchor targets exist in generated HTML. No changes were made to domain routing or the production admin app.
