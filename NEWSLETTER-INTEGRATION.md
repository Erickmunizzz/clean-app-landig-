# Newsletter form — not activated in production

This branch contains the footer opt-in form and client-side success/error states. It is a companion to `Erickmunizzz/cleanmaapp` PR #1.

The production landing currently publishes the BRL annual offer and 14% pricing selector only. This form must remain in draft until the Supabase migration in the app PR is applied and its `newsletter-subscribe` function is deployed and tested.

The form requires explicit marketing consent, sends only email/consent/honeypot values, disables duplicate submissions and displays success only after a successful backend response. It never treats a local UI event or local storage as a saved lead. No email campaigns are sent.

The existing main Supabase project is `eymkowczlmbrfxlxcwdm`; the browser includes only its already-public publishable key. The service credential stays inside Supabase Edge Functions.

Local build and type checks passed. Hosted insert and admin-access verification have NOT passed because the two database migration confirmations expired. The production app is unchanged. Checkout is also pending provider configuration; it is not implemented by this PR.
