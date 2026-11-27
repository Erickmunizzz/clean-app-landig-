(() => {
  for (const contact of document.querySelectorAll('[data-support-contact]')) {
    const link = contact.querySelector('a');
    const copy = contact.querySelector('[data-copy-email]');
    const status = contact.querySelector('[data-copy-status]');
    copy.addEventListener('click', async () => {
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(link.textContent.trim());
        status.textContent = 'Email copied.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(link);
        selection?.removeAllRanges();
        selection?.addRange(range);
        let copied = false;
        try { copied = document.execCommand?.('copy') === true; } catch { /* Manual selection remains available. */ }
        status.textContent = copied ? 'Email copied.' : 'Select the address to copy it manually.';
      }
    });
  }

  const form = document.getElementById('cma-newsletter');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('cma-lead-status');
  const contact = document.getElementById('cma-newsletter-contact');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;

    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = '';
    delete status.dataset.state;
    contact.hidden = true;

    try {
      if (!form.getAttribute('action') || !form.dataset.publicKey) throw new Error();
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: form.dataset.publicKey },
        body: JSON.stringify({
          email: data.get('email'),
          consent: data.get('consent') === 'on',
          website: data.get('website') || '',
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result?.success !== true) throw new Error();

      form.reset();
      status.dataset.state = 'success';
      status.textContent = 'Thanks for subscribing to CleanMa tips and offers!';
    } catch {
      status.textContent = 'We couldn’t save your subscription. Email us if you’d like to join.';
      contact.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Subscribe';
    }
  });
})();
