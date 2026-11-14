# CleanMa landing composition

Run `npm ci`, `npm run dev`, `npm run build`, and `npm run check` with Node 24+.

The supplied Automark is Astro 7 + React + Tailwind, with GSAP/Lenis animations. NexusAI is HTML/Bootstrap, with CSS animations and IntersectionObserver. Their original animation engines have been retained, not rewritten into Framer Motion.

Home: original Automark hero (including video), then NexusAI Pain, Features, Integrations, Pricing, Testimonials, FAQ, CTA and Footer. Original section markup lives in src/layouts/nexus/*.html and is imported by corresponding Astro components. CSS is isolated with native @scope, requiring modern browsers. Assets and original JS are copied to public/nexus; landing.js extracts the original reveal and pricing handlers; Bootstrap handles FAQ collapse. CTA signup buttons lead to the existing CleanMa owner login, avoiding the template's fake authentication. The landing uses the supplied Portuguese CleanMa copy, official Starter/Growth/Scale monthly prices (£89.99/£179.99/£299.99), and existing owner-login destination for trial CTAs. The annual toggle retains its original animation and shows the same monthly rate without an invented discount. No annual billing backend was added. Template AI integrations and fictional endorsements are replaced with CleanMa product modules and role-based usage descriptions; these cards are not customer testimonials. Footer links point to the landing sections; its existing email field does not subscribe or pass data, and its button opens the owner login.

Original reference is retained in referencia-nexusai. Main Automark footer is disabled only on home. Hero, VideoShowcase and original animation scripts are unchanged. CDN-hosted GSAP/Lenis and Google fonts still require network as in the original template.

Dependency resolution uses legacy-peer-deps for the supplied Astro integration peer ranges; package-lock.json records the installed versions. Stripe API version literals were aligned to the installed SDK type to resolve existing template TypeScript errors. No payment credentials or backend setup were added.

Validation: npm run build passed; npm run check returned 0 errors, 0 warnings and 7 existing hints. Source comparison confirms the Hero/video markup, GSAP/Lenis scripts, animation styles and Nexus reveal/aurora wrappers are unchanged. Automated browser launch was blocked by the environment, so visual/mobile verification remains pending.


## CleanMa light theme and domain routing

The corporate white/blue skin is in `src/styles/cleanma.css`; Tailwind tokens are in `src/config/theme.json`. Existing reveal, hover, GSAP/Lenis, Bootstrap collapse and video behaviours remain in their original files. Particles retain their original motion and now use blue for contrast on white. Header/footer use the CleanMa check/sparkle SVG mark. Template credits are absent from the rendered footer; upstream license files remain in the repository.

The `cleanma-landing` Vercel project hosts the landing independently. On the `cleanmaapp` Vercel project, project-level routing rewrites only `/` and the landing's asset prefixes (`/_astro/`, `/nexus/`, `/images/`, `/scripts/`, `/showcase.mp4`) to `https://cleanma-landing.vercel.app`. The app's `/admin`, `/admin/login`, `/assets` and other routes retain their original deployment. These project routes are managed in Vercel CDN Routing and do not require a rebuild of the app. Do not move the custom domain to the landing project.
