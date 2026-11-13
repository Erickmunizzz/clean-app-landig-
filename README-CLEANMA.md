# CleanMa landing composition

Run `npm ci`, `npm run dev`, `npm run build`, and `npm run check` with Node 24+.

The supplied Automark is Astro 7 + React + Tailwind, with GSAP/Lenis animations. NexusAI is HTML/Bootstrap, with CSS animations and IntersectionObserver. Their original animation engines have been retained, not rewritten into Framer Motion.

Home: original Automark hero (including video), then NexusAI Pain, Features, Integrations, Pricing, Testimonials, FAQ, CTA and Footer. Original section markup lives in src/layouts/nexus/*.html and is imported by corresponding Astro components. CSS is isolated with native @scope, requiring modern browsers. Assets and original JS are copied to public/nexus; landing.js extracts the original reveal and pricing handlers; Bootstrap handles FAQ collapse. CTA signup buttons lead to the existing CleanMa owner login, avoiding the template's fake authentication. Other template copy, prices, testimonials, placeholder links and newsletter remain original and require business content/integration before public launch.

Original reference is retained in referencia-nexusai. Main Automark footer is disabled only on home. Hero, VideoShowcase and original animation scripts are unchanged. CDN-hosted GSAP/Lenis and Google fonts still require network as in the original template.

Dependency resolution uses legacy-peer-deps for the supplied Astro integration peer ranges; package-lock.json records the installed versions. Stripe API version literals were aligned to the installed SDK type to resolve existing template TypeScript errors. No payment credentials or backend setup were added.

Validation: npm run build and npm run check. No claim of pixel-perfect browser verification.
