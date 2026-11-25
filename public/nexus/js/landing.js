(()=>{
/*  REVEAL  */
const rvObs = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
    }), {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    }
);
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* PRICING PERIOD: display and navigation use the same selected interval. */
let billingInterval = 'month';
const priceFormat = new Intl.NumberFormat('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
function selectBilling(interval) {
    billingInterval = interval;
    const yearly = interval === 'year';
    document.querySelectorAll('[data-billing]').forEach(button => {
        const active = button.dataset.billing === interval;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('#pricing .pcard').forEach(card => {
        const price = card.querySelector('.pv');
        price.textContent = priceFormat.format(Number(yearly ? price.dataset.yCents : price.dataset.mCents) / 100);
        card.querySelector('.pper').textContent = yearly ? '/ year' : '/ month';
        card.querySelector('.cma-old-price').hidden = !yearly;
        card.querySelector('.cma-annual-detail').hidden = !yearly;
    });
}
document.querySelectorAll('[data-billing]').forEach(button => button.addEventListener('click', () => selectBilling(button.dataset.billing)));
document.querySelectorAll('[data-subscribe-plan]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    const url = new URL('/admin/login', window.location.origin);
    url.searchParams.set('mode', 'signup');
    url.searchParams.set('plan', button.dataset.subscribePlan);
    url.searchParams.set('interval', billingInterval);
    window.location.assign(url.href);
}));
// Inline fallback handlers are removed only after the working listeners are installed.
document.querySelectorAll('[data-subscribe-plan]').forEach(button => button.removeAttribute('onclick'));
selectBilling('month');
})();
