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

/*  PRICING TOGGLE  */
document.getElementById('ptog').addEventListener('change', function() {
    const y = this.checked;
    document.getElementById('ptogThumb').style.transform = y ? 'translateX(24px)' : 'translateX(0)';
    document.querySelectorAll('.pv').forEach(el => el.textContent = y ? el.dataset.y : el.dataset.m);
    document.querySelectorAll('.pper').forEach((el, i) => {
        if (i < 2) el.textContent = y ? 'per month, billed yearly' : 'per month, billed monthly';
    });
});


})();