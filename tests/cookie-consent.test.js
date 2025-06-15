/**
 * Unit Tests für Cookie Consent System
 * Test mit: npm test
 */

// Mock DOM-Umgebung
const { JSDOM } = require('jsdom');

describe('Cookie Consent System', () => {
    let dom;
    let window;
    let document;
    let localStorage;

    beforeEach(() => {
        // Setup DOM-Umgebung
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="cookie-banner" style="display: none;"></div>
                <div id="cookie-modal" style="display: none;"></div>
                <button id="cookie-accept-all"></button>
                <button id="cookie-essential-only"></button>
                <button id="cookie-settings"></button>
                <input type="checkbox" id="analytics-cookies">
            </body>
            </html>
        `, {
            url: 'https://kingsepp.github.io',
            pretendToBeVisual: true,
            resources: 'usable'
        });

        window = dom.window;
        document = window.document;
        
        // Mock localStorage
        localStorage = {
            storage: {},
            getItem: jest.fn((key) => localStorage.storage[key] || null),
            setItem: jest.fn((key, value) => { localStorage.storage[key] = value; }),
            removeItem: jest.fn((key) => { delete localStorage.storage[key]; }),
            clear: jest.fn(() => { localStorage.storage = {}; })
        };

        // Globale Variablen setzen
        global.window = window;
        global.document = document;
        global.localStorage = localStorage;

        // Cookie Consent Klasse laden (vereinfachte Version für Tests)
        const CookieConsent = require('../assets/js/cookie-consent-test.js');
        global.CookieConsent = CookieConsent;
    });

    afterEach(() => {
        dom.window.close();
        jest.clearAllMocks();
    });

    describe('Initialisierung', () => {
        test('sollte Cookie-Banner anzeigen wenn keine Einwilligung vorhanden', () => {
            localStorage.getItem.mockReturnValue(null);
            
            const cookieConsent = new global.CookieConsent();
            
            expect(localStorage.getItem).toHaveBeenCalledWith('cookie-consent');
            // Banner sollte angezeigt werden (DOM-Test)
        });

        test('sollte Services laden wenn Einwilligung vorhanden', () => {
            const consent = JSON.stringify({
                analytics: true,
                essential: true,
                timestamp: Date.now()
            });
            localStorage.getItem.mockReturnValue(consent);
            
            const cookieConsent = new global.CookieConsent();
            
            expect(localStorage.getItem).toHaveBeenCalledWith('cookie-consent');
        });
    });

    describe('Einwilligung setzen', () => {
        test('sollte Einwilligung korrekt speichern', () => {
            const cookieConsent = new global.CookieConsent();
            const consent = { analytics: true, essential: true };
            
            cookieConsent.setConsent(consent);
            
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'cookie-consent',
                expect.stringContaining('"analytics":true')
            );
        });

        test('sollte Zeitstempel und Version hinzufügen', () => {
            const cookieConsent = new global.CookieConsent();
            const consent = { analytics: false, essential: true };
            
            cookieConsent.setConsent(consent);
            
            const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
            expect(savedData).toHaveProperty('timestamp');
            expect(savedData).toHaveProperty('version');
            expect(savedData.analytics).toBe(false);
            expect(savedData.essential).toBe(true);
        });
    });

    describe('Einwilligung abrufen', () => {
        test('sollte null zurückgeben wenn keine Einwilligung vorhanden', () => {
            localStorage.getItem.mockReturnValue(null);
            
            const cookieConsent = new global.CookieConsent();
            const result = cookieConsent.getConsent();
            
            expect(result).toBeNull();
        });

        test('sollte gespeicherte Einwilligung parsen', () => {
            const consentData = {
                analytics: true,
                essential: true,
                timestamp: 1234567890,
                version: '1.0'
            };
            localStorage.getItem.mockReturnValue(JSON.stringify(consentData));
            
            const cookieConsent = new global.CookieConsent();
            const result = cookieConsent.getConsent();
            
            expect(result).toEqual(consentData);
        });
    });

    describe('Google Analytics Steuerung', () => {
        test('sollte Google Analytics laden wenn Einwilligung erteilt', () => {
            const cookieConsent = new global.CookieConsent();
            
            // Mock document.head.appendChild
            const mockAppendChild = jest.fn();
            document.head.appendChild = mockAppendChild;
            
            cookieConsent.loadGoogleAnalytics();
            
            expect(mockAppendChild).toHaveBeenCalledTimes(2); // 2 Scripts
            expect(cookieConsent.analyticsLoaded).toBe(true);
        });

        test('sollte Google Analytics nicht doppelt laden', () => {
            const cookieConsent = new global.CookieConsent();
            cookieConsent.analyticsLoaded = true;
            
            const mockAppendChild = jest.fn();
            document.head.appendChild = mockAppendChild;
            
            cookieConsent.loadGoogleAnalytics();
            
            expect(mockAppendChild).not.toHaveBeenCalled();
        });
    });

    describe('Cookie-Management', () => {
        test('sollte GA-Cookies löschen können', () => {
            // Mock document.cookie
            const cookies = '_ga=value1; _gid=value2; other=value3';
            Object.defineProperty(document, 'cookie', {
                get: () => cookies,
                set: jest.fn(),
                configurable: true
            });

            const cookieConsent = new global.CookieConsent();
            cookieConsent.deleteGoogleAnalyticsCookies();

            // Sollte Löschbefehle für GA-Cookies setzen
            expect(document.cookie.set).toHaveBeenCalled();
        });
    });

    describe('UI-Interaktionen', () => {
        test('sollte Banner ausblenden nach Einwilligung', () => {
            const cookieConsent = new global.CookieConsent();
            const banner = document.getElementById('cookie-banner');
            
            cookieConsent.hideBanner();
            
            // Prüfe ob Banner ausgeblendet wird
            expect(banner.style.opacity).toBe('0');
        });

        test('sollte Modal anzeigen können', () => {
            localStorage.getItem.mockReturnValue(JSON.stringify({
                analytics: false,
                essential: true
            }));
            
            const cookieConsent = new global.CookieConsent();
            const modal = document.getElementById('cookie-modal');
            const checkbox = document.getElementById('analytics-cookies');
            
            cookieConsent.showModal();
            
            expect(modal.style.display).toBe('flex');
            expect(checkbox.checked).toBe(false);
        });
    });

    describe('Einwilligung widerrufen', () => {
        test('sollte alle Daten löschen', () => {
            const cookieConsent = new global.CookieConsent();
            
            cookieConsent.revokeConsent();
            
            expect(localStorage.removeItem).toHaveBeenCalledWith('cookie-consent');
        });
    });
});

// Integrationstests
describe('Cookie Consent Integration', () => {
    test('sollte vollständigen Workflow durchlaufen', () => {
        // 1. Initialisierung ohne Einwilligung
        localStorage.getItem.mockReturnValue(null);
        const cookieConsent = new global.CookieConsent();
        
        // 2. Alle Cookies akzeptieren
        const consent = { analytics: true, essential: true };
        cookieConsent.setConsent(consent);
        
        // 3. Services laden
        cookieConsent.loadServices(consent);
        
        // 4. Einwilligung überprüfen
        const storedConsent = cookieConsent.getConsent();
        
        expect(storedConsent.analytics).toBe(true);
        expect(cookieConsent.analyticsLoaded).toBe(true);
    });
});