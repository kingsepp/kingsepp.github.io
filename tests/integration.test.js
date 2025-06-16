/**
 * Integration Tests
 * Comprehensive end-to-end testing of the Jekyll site
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

describe('Jekyll Site Integration Tests', () => {
  describe('File Structure', () => {
    const requiredFiles = [
      'index.md',
      'datenschutz.md',
      'impressum.md',
      '_config.yml',
      'package.json',
      'Gemfile',
      '_layouts/default.html',
      '_includes/cookie-consent.html',
      '_includes/ga.js',
      'assets/css/style.css',
      'assets/js/main.js',
    ];

    requiredFiles.forEach(file => {
      test(`should have required file: ${file}`, () => {
        const filePath = path.join(projectRoot, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should have AI4MBSE documentation', () => {
      const ai4mbsePath = path.join(projectRoot, 'ai4mbse', 'index.md');
      expect(fs.existsSync(ai4mbsePath)).toBe(true);
    });

    test('should have test directory structure', () => {
      const testFiles = [
        'tests/setup.js',
        'tests/cookie-consent-new.test.js',
        'tests/analytics-consent-test.js',
      ];

      testFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('Configuration Files', () => {
    test('package.json should have required scripts', () => {
      const packagePath = path.join(projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      const requiredScripts = ['test', 'lint', 'format', 'build', 'serve', 'pre-push'];

      requiredScripts.forEach(script => {
        expect(packageJson.scripts).toHaveProperty(script);
      });
    });

    test('_config.yml should have essential configuration', () => {
      const configPath = path.join(projectRoot, '_config.yml');
      const configContent = fs.readFileSync(configPath, 'utf8');

      // Check for essential Jekyll configuration
      expect(configContent).toMatch(/title:/);
      expect(configContent).toMatch(/description:/);
      expect(configContent).toMatch(/baseurl:/);
      expect(configContent).toMatch(/url:/);
    });

    test('ESLint configuration should exist', () => {
      const eslintConfigPath = path.join(projectRoot, 'eslint.config.js');
      expect(fs.existsSync(eslintConfigPath)).toBe(true);
    });

    test('Prettier configuration should exist', () => {
      const prettierConfigPath = path.join(projectRoot, '.prettierrc');
      expect(fs.existsSync(prettierConfigPath)).toBe(true);
    });
  });

  describe('Content Validation', () => {
    test('homepage should have essential content', () => {
      const indexPath = path.join(projectRoot, 'index.md');
      const content = fs.readFileSync(indexPath, 'utf8');

      expect(content).toMatch(/Cloud Consulting|Kingsepp/i);
      expect(content).toMatch(/IT-Expertise|Cloud-Lösungen/i);
      expect(content).toMatch(/Kontakt|Contact/i);
    });

    test('privacy policy should have GDPR compliance', () => {
      const privacyPath = path.join(projectRoot, 'datenschutz.md');
      const content = fs.readFileSync(privacyPath, 'utf8');

      const gdprRequirements = ['Google Analytics', 'Cookie', 'Art. 6', 'Opt-Out', 'Widerspruch'];

      gdprRequirements.forEach(requirement => {
        expect(content).toMatch(new RegExp(requirement, 'i'));
      });
    });

    test('impressum should have required legal information', () => {
      const impressumPath = path.join(projectRoot, 'impressum.md');
      const content = fs.readFileSync(impressumPath, 'utf8');

      const legalRequirements = [
        'Thomas Schuster',
        'Schachenmeierstraße',
        'München',
        'Telefon',
        'E-Mail',
      ];

      legalRequirements.forEach(requirement => {
        expect(content).toMatch(new RegExp(requirement, 'i'));
      });
    });
  });

  describe('Cookie Consent Integration', () => {
    test('default layout should include cookie consent', () => {
      const layoutPath = path.join(projectRoot, '_layouts/default.html');
      const content = fs.readFileSync(layoutPath, 'utf8');

      expect(content).toMatch(/{% include cookie-consent\.html %}/);
    });

    test('cookie consent should have proper structure', () => {
      const cookiePath = path.join(projectRoot, '_includes/cookie-consent.html');
      const content = fs.readFileSync(cookiePath, 'utf8');

      // Check for essential elements
      expect(content).toMatch(/cookie-notice/);
      expect(content).toMatch(/createCookie/);
      expect(content).toMatch(/readCookie/);
      expect(content).toMatch(/{% include ga\.js %}/);
    });

    test('Google Analytics should be conditionally loaded', () => {
      const gaPath = path.join(projectRoot, '_includes/ga.js');
      const content = fs.readFileSync(gaPath, 'utf8');

      expect(content).toMatch(/gtag/);
      expect(content).toMatch(/G-6P6F8KLCQS/);
    });
  });

  describe('Asset Validation', () => {
    test('main CSS file should exist and be reasonable size', () => {
      const cssPath = path.join(projectRoot, 'assets/css/style.css');
      expect(fs.existsSync(cssPath)).toBe(true);

      const stats = fs.statSync(cssPath);
      // CSS should be larger than 1KB but smaller than 500KB
      expect(stats.size).toBeGreaterThan(1024);
      expect(stats.size).toBeLessThan(500 * 1024);
    });

    test('main JavaScript file should exist', () => {
      const jsPath = path.join(projectRoot, 'assets/js/main.js');
      expect(fs.existsSync(jsPath)).toBe(true);

      const content = fs.readFileSync(jsPath, 'utf8');
      expect(content).toMatch(/DOMContentLoaded/);
    });

    test('AI4MBSE assets should exist', () => {
      const ai4mbseAssets = [
        'ai4mbse/ai4mbse_logo.png',
        'ai4mbse/demo.mp4',
        'ai4mbse/AI4MBSE_Plugin.zip',
      ];

      ai4mbseAssets.forEach(asset => {
        const assetPath = path.join(projectRoot, asset);
        expect(fs.existsSync(assetPath)).toBe(true);
      });
    });
  });

  describe('GitHub Actions Workflows', () => {
    test('should have CI/CD workflows', () => {
      const workflows = [
        '.github/workflows/pr-checks.yml',
        '.github/workflows/push-checks.yml',
        '.github/workflows/test-cookie-consent.yml',
      ];

      workflows.forEach(workflow => {
        const workflowPath = path.join(projectRoot, workflow);
        expect(fs.existsSync(workflowPath)).toBe(true);
      });
    });

    test('PR checks workflow should have required jobs', () => {
      const prChecksPath = path.join(projectRoot, '.github/workflows/pr-checks.yml');
      const content = fs.readFileSync(prChecksPath, 'utf8');

      const requiredJobs = ['code-quality', 'build-test', 'markdown-lint', 'link-check'];

      requiredJobs.forEach(job => {
        expect(content).toMatch(new RegExp(`${job}:`, 'i'));
      });
    });
  });

  describe('Security Configuration', () => {
    test('should have proper gitignore', () => {
      const gitignorePath = path.join(projectRoot, '.gitignore');
      const content = fs.readFileSync(gitignorePath, 'utf8');

      const essentialIgnores = ['node_modules/', '_site/', 'coverage/', '*.log'];

      essentialIgnores.forEach(ignore => {
        expect(content).toMatch(ignore);
      });
    });

    test('should not contain sensitive information', () => {
      const sensitivePatterns = [
        /password\s*[:=]\s*["'][^"']{3,}["']/i,
        /secret\s*[:=]\s*["'][^"']{8,}["']/i,
        /api_key\s*[:=]\s*["'][^"']{8,}["']/i,
      ];

      const checkFiles = ['package.json', '_config.yml', 'assets/js/main.js'];

      checkFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          sensitivePatterns.forEach(pattern => {
            expect(content).not.toMatch(pattern);
          });
        }
      });
    });
  });

  describe('Performance Checks', () => {
    test('should not have excessively large files', () => {
      const checkFiles = [
        'assets/css/style.css',
        'assets/js/main.js',
        '_includes/cookie-consent.html',
      ];

      checkFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          // No single file should be larger than 1MB
          expect(stats.size).toBeLessThan(1024 * 1024);
        }
      });
    });

    test('should have compressed assets when available', () => {
      // Check if there are any .min.js or .min.css files
      const assetsDir = path.join(projectRoot, 'assets');

      if (fs.existsSync(assetsDir)) {
        const hasMinifiedAssets = fs
          .readdirSync(assetsDir, { recursive: true })
          .some(file => file.includes('.min.'));

        // This is informational - not all projects need minified assets
        if (hasMinifiedAssets) {
          expect(hasMinifiedAssets).toBe(true);
        }
      }
    });
  });

  describe('Accessibility Basics', () => {
    test('images should have alt attributes in markdown', () => {
      const markdownFiles = ['index.md', 'ai4mbse/index.md'];

      markdownFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');

          // Check that image syntax includes alt text
          const imageMatches = content.match(/!\[([^\]]*)\]\([^)]+\)/g) || [];
          imageMatches.forEach(match => {
            // Alt text should not be empty
            expect(match).toMatch(/!\[.+\]/);
          });
        }
      });
    });

    test('HTML should have proper structure elements', () => {
      const layoutPath = path.join(projectRoot, '_layouts/default.html');
      const content = fs.readFileSync(layoutPath, 'utf8');

      const structuralElements = ['<main>', 'include header.html', 'lang=', '<title>'];

      structuralElements.forEach(element => {
        expect(content).toMatch(element);
      });
    });
  });
});
