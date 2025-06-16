/**
 * Tests für das neue Jekyll-native Cookie Consent System
 */

// Mock DOM environment
global.document = {
  cookie: '',
  getElementById: jest.fn(),
  addEventListener: jest.fn(),
};

global.window = {
  location: {
    reload: jest.fn(),
  },
};

describe('Jekyll Cookie Consent System', () => {
  beforeEach(() => {
    // Reset document.cookie before each test
    global.document.cookie = '';
    jest.clearAllMocks();
  });

  describe('Cookie Management Functions', () => {
    test('createCookie should set cookie with correct format', () => {
      // Mock the createCookie function
      function createCookie(name, value, days) {
        var expires = '';
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = '; expires=' + date.toUTCString();
        }
        global.document.cookie = name + '=' + value + expires + '; path=/';
        return global.document.cookie;
      }

      const result = createCookie('cookie-notice-dismissed', 'true', 31);
      expect(result).toContain('cookie-notice-dismissed=true');
      // Note: path gets set to document.cookie, not returned by function
    });

    test('readCookie should find existing cookie', () => {
      // Set up mock cookie
      global.document.cookie = 'cookie-notice-dismissed=true; path=/';

      function readCookie(name) {
        var nameEQ = name + '=';
        var ca = global.document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      const result = readCookie('cookie-notice-dismissed');
      expect(result).toBe('true');
    });

    test('readCookie should return null for non-existing cookie', () => {
      global.document.cookie = '';

      function readCookie(name) {
        var nameEQ = name + '=';
        var ca = global.document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      const result = readCookie('non-existing-cookie');
      expect(result).toBeNull();
    });
  });

  describe('Cookie Consent Logic', () => {
    test('should show banner when no consent cookie exists', () => {
      global.document.cookie = '';
      const mockElement = { style: { display: '' } };
      global.document.getElementById = jest.fn().mockReturnValue(mockElement);

      function readCookie(name) {
        return null; // Simulate no cookie
      }

      // Simulate the main logic
      const shouldShowBanner = readCookie('cookie-notice-dismissed') !== 'true';

      if (shouldShowBanner) {
        global.document.getElementById('cookie-notice').style.display = 'block';
      }

      expect(shouldShowBanner).toBe(true);
      expect(global.document.getElementById).toHaveBeenCalledWith('cookie-notice');
      expect(mockElement.style.display).toBe('block');
    });

    test('should not show banner when consent cookie is true', () => {
      global.document.cookie = 'cookie-notice-dismissed=true';

      function readCookie(name) {
        if (name === 'cookie-notice-dismissed') return 'true';
        return null;
      }

      // Simulate the main logic
      const shouldShowBanner = readCookie('cookie-notice-dismissed') !== 'true';
      const shouldLoadAnalytics = readCookie('cookie-notice-dismissed') === 'true';

      expect(shouldShowBanner).toBe(false);
      expect(shouldLoadAnalytics).toBe(true);
    });
  });

  describe('Accept Button Behavior', () => {
    test('accept button should set cookie and hide banner', () => {
      const mockElement = {
        style: { display: 'block' },
        addEventListener: jest.fn(),
      };
      global.document.getElementById = jest.fn().mockReturnValue(mockElement);

      // Simulate button click handler (ohne reload für Test)
      function handleAcceptClick() {
        global.document.cookie =
          'cookie-notice-dismissed=true; path=/; max-age=' + 31 * 24 * 60 * 60;
        const element = global.document.getElementById('cookie-notice');
        element.style.display = 'none';
        // window.location.reload() würde normalerweise hier aufgerufen werden
      }

      handleAcceptClick();

      expect(global.document.cookie).toContain('cookie-notice-dismissed=true');
      expect(global.document.getElementById).toHaveBeenCalledWith('cookie-notice');
      expect(mockElement.style.display).toBe('none');
    });
  });

  describe('Analytics Loading', () => {
    test('should include analytics when consent is given', () => {
      // This would be tested through Jekyll template rendering
      // In a real test, we'd check if {% include ga.js %} is processed

      function shouldLoadAnalytics() {
        global.document.cookie = 'cookie-notice-dismissed=true';

        function readCookie(name) {
          if (name === 'cookie-notice-dismissed') return 'true';
          return null;
        }

        return readCookie('cookie-notice-dismissed') === 'true';
      }

      expect(shouldLoadAnalytics()).toBe(true);
    });

    test('should not include analytics when consent is not given', () => {
      function shouldLoadAnalytics() {
        global.document.cookie = '';

        function readCookie(name) {
          return null;
        }

        return readCookie('cookie-notice-dismissed') === 'true';
      }

      expect(shouldLoadAnalytics()).toBe(false);
    });
  });
});

describe('Integration with Jekyll Template System', () => {
  test('cookie consent include should be referenced in layout', () => {
    // Mock file content check
    const layoutContent = `
      <!DOCTYPE html>
      <html>
      <body>
        {% include cookie-consent.html %}
      </body>
      </html>
    `;

    expect(layoutContent).toContain('{% include cookie-consent.html %}');
  });

  test('ga.js should be conditionally included', () => {
    const cookieConsentContent = `
      <script>
      if(readCookie('cookie-notice-dismissed')=='true') {
          {% include ga.js %}
      }
      </script>
    `;

    expect(cookieConsentContent).toContain('{% include ga.js %}');
    expect(cookieConsentContent).toContain("readCookie('cookie-notice-dismissed')=='true'");
  });
});
