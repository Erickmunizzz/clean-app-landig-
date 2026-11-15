# Institutional pages, migration and cookie preferences

The CleanMa landing exposes /about, /terms, /privacy and /migration. Institutional pages reuse the same header, footer, logo, white/blue palette and existing scroll reveal observer. Footer columns are Support, Company and CleanMa. Newsletter opt-in remains below the logo.

Terms and privacy text was supplied by the site owner, with the requested Last Updated date of November 10, 2026. The malformed privacy contact was corrected to support@cleanmaapp.com. Publishing these pages does not implement billing, cancellation, export or third-party accounting capabilities mentioned in the copy, and is not a legal compliance review.

The migration CTA goes to /migration. The request form opens an encoded email draft to support@cleanmaapp.com; it does not silently upload spreadsheets or send an email. Users can also use the direct mailto fallback.

Cookie preferences use localStorage key cleanma:cookie-consent:v1. The banner offers Accept All and Manage Settings. A native modal supports essential (always on), analytics and marketing categories, Save Preferences and Reject Optional. Footer Cookie settings allows changes. Preference changes emit cleanma:cookie-consent. No optional analytics or marketing tracking is configured on this landing; Google Tag Manager remains disabled in config.json. The preference UI does not constitute a blanket GDPR certification.

Domain routing: the main cleanmaapp Vercel project retains its root and asset rewrites. An additional project-level rewrite matches only ^/(about|terms|privacy|migration)/?$ and proxies to https://cleanma-landing.vercel.app/$1. No admin, login, API or client-portal route is included. Stage and promote this route only after the landing deployment containing the pages is READY.

Portal audit: the existing production read_client_portal(uuid) function returns only the linked customer's job titles, scheduled dates and statuses; requires an unexpired, unrevoked token; and filters company_id/client_id. Invalid-token rejection was verified in the database. Current app code generates a seven-day bearer link in Client Portal for the owner to share manually. No automatic email/SMS distribution or customer rating submission was found in this flow. These capabilities were inspected, not modified.
