# CleanMa newsletter and English landing

The landing uses English (en-GB) across its pages, shared navigation, footer and client-side messages. BRL prices and annual amounts remain as explicitly requested by the owner.

Footer columns: SUPPORT (User Guides, Contact Support, Start Guide), THE COMPANY (The Story), CLEANMA CONTACT (individual email links). Contact Support opens one message addressed to both support@cleanma.com and contact@cleanma.com. Anchors point to the homepage features, demo video and hero. Existing layout classes and animations are retained. The requested trust/uptime block is removed.

## Backend activation — 15 November 2026

Supabase project `eymkowczlmbrfxlxcwdm`: migration `landing_newsletter_and_billing_selection` applied successfully. `newsletter_subscribers` and `subscription_selections` exist with RLS. Anonymous table reads/writes are denied. The `newsletter-subscribe` Edge Function is ACTIVE and validates origin, public application key, explicit consent, email and honeypot, with server-side rate limiting. Service credentials stay inside Supabase.

A hosted HTTP test rejected a malformed email (400), accepted a reserved-domain test address (200), and the resulting database row was verified and removed. No real subscriber was used. Success is shown only after a successful backend response. No campaigns are sent.

Contacts are available to the administrator in the Supabase Table Editor. The app-side contacts interface and plan-selection/auth integration remain in `Erickmunizzz/cleanmaapp` draft PR #1; that app code has not been deployed. Creating the selection table does not activate paid subscriptions. Stripe checkout and webhooks still require provider configuration.

Validation: landing production build passed with no errors or warnings; Astro check reported 0 errors, 0 warnings and 7 existing informational hints. Footer anchor targets exist in generated HTML. No changes were made to domain routing or the production admin app.
