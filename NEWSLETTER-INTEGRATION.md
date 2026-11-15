# CleanMa newsletter and English landing

The landing uses English (en-GB) across its pages, shared navigation, footer and client-side messages. Landing pricing and the savings calculator now use GBP with UK number formatting. Monthly plans are £89.99, £179.99 and £299.99; annual totals retain the requested 14% offer (£928.70, £1,857.50 and £3,095.90).

Footer columns are SUPPORT, THE COMPANY and CLEANMA CONTACT. User Guides links to /#features, Start Guide to /#videoPlayer and The Story to /#hero. Contact Support addresses support@cleanma.com and contact@cleanma.com in a single mailto message; both addresses also have individual links. A compact opt-in form below the logo is active again, with explicit marketing consent and success only after confirmed backend response. The five-card Cleaner App section and GBP prices remain intact.

The everyday-work section displays the four indicators and twelve named testimonials supplied by the site owner. Their authenticity, customer count, rating, absolute security and refund claims have not been independently verified; no verified-review badge or review structured data was added. The ten FAQ questions and answers use the exact owner-supplied copy and the existing Bootstrap collapse animation with accessible controls.

## Backend activation — 15 November 2026

Supabase project `eymkowczlmbrfxlxcwdm`: migration `landing_newsletter_and_billing_selection` applied successfully. `newsletter_subscribers` and `subscription_selections` exist with RLS. Anonymous table reads/writes are denied. The `newsletter-subscribe` Edge Function is ACTIVE and validates origin, public application key, explicit consent, email and honeypot, with server-side rate limiting. Service credentials stay inside Supabase.

A hosted HTTP test rejected a malformed email (400), accepted a reserved-domain test address (200), and the resulting database row was verified and removed. No real subscriber was used. Success is shown only after a successful backend response. No campaigns are sent.

Contacts are available to the administrator in the Supabase Table Editor. The app-side contacts interface and plan-selection/auth integration remain in `Erickmunizzz/cleanmaapp` draft PR #1; that app code has not been deployed. Creating the selection table does not activate paid subscriptions. Stripe checkout and webhooks still require provider configuration.

Validation: landing production build passed with no errors or warnings; Astro check reported 0 errors, 0 warnings and 7 existing informational hints. Footer anchor targets exist in generated HTML. No changes were made to domain routing or the production admin app.
