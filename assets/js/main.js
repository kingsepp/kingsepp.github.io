// main.js — Cloudflare Turnstile gate for the Impressum page only.
// All other pages were intentionally freed from Turnstile (SEO/GEO).
document.addEventListener('DOMContentLoaded', () => {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '';

  // Helper to unlock content once verified.
  function unlockContent(protectionId, contentId) {
    const protectionDiv = document.getElementById(protectionId);
    const contentDiv = document.getElementById(contentId);
    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      // Strict Mode: nothing saved to sessionStorage — every reload re-verifies.
    }
  }

  // Turnstile callbacks (referenced by data-callback in impressum.md).
  window.onImpressumTurnstileSuccess = function () {
    console.log('Impressum Turnstile verification successful');
    unlockContent('impressum-turnstile-protection', 'impressum-content');
  };
  window.onImpressumTurnstileError = e => console.error('Turnstile Error:', e);

  // Initial gate: only the Impressum page has these elements.
  const protectionDiv = document.getElementById('impressum-turnstile-protection');
  const contentDiv = document.getElementById('impressum-content');
  if (protectionDiv && contentDiv) {
    if (isLocalhost) {
      // Bypass on localhost so the page is testable without a live Turnstile.
      console.log('🔓 Localhost detected - bypassing Turnstile for Impressum');
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
    } else {
      // Live site: show the gate; the widget auto-executes and calls the success callback.
      console.log('🛡️ Live Site detected - enforcing Turnstile for Impressum');
      protectionDiv.style.display = 'block';
      contentDiv.style.display = 'none';
    }
  }
});
