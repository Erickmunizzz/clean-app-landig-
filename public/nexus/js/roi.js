/* CleanMa illustrative savings model. Local calculation; no data is sent. */
(() => {
  const fields = ['cma-team', 'cma-minutes', 'cma-hourly', 'cma-plan'].map(id => document.getElementById(id));
  if (fields.some(field => !field)) return;
  const hours = document.getElementById('cma-hours');
  const monthly = document.getElementById('cma-monthly');
  const net = document.getElementById('cma-net');
  const error = document.getElementById('cma-roi-error');
  const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
  const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  function update() {
    const valid = fields.every(field => field.value.trim() !== '' && Number.isFinite(Number(field.value)) && field.checkValidity());
    error.hidden = valid;
    fields.forEach(field => field.setAttribute('aria-invalid', String(!field.checkValidity() || field.value.trim() === '')));
    if (!valid) {
      hours.textContent = '—'; monthly.textContent = '—'; net.textContent = '—';
      return;
    }
    const [team, minutes, hourly, plan] = fields.map(field => Number(field.value));
    const weeklyHours = team * minutes / 60;
    const monthlyValue = weeklyHours * 52 / 12 * hourly;
    hours.textContent = `${number.format(weeklyHours)} h`;
    monthly.textContent = money.format(monthlyValue);
    net.textContent = money.format(monthlyValue - plan);
  }
  fields.forEach(field => field.addEventListener('input', update));
  fields.forEach(field => field.addEventListener('change', update));
  update();
})();
