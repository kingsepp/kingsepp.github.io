document.addEventListener('DOMContentLoaded', () => {
  // Check if running locally and auto-bypass Turnstile
  const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' || 
                       window.location.hostname === '';

  // Turnstile callback functions for page-level protection
  window.onMainPageTurnstileSuccess = function (token) {
    console.log('Main Page Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('main-turnstile-protection');
    const contentDiv = document.getElementById('main-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('main-page-verified', 'true');
    }
  };

  window.onMainPageTurnstileError = function (error) {
    console.error('Main Page Turnstile verification failed:', error);
  };

  window.onImpressumTurnstileSuccess = function (token) {
    console.log('Impressum Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('impressum-turnstile-protection');
    const contentDiv = document.getElementById('impressum-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('impressum-verified', 'true');
    }
  };

  window.onImpressumTurnstileError = function (error) {
    console.error('Impressum Turnstile verification failed:', error);
  };

  window.onAI4MBSETurnstileSuccess = function (token) {
    console.log('AI4MBSE Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('ai4mbse-turnstile-protection');
    const contentDiv = document.getElementById('ai4mbse-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('ai4mbse-verified', 'true');
    }
  };

  window.onAI4MBSETurnstileError = function (error) {
    console.error('AI4MBSE Turnstile verification failed:', error);
  };

  window.onDatenschutzTurnstileSuccess = function (token) {
    console.log('Datenschutz Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('datenschutz-turnstile-protection');
    const contentDiv = document.getElementById('datenschutz-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('datenschutz-verified', 'true');
    }
  };

  window.onDatenschutzTurnstileError = function (error) {
    console.error('Datenschutz Turnstile verification failed:', error);
  };

  window.onProjectsTurnstileSuccess = function (token) {
    console.log('Projects Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('projects-turnstile-protection');
    const contentDiv = document.getElementById('projects-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('projects-verified', 'true');
    }
  };

  window.onProjectsTurnstileError = function (error) {
    console.error('Projects Turnstile verification failed:', error);
  };

  window.onAboutTurnstileSuccess = function (token) {
    console.log('About Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('about-turnstile-protection');
    const contentDiv = document.getElementById('about-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('about-verified', 'true');
    }
  };

  window.onAboutTurnstileError = function (error) {
    console.error('About Turnstile verification failed:', error);
  };

  window.onCloudMigrationTurnstileSuccess = function (token) {
    console.log('Cloud Migration Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('cloud-migration-turnstile-protection');
    const contentDiv = document.getElementById('cloud-migration-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('cloud-migration-verified', 'true');
    }
  };

  window.onCloudMigrationTurnstileError = function (error) {
    console.error('Cloud Migration Turnstile verification failed:', error);
  };

  window.onDevOpsAutomationTurnstileSuccess = function (token) {
    console.log('DevOps Automation Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('devops-automation-turnstile-protection');
    const contentDiv = document.getElementById('devops-automation-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      sessionStorage.setItem('devops-automation-verified', 'true');
    }
  };

  window.onDevOpsAutomationTurnstileError = function (error) {
    console.error('DevOps Automation Turnstile verification failed:', error);
  };

  // Check if user has already been verified in this session
  function checkExistingVerification() {
    const pages = [
      { content: 'main-content', protection: 'main-turnstile-protection', key: 'main-page-verified' },
      { content: 'impressum-content', protection: 'impressum-turnstile-protection', key: 'impressum-verified' },
      { content: 'ai4mbse-content', protection: 'ai4mbse-turnstile-protection', key: 'ai4mbse-verified' },
      { content: 'datenschutz-content', protection: 'datenschutz-turnstile-protection', key: 'datenschutz-verified' },
      { content: 'projects-content', protection: 'projects-turnstile-protection', key: 'projects-verified' },
      { content: 'about-content', protection: 'about-turnstile-protection', key: 'about-verified' },
      { content: 'cloud-migration-content', protection: 'cloud-migration-turnstile-protection', key: 'cloud-migration-verified' },
      { content: 'devops-automation-content', protection: 'devops-automation-turnstile-protection', key: 'devops-automation-verified' }
    ];

    pages.forEach(page => {
      const contentDiv = document.getElementById(page.content);
      const protectionDiv = document.getElementById(page.protection);

      if (contentDiv && protectionDiv) {
        // Auto-bypass on localhost
        if (isLocalhost) {
          console.log(`🔓 Localhost detected - auto-bypassing Turnstile for ${page.key}`);
          protectionDiv.style.display = 'none';
          contentDiv.style.display = 'block';
          sessionStorage.setItem(page.key, 'true');
        } 
        // Check session storage
        else if (sessionStorage.getItem(page.key) === 'true') {
          protectionDiv.style.display = 'none';
          contentDiv.style.display = 'block';
        }
      }
    });
  }

  // Call the verification check
  checkExistingVerification();

  // Show localhost indicator
  if (isLocalhost) {
    console.log('🏠 Running on localhost - Cloudflare Turnstile bypassed');
  }
});
