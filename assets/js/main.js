// main.js — Email-Deobfuscation (Anti-Spam-Crawler)
// Echte Adresse wird zur Laufzeit aus Teilen zusammengebaut; rohes HTML
// enthaelt nur "info [at] kingsepp [punkt] dev" — keine harvestbare Email.
document.addEventListener('DOMContentLoaded', function () {
  const nodes = document.querySelectorAll('[data-email]');
  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i];
    const user = el.getAttribute('data-user');
    const domain = el.getAttribute('data-domain');
    const tld = el.getAttribute('data-tld');
    if (!user || !domain || !tld) {
      continue;
    }
    const addr = user + '@' + domain + '.' + tld;
    if (el.tagName === 'A') {
      el.setAttribute('href', 'mailto:' + addr);
    }
    if (el.hasAttribute('data-fill-text')) {
      el.textContent = addr;
    }
  }
});
