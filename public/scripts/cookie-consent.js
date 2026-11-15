(() => {
  const key = 'cleanma:cookie-consent:v1';
  const banner = document.getElementById('cma-cookie-banner');
  const dialog = document.getElementById('cma-cookie-dialog');
  const form = document.getElementById('cma-cookie-form');
  if (!banner || !dialog || !form) return;
  const analytics = document.getElementById('cma-cookie-analytics');
  const marketing = document.getElementById('cma-cookie-marketing');
  const storageStatus = document.getElementById('cma-cookie-storage-status');
  let preference = null;
  try {
    const stored = JSON.parse(localStorage.getItem(key) || 'null');
    if (stored?.version === 1 && stored.essential === true && typeof stored.analytics === 'boolean' && typeof stored.marketing === 'boolean') preference = stored;
  } catch { /* Treat malformed or unavailable storage as no saved preference. */ }
  banner.hidden = preference !== null;
  function announce() {
    window.dispatchEvent(new CustomEvent('cleanma:cookie-consent', { detail: preference || {version: 1, essential: true, analytics: false, marketing: false} }));
  }
  function save(allowAnalytics, allowMarketing) {
    preference = {version: 1, essential: true, analytics: allowAnalytics, marketing: allowMarketing, updatedAt: new Date().toISOString()};
    try { localStorage.setItem(key, JSON.stringify(preference)); storageStatus.textContent = ''; }
    catch { storageStatus.textContent = 'Your browser could not save these preferences. They apply to this page only.'; }
    banner.hidden = true;
    if (dialog.open) dialog.close();
    announce();
  }
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
    analytics.checked = preference?.analytics === true;
    marketing.checked = preference?.marketing === true;
    storageStatus.textContent = '';
    if (!dialog.open) dialog.showModal();
  }));
  document.querySelectorAll('[data-cookie-accept]').forEach(button => button.addEventListener('click', () => save(true, true)));
  document.querySelectorAll('[data-cookie-reject]').forEach(button => button.addEventListener('click', () => save(false, false)));
  document.querySelector('[data-cookie-close]')?.addEventListener('click', () => dialog.close());
  form.addEventListener('submit', event => { event.preventDefault(); save(analytics.checked, marketing.checked); });
  announce();
})();
