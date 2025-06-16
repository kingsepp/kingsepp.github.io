/**
 * End-to-End Tests für Cookie Consent
 * Testet echte Browser-Interaktionen
 */

const puppeteer = require('puppeteer');

describe('Cookie Consent E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Setze auf true für CI/CD
      slowMo: 100, // Verlangsamung für bessere Sichtbarkeit
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    // Console-Logs abfangen für Debugging
    page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log('PAGE LOG:', msg.text());
      }
    });

    // Navigation zur Website
    await page.goto('https://kingsepp.github.io', {
      waitUntil: 'networkidle2',
    });
  });

  afterEach(async () => {
    await page.close();
  });

  test('Cookie-Banner erscheint beim ersten Besuch', async () => {
    // Warte auf Cookie-Banner
    await page.waitForSelector('#cookie-banner', { visible: true });

    const bannerVisible = await page.isVisible('#cookie-banner');
    expect(bannerVisible).toBe(true);

    // Prüfe Button-Texte
    const acceptText = await page.textContent('#cookie-accept-all');
    const declineText = await page.textContent('#cookie-essential-only');
    const settingsText = await page.textContent('#cookie-settings');

    expect(acceptText).toContain('Alle akzeptieren');
    expect(declineText).toContain('Nur notwendige');
    expect(settingsText).toContain('Einstellungen');
  });

  test('Alle Cookies akzeptieren lädt Google Analytics', async () => {
    // Warte auf Banner und klicke "Alle akzeptieren"
    await page.waitForSelector('#cookie-accept-all');
    await page.click('#cookie-accept-all');

    // Banner sollte verschwinden
    await page.waitForFunction(
      () => document.getElementById('cookie-banner').style.display === 'none'
    );

    // Warte kurz auf GA-Loading
    await page.waitForTimeout(2000);

    // Prüfe ob Google Analytics Script geladen wurde
    const gaScript = await page.$('script[src*="googletagmanager"]');
    expect(gaScript).toBeTruthy();

    // Prüfe localStorage
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    const consentData = JSON.parse(consent);
    expect(consentData.analytics).toBe(true);
    expect(consentData.essential).toBe(true);
  });

  test('Nur notwendige Cookies lädt kein Google Analytics', async () => {
    // Klicke "Nur notwendige"
    await page.waitForSelector('#cookie-essential-only');
    await page.click('#cookie-essential-only');

    // Banner sollte verschwinden
    await page.waitForFunction(
      () => document.getElementById('cookie-banner').style.display === 'none'
    );

    // Warte kurz
    await page.waitForTimeout(1000);

    // Prüfe dass kein GA-Script geladen wurde
    const gaScript = await page.$('script[src*="googletagmanager"]');
    expect(gaScript).toBeFalsy();

    // Prüfe localStorage
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    const consentData = JSON.parse(consent);
    expect(consentData.analytics).toBe(false);
    expect(consentData.essential).toBe(true);
  });

  test('Cookie-Einstellungen Modal funktioniert', async () => {
    // Klicke "Einstellungen"
    await page.waitForSelector('#cookie-settings');
    await page.click('#cookie-settings');

    // Modal sollte erscheinen
    await page.waitForSelector('#cookie-modal', { visible: true });

    const modalVisible = await page.isVisible('#cookie-modal');
    expect(modalVisible).toBe(true);

    // Prüfe Toggle-Switches
    const essentialCheckbox = await page.$('#essential-cookies');
    const analyticsCheckbox = await page.$('#analytics-cookies');

    expect(essentialCheckbox).toBeTruthy();
    expect(analyticsCheckbox).toBeTruthy();

    // Essential sollte checked und disabled sein
    const essentialChecked = await page.$eval('#essential-cookies', el => el.checked);
    const essentialDisabled = await page.$eval('#essential-cookies', el => el.disabled);

    expect(essentialChecked).toBe(true);
    expect(essentialDisabled).toBe(true);
  });

  test('Cookie-Einstellungen speichern funktioniert', async () => {
    // Öffne Settings
    await page.click('#cookie-settings');
    await page.waitForSelector('#cookie-modal', { visible: true });

    // Analytics aktivieren
    await page.click('#analytics-cookies');

    // Einstellungen speichern
    await page.click('#cookie-save-settings');

    // Modal sollte schließen
    await page.waitForFunction(
      () => document.getElementById('cookie-modal').style.display === 'none'
    );

    // Prüfe localStorage
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    const consentData = JSON.parse(consent);
    expect(consentData.analytics).toBe(true);
  });

  test('Cookies bleiben nach Seitenneuladung bestehen', async () => {
    // Akzeptiere alle Cookies
    await page.click('#cookie-accept-all');
    await page.waitForTimeout(500);

    // Seite neu laden
    await page.reload({ waitUntil: 'networkidle2' });

    // Banner sollte NICHT mehr erscheinen
    await page.waitForTimeout(1000);

    const bannerVisible = await page.evaluate(() => {
      const banner = document.getElementById('cookie-banner');
      return banner && banner.style.display !== 'none';
    });

    expect(bannerVisible).toBe(false);

    // Consent sollte noch vorhanden sein
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    expect(consent).toBeTruthy();
  });

  test('GA-Cookies werden gesetzt nach Einwilligung', async () => {
    // Akzeptiere alle Cookies
    await page.click('#cookie-accept-all');
    await page.waitForTimeout(3000); // Warte auf GA-Initialisierung

    // Prüfe GA-Cookies
    const cookies = await page.cookies();
    const gaCookies = cookies.filter(cookie => cookie.name.startsWith('_ga'));

    expect(gaCookies.length).toBeGreaterThan(0);
  });

  test('GA-Cookies werden gelöscht nach Ablehnung', async () => {
    // Erst akzeptieren (um Cookies zu setzen)
    await page.click('#cookie-accept-all');
    await page.waitForTimeout(2000);

    // Dann Seite neu laden und ablehnen
    await page.reload({ waitUntil: 'networkidle2' });

    // LocalStorage löschen um Banner zu erzwingen
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle2' });

    // Nur notwendige wählen
    await page.click('#cookie-essential-only');
    await page.waitForTimeout(1000);

    // GA-Cookies sollten gelöscht sein
    const cookies = await page.cookies();
    const gaCookies = cookies.filter(cookie => cookie.name.startsWith('_ga'));

    expect(gaCookies.length).toBe(0);
  });
});

// Utility-Test für Entwickler
describe('Cookie Consent Developer Tools', () => {
  test('Console-Befehle für manuelles Testen', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://kingsepp.github.io');

    // Entwickler-Hilfsfunktionen testen
    const testCommands = `
            // Diese Befehle können in der Browser-Console ausgeführt werden:
            
            // 1. Cookie-Status prüfen
            console.log('Cookie Consent:', localStorage.getItem('cookie-consent'));
            
            // 2. Einwilligung widerrufen
            // window.revokeCookieConsent();
            
            // 3. Manuell Analytics aktivieren
            // window.updateCookieConsent({analytics: true, essential: true});
            
            // 4. GA-Status prüfen
            console.log('GA Script:', !!document.querySelector('script[src*="googletagmanager"]'));
            console.log('GA Cookies:', document.cookie.split(';').filter(c => c.includes('_ga')));
            
            return 'Entwickler-Tools bereit!';
        `;

    const result = await page.evaluate(testCommands);
    console.log(result);

    await browser.close();
  });
});
