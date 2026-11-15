(() => {
  const form = document.getElementById('cma-migration-request');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = 'CleanMa data migration request';
    const body = `Business: ${String(data.get('business')).trim()}\nFile format: ${data.get('format')}\n\nImport request:\n${String(data.get('notes') || '').trim()}`;
    window.location.href = `mailto:support@cleanmaapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
