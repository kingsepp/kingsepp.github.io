/**
 * Jest Test Setup File
 * Wird vor jedem Test ausgeführt
 */

// Mock DOM APIs die in Node.js nicht verfügbar sind
global.document = {
  cookie: '',
  getElementById: jest.fn().mockReturnValue({
    style: { display: 'none' },
    addEventListener: jest.fn()
  }),
  addEventListener: jest.fn(),
  createElement: jest.fn(() => ({
    style: {},
    addEventListener: jest.fn()
  }))
};

global.window = {
  location: {
    reload: jest.fn(),
    href: ''
  },
  getComputedStyle: jest.fn(() => ({
    display: 'none'
  }))
};

// Console Logs für bessere Test-Ausgaben
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
};

// Cleanup nach jedem Test
afterEach(() => {
  jest.clearAllMocks();
  global.document.cookie = '';
});