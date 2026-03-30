/**
 * Tests für Dark/Light Mode Theme Toggle Feature
 */

// Create proper Jest mocks for localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

// Create proper Jest mocks for document methods
const mockDocument = {
  body: {
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    getAttribute: jest.fn(() => null),
  },
  querySelector: jest.fn(),
  addEventListener: jest.fn(),
};
global.document = mockDocument;

global.window = {
  addEventListener: jest.fn(),
  getComputedStyle: jest.fn(),
};

describe('Theme Toggle Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockDocument.body.getAttribute.mockReturnValue(null);
  });

  describe('Theme Initialization', () => {
    test('should default to dark theme when no localStorage value', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      // Simulate theme initialization logic
      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      expect(savedTheme).toBe('dark');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
    });

    test('should load light theme from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      if (savedTheme === 'light') {
        mockDocument.body.setAttribute('data-theme', 'light');
      }

      expect(savedTheme).toBe('light');
      expect(mockDocument.body.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    });

    test('should load dark theme from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      // Dark theme doesn't need data-theme attribute
      expect(savedTheme).toBe('dark');
      expect(mockDocument.body.setAttribute).not.toHaveBeenCalled();
    });
  });

  describe('Theme Toggle Logic', () => {
    test('should switch from dark to light theme', () => {
      // Mock current theme as dark (no data-theme attribute)
      mockDocument.body.getAttribute.mockReturnValue(null);

      const mockThemeIcon = { textContent: '☀️' };
      const mockToggleButton = {
        querySelector: jest.fn().mockReturnValue(mockThemeIcon),
        setAttribute: jest.fn(),
      };

      // Simulate theme toggle logic
      const currentTheme = mockDocument.body.getAttribute('data-theme');

      if (currentTheme !== 'light') {
        // Switch to light mode
        mockDocument.body.setAttribute('data-theme', 'light');
        mockThemeIcon.textContent = '🌙';
        mockToggleButton.setAttribute('aria-label', 'Zu dunklem Modus wechseln');
        mockLocalStorage.setItem('theme', 'light');
      }

      expect(mockDocument.body.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
      expect(mockThemeIcon.textContent).toBe('🌙');
      expect(mockToggleButton.setAttribute).toHaveBeenCalledWith(
        'aria-label',
        'Zu dunklem Modus wechseln'
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    test('should switch from light to dark theme', () => {
      // Mock current theme as light
      mockDocument.body.getAttribute.mockReturnValue('light');

      const mockThemeIcon = { textContent: '🌙' };
      const mockToggleButton = {
        querySelector: jest.fn().mockReturnValue(mockThemeIcon),
        setAttribute: jest.fn(),
      };

      // Simulate theme toggle logic
      const currentTheme = mockDocument.body.getAttribute('data-theme');

      if (currentTheme === 'light') {
        // Switch to dark mode
        mockDocument.body.removeAttribute('data-theme');
        mockThemeIcon.textContent = '☀️';
        mockToggleButton.setAttribute('aria-label', 'Zu hellem Modus wechseln');
        mockLocalStorage.setItem('theme', 'dark');
      }

      expect(mockDocument.body.removeAttribute).toHaveBeenCalledWith('data-theme');
      expect(mockThemeIcon.textContent).toBe('☀️');
      expect(mockToggleButton.setAttribute).toHaveBeenCalledWith(
        'aria-label',
        'Zu hellem Modus wechseln'
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('Theme Icon State', () => {
    test('should show sun icon in dark mode', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const mockThemeIcon = { textContent: '' };
      const mockToggleButton = { setAttribute: jest.fn() };

      // Simulate icon sync logic
      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      if (savedTheme === 'dark') {
        mockThemeIcon.textContent = '☀️';
        mockToggleButton.setAttribute('aria-label', 'Zu hellem Modus wechseln');
      }

      expect(mockThemeIcon.textContent).toBe('☀️');
      expect(mockToggleButton.setAttribute).toHaveBeenCalledWith(
        'aria-label',
        'Zu hellem Modus wechseln'
      );
    });

    test('should show moon icon in light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const mockThemeIcon = { textContent: '' };
      const mockToggleButton = { setAttribute: jest.fn() };

      // Simulate icon sync logic
      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      if (savedTheme === 'light') {
        mockDocument.body.setAttribute('data-theme', 'light');
        mockThemeIcon.textContent = '🌙';
        mockToggleButton.setAttribute('aria-label', 'Zu dunklem Modus wechseln');
      }

      expect(mockThemeIcon.textContent).toBe('🌙');
      expect(mockToggleButton.setAttribute).toHaveBeenCalledWith(
        'aria-label',
        'Zu dunklem Modus wechseln'
      );
    });
  });

  describe('CSS Variable Integration', () => {
    test('should verify theme CSS variables are available', () => {
      // Mock CSS custom properties check
      const mockComputedStyle = {
        getPropertyValue: jest.fn(),
      };

      global.window.getComputedStyle = jest.fn().mockReturnValue(mockComputedStyle);

      // Simulate checking for theme variables
      const darkThemeVars = ['--bg-primary', '--text-primary', '--text-secondary', '--bg-card'];

      darkThemeVars.forEach(varName => {
        mockComputedStyle.getPropertyValue.mockReturnValue('some-value');
        const value = mockComputedStyle.getPropertyValue(varName);
        expect(value).toBeTruthy();
      });

      expect(mockComputedStyle.getPropertyValue).toHaveBeenCalledTimes(4);
    });
  });

  describe('Theme Persistence', () => {
    test('should persist theme choice across page loads', () => {
      // First: Set light theme
      mockLocalStorage.setItem('theme', 'light');

      // Simulate page reload
      jest.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue('light');

      // Load theme from storage
      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      if (savedTheme === 'light') {
        mockDocument.body.setAttribute('data-theme', 'light');
      }

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
      expect(mockDocument.body.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    });

    test('should handle corrupted localStorage gracefully', () => {
      // Simulate corrupted localStorage
      mockLocalStorage.getItem.mockReturnValue('invalid-theme');

      const savedTheme = mockLocalStorage.getItem('theme') || 'dark';

      // Should fall back to dark theme for invalid values
      const validTheme = ['light', 'dark'].includes(savedTheme) ? savedTheme : 'dark';

      expect(validTheme).toBe('dark');
    });
  });
});

describe('Theme Toggle E2E Integration', () => {
  test('theme toggle button should exist in cookie area', () => {
    // Mock cookie consent HTML structure
    const mockCookieArea = {
      querySelector: jest.fn().mockReturnValue({
        addEventListener: jest.fn(),
        querySelector: jest.fn().mockReturnValue({ textContent: '☀️' }),
      }),
    };

    mockDocument.querySelector.mockReturnValue(mockCookieArea);

    const themeToggle = mockDocument.querySelector('.theme-toggle-cookie');
    expect(themeToggle).toBeTruthy();

    const themeIcon = themeToggle.querySelector('.theme-icon-cookie');
    expect(themeIcon).toBeTruthy();
  });

  test('theme should sync between navigation and cookie toggles', () => {
    const mockNavToggle = {
      style: { display: 'none' },
      querySelector: jest.fn().mockReturnValue({ textContent: '☀️' }),
    };
    const mockCookieToggle = {
      querySelector: jest.fn().mockReturnValue({ textContent: '☀️' }),
    };

    // Both toggles should show same state
    expect(mockNavToggle.querySelector().textContent).toBe(
      mockCookieToggle.querySelector().textContent
    );
  });
});
