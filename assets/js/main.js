document.addEventListener('DOMContentLoaded', () => {
  // Check if running locally
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '';

  // Turnstile callback functions
  window.onMainPageTurnstileSuccess = function (token) {
    console.log('Main Page Turnstile verification successful');
    unlockContent('main-turnstile-protection', 'main-content');
  };

  window.onImpressumTurnstileSuccess = function (token) {
    console.log('Impressum Turnstile verification successful');
    unlockContent('impressum-turnstile-protection', 'impressum-content');
  };

  window.onAI4MBSETurnstileSuccess = function (token) {
    console.log('AI4MBSE Turnstile verification successful');
    unlockContent('ai4mbse-turnstile-protection', 'ai4mbse-content');
  };

  window.onDatenschutzTurnstileSuccess = function (token) {
    console.log('Datenschutz Turnstile verification successful');
    unlockContent('datenschutz-turnstile-protection', 'datenschutz-content');
  };

  window.onProjectsTurnstileSuccess = function (token) {
    console.log('Projects Turnstile verification successful');
    unlockContent('projects-turnstile-protection', 'projects-content');
  };

  window.onAboutTurnstileSuccess = function (token) {
    console.log('About Turnstile verification successful');
    unlockContent('about-turnstile-protection', 'about-content');
  };

  window.onCloudMigrationTurnstileSuccess = function (token) {
    console.log('Cloud Migration Turnstile verification successful');
    unlockContent('cloud-migration-turnstile-protection', 'cloud-migration-content');
  };

  window.onDevOpsAutomationTurnstileSuccess = function (token) {
    console.log('DevOps Automation Turnstile verification successful');
    unlockContent('devops-automation-turnstile-protection', 'devops-automation-content');
  };

  // Helper to unlock content
  function unlockContent(protectionId, contentId) {
    const protectionDiv = document.getElementById(protectionId);
    const contentDiv = document.getElementById(contentId);
    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      // Strict Mode: We do NOT save to sessionStorage anymore!
      // Every reload requires re-verification.
    }
  }

  // Error handlers
  window.onMainPageTurnstileError = e => console.error('Turnstile Error:', e);
  window.onImpressumTurnstileError = e => console.error('Turnstile Error:', e);
  window.onAI4MBSETurnstileError = e => console.error('Turnstile Error:', e);
  window.onDatenschutzTurnstileError = e => console.error('Turnstile Error:', e);
  window.onProjectsTurnstileError = e => console.error('Turnstile Error:', e);
  window.onAboutTurnstileError = e => console.error('Turnstile Error:', e);
  window.onCloudMigrationTurnstileError = e => console.error('Turnstile Error:', e);
  window.onDevOpsAutomationTurnstileError = e => console.error('Turnstile Error:', e);

  // Initial Check
  function initProtection() {
    const pages = [
      { content: 'main-content', protection: 'main-turnstile-protection' },
      { content: 'impressum-content', protection: 'impressum-turnstile-protection' },
      { content: 'ai4mbse-content', protection: 'ai4mbse-turnstile-protection' },
      { content: 'datenschutz-content', protection: 'datenschutz-turnstile-protection' },
      { content: 'projects-content', protection: 'projects-turnstile-protection' },
      { content: 'about-content', protection: 'about-turnstile-protection' },
      {
        content: 'cloud-migration-content',
        protection: 'cloud-migration-turnstile-protection',
      },
      {
        content: 'devops-automation-content',
        protection: 'devops-automation-turnstile-protection',
      },
    ];

    pages.forEach(page => {
      const contentDiv = document.getElementById(page.content);
      const protectionDiv = document.getElementById(page.protection);

      if (contentDiv && protectionDiv) {
        // ONLY bypass if on Localhost
        if (isLocalhost) {
          console.log(`🔓 Localhost detected - bypassing Turnstile for ${page.content}`);
          protectionDiv.style.display = 'none';
          contentDiv.style.display = 'block';
        } else {
          // On Live Site: ALWAYS show protection first
          // Turnstile widget will auto-execute and call success callback if human
          console.log(`🛡️ Live Site detected - enforcing Turnstile for ${page.content}`);
          protectionDiv.style.display = 'block';
          contentDiv.style.display = 'none';
        }
      }
    });
  }

  initProtection();

  if (isLocalhost) {
    console.log('🏠 Running on localhost - Strict Mode disabled');
  } else {
    console.log('🔒 Running on Live Site - Strict Mode enabled (Every page check)');
  }
});
