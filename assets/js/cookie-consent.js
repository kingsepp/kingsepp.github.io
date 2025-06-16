/**
 * DSGVO-konformes Cookie Consent Management
 * Verwaltet Google Analytics und andere Cookies nach Nutzereinwilligung
 */

class CookieConsent {
  constructor() {
    this.cookieName = 'cookie-consent';
    this.analyticsLoaded = false;
    this.init();
  }

  init() {
    // Prüfe bestehende Einwilligung
    const consent = this.getConsent();

    if (consent === null) {
      // Zeige Banner wenn keine Einwilligung vorhanden
      this.showBanner();
    } else {
      // Lade Services basierend auf Einwilligung
      this.loadServices(consent);
    }

    this.bindEvents();
  }

  bindEvents() {
    // Banner Buttons
    document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
      this.setConsent({ analytics: true, essential: true });
      this.hideBanner();
      this.loadServices({ analytics: true, essential: true });
    });

    document.getElementById('cookie-essential-only')?.addEventListener('click', () => {
      this.setConsent({ analytics: false, essential: true });
      this.hideBanner();
      this.loadServices({ analytics: false, essential: true });
    });

    document.getElementById('cookie-settings')?.addEventListener('click', () => {
      this.showModal();
    });

    // Modal Buttons
    document.getElementById('cookie-modal-close')?.addEventListener('click', () => {
      this.hideModal();
    });

    document.getElementById('cookie-save-settings')?.addEventListener('click', () => {
      this.saveModalSettings();
    });

    // Modal Background Click
    document.getElementById('cookie-modal')?.addEventListener('click', e => {
      if (e.target.id === 'cookie-modal') {
        this.hideModal();
      }
    });
  }

  showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
      // Smooth animation
      setTimeout(() => {
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);
    }
  }

  showModal() {
    const modal = document.getElementById('cookie-modal');
    const consent = this.getConsent() || { analytics: false, essential: true };

    // Set current settings
    document.getElementById('analytics-cookies').checked = consent.analytics;

    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 100);
    }
  }

  hideModal() {
    const modal = document.getElementById('cookie-modal');
    if (modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  }

  saveModalSettings() {
    const analyticsConsent = document.getElementById('analytics-cookies').checked;

    const consent = {
      analytics: analyticsConsent,
      essential: true,
    };

    this.setConsent(consent);
    this.hideModal();
    this.hideBanner();

    // Reload services based on new settings
    this.loadServices(consent);

    // Show confirmation
    this.showNotification('Cookie-Einstellungen gespeichert!');
  }

  getConsent() {
    const cookie = localStorage.getItem(this.cookieName);
    return cookie ? JSON.parse(cookie) : null;
  }

  setConsent(consent) {
    const consentData = {
      ...consent,
      timestamp: Date.now(),
      version: '1.0',
    };
    localStorage.setItem(this.cookieName, JSON.stringify(consentData));
  }

  loadServices(consent) {
    if (consent.analytics && !this.analyticsLoaded) {
      this.loadGoogleAnalytics();
    } else if (!consent.analytics && this.analyticsLoaded) {
      this.disableGoogleAnalytics();
    }
  }

  loadGoogleAnalytics() {
    if (this.analyticsLoaded) {
      return;
    }

    // Google Analytics laden
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-6P6F8KLCQS';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6P6F8KLCQS', {
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false
            });
        `;
    document.head.appendChild(script2);

    this.analyticsLoaded = true;
    console.log('🍪 Google Analytics geladen');
  }

  disableGoogleAnalytics() {
    // GA deaktivieren
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // GA Cookies löschen
    this.deleteGoogleAnalyticsCookies();
    console.log('🍪 Google Analytics deaktiviert');
  }

  deleteGoogleAnalyticsCookies() {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      if (name.startsWith('_ga') || name.startsWith('_gid')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }

  showNotification(message) {
    // Einfache Notification
    const notification = document.createElement('div');
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(59, 130, 246, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10002;
            font-weight: 500;
            backdrop-filter: blur(10px);
        `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Public API für Cookie-Management
  updateConsent(settings) {
    this.setConsent(settings);
    this.loadServices(settings);
  }

  revokeConsent() {
    localStorage.removeItem(this.cookieName);
    this.disableGoogleAnalytics();
    this.showBanner();
  }
}

// Cookie Consent initialisieren
document.addEventListener('DOMContentLoaded', () => {
  window.cookieConsent = new CookieConsent();
});

// Global verfügbare Funktionen
window.updateCookieConsent = settings => {
  if (window.cookieConsent) {
    window.cookieConsent.updateConsent(settings);
  }
};

window.revokeCookieConsent = () => {
  if (window.cookieConsent) {
    window.cookieConsent.revokeConsent();
  }
};
