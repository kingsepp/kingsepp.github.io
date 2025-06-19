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

    // Navigation zur lokalen Testseite
    await page.goto('http://localhost:4000', {
      waitUntil: 'networkidle2',
    });
  });

  afterEach(async () => {
    await page.close();
  });

  test('Cookie-Banner erscheint beim ersten Besuch', async () => {
    // Lösche alle Cookies um sicherzustellen, dass Banner erscheint
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Warte auf Cookie-Banner
    await page.waitForSelector('#cookie-notice', { visible: true });

    const bannerVisible = await page.$('#cookie-notice');
    expect(bannerVisible).toBeTruthy();

    // Prüfe Button-Texte mit korrekten IDs
    const acceptText = await page.textContent('#cookie-notice-accept');
    const essentialText = await page.textContent('#cookie-notice-essential');
    const settingsText = await page.textContent('#cookie-settings-btn');

    expect(acceptText).toContain('Alle akzeptieren');
    expect(essentialText).toContain('Nur notwendige');
    expect(settingsText).toContain('Cookie-Einstellungen');
  });

  test('Alle Cookies akzeptieren lädt Google Analytics', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Warte auf Banner und klicke "Alle akzeptieren"
    await page.waitForSelector('#cookie-notice-accept');
    await page.click('#cookie-notice-accept');

    // Banner sollte verschwinden
    await page.waitForFunction(
      () => document.getElementById('cookie-notice').style.display === 'none'
    );

    // Warte kurz auf GA-Loading
    await page.waitForTimeout(3000);

    // Prüfe ob Google Analytics Script geladen wurde
    const gaScript = await page.$('script[src*="googletagmanager"]');
    expect(gaScript).toBeTruthy();

    // Prüfe Cookie statt localStorage (da das aktuelle System Cookies verwendet)
    const cookies = await page.cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');
    expect(consentCookie).toBeTruthy();
    expect(consentCookie.value).toBe('accept');
  });

  test('Nur notwendige Cookies lädt kein Google Analytics', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Klicke "Nur notwendige"
    await page.waitForSelector('#cookie-notice-essential');
    await page.click('#cookie-notice-essential');

    // Banner sollte verschwinden
    await page.waitForFunction(
      () => document.getElementById('cookie-notice').style.display === 'none'
    );

    // Warte kurz
    await page.waitForTimeout(2000);

    // Prüfe dass kein GA-Script geladen wurde
    const gaScript = await page.$('script[src*="googletagmanager"]');
    expect(gaScript).toBeFalsy();

    // Prüfe Cookie
    const cookies = await page.cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');
    expect(consentCookie).toBeTruthy();
    expect(consentCookie.value).toBe('essential');
  });

  test('Cookie-Einstellungen Modal funktioniert', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Klicke "Einstellungen"
    await page.waitForSelector('#cookie-settings-btn');
    await page.click('#cookie-settings-btn');

    // Modal sollte erscheinen
    await page.waitForSelector('#cookie-settings-modal', { visible: true });

    const modalVisible = await page.$('#cookie-settings-modal');
    expect(modalVisible).toBeTruthy();

    // Prüfe Analytics Checkbox (Essential ist fest aktiviert)
    const analyticsCheckbox = await page.$('#analytics-consent');
    expect(analyticsCheckbox).toBeTruthy();

    // Modal schließen testen
    await page.click('#close-settings');
    await page.waitForFunction(
      () => document.getElementById('cookie-settings-modal').style.display === 'none'
    );
  });

  test('Cookie-Einstellungen speichern funktioniert', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Öffne Settings
    await page.click('#cookie-settings-btn');
    await page.waitForSelector('#cookie-settings-modal', { visible: true });

    // Analytics aktivieren
    await page.click('#analytics-consent');

    // Einstellungen speichern
    await page.click('#save-settings');

    // Modal sollte schließen
    await page.waitForFunction(
      () => document.getElementById('cookie-settings-modal').style.display === 'none'
    );

    // Prüfe Cookie
    const cookies = await page.cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');
    expect(consentCookie).toBeTruthy();
    expect(consentCookie.value).toBe('accept');
  });

  test('Cookies bleiben nach Seitenneuladung bestehen', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Akzeptiere alle Cookies
    await page.waitForSelector('#cookie-notice-accept');
    await page.click('#cookie-notice-accept');
    await page.waitForTimeout(1000);

    // Seite neu laden
    await page.reload({ waitUntil: 'networkidle2' });

    // Banner sollte NICHT mehr erscheinen
    await page.waitForTimeout(2000);

    const bannerVisible = await page.evaluate(() => {
      const banner = document.getElementById('cookie-notice');
      return banner && banner.style.display !== 'none';
    });

    expect(bannerVisible).toBe(false);

    // Cookie sollte noch vorhanden sein
    const cookies = await page.cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');
    expect(consentCookie).toBeTruthy();
  });

  test('GA-Cookies werden gesetzt nach Einwilligung', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Akzeptiere alle Cookies
    await page.waitForSelector('#cookie-notice-accept');
    await page.click('#cookie-notice-accept');
    await page.waitForTimeout(4000); // Warte auf GA-Initialisierung

    // Prüfe GA-Cookies
    const cookies = await page.cookies();
    const gaCookies = cookies.filter(cookie => cookie.name.startsWith('_ga'));

    expect(gaCookies.length).toBeGreaterThan(0);
  });

  test('GA-Cookies werden gelöscht nach Widerruf', async () => {
    // Lösche Cookies und reload
    await page.deleteCookie(...(await page.cookies()));
    await page.reload({ waitUntil: 'networkidle2' });

    // Erst akzeptieren (um Cookies zu setzen)
    await page.waitForSelector('#cookie-notice-accept');
    await page.click('#cookie-notice-accept');
    await page.waitForTimeout(3000);

    // Widerruf über Widerrufs-Button
    await page.waitForSelector('#revoke-consent');
    await page.click('#revoke-consent');
    await page.waitForTimeout(1000);

    // Nur notwendige wählen
    await page.waitForSelector('#cookie-notice-essential');
    await page.click('#cookie-notice-essential');
    await page.waitForTimeout(2000);

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

    await page.goto('http://localhost:4000');

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
