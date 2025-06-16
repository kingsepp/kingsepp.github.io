#!/usr/bin/env node

/**
 * Link Validation Script
 * Validates internal and external links in markdown and HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// Configuration
const config = {
  excludeDirs: ['node_modules', '_site', '.git', 'vendor'],
  fileExtensions: ['.md', '.html'],
  timeout: 5000,
  maxRetries: 2,
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class LinkValidator {
  constructor() {
    this.results = {
      totalFiles: 0,
      totalLinks: 0,
      internalLinks: 0,
      externalLinks: 0,
      validLinks: 0,
      brokenLinks: 0,
      errors: [],
      warnings: [],
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content);

      this.results.totalFiles++;
      this.results.totalLinks += links.length;

      this.log(
        `📄 Validating ${path.relative(projectRoot, filePath)} (${links.length} links)`,
        'cyan'
      );

      for (const link of links) {
        await this.validateLink(link, filePath);
      }
    } catch (error) {
      this.results.errors.push({
        file: filePath,
        error: `Failed to read file: ${error.message}`,
      });
    }
  }

  extractLinks(content) {
    const links = [];

    // Markdown links: [text](url)
    const markdownLinks = content.match(/\[([^\]]*)\]\(([^)]+)\)/g) || [];
    markdownLinks.forEach(match => {
      const urlMatch = match.match(/\[([^\]]*)\]\(([^)]+)\)/);
      if (urlMatch) {
        links.push({
          text: urlMatch[1],
          url: urlMatch[2],
          type: 'markdown',
        });
      }
    });

    // HTML links: <a href="url">
    const htmlLinks = content.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
    htmlLinks.forEach(match => {
      const urlMatch = match.match(/href=["']([^"']+)["']/i);
      if (urlMatch) {
        links.push({
          text: match,
          url: urlMatch[1],
          type: 'html',
        });
      }
    });

    // Image links: ![alt](src) and <img src="">
    const imageLinks = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
    imageLinks.forEach(match => {
      const urlMatch = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (urlMatch) {
        links.push({
          text: urlMatch[1],
          url: urlMatch[2],
          type: 'image',
        });
      }
    });

    const htmlImages = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
    htmlImages.forEach(match => {
      const urlMatch = match.match(/src=["']([^"']+)["']/i);
      if (urlMatch) {
        links.push({
          text: match,
          url: urlMatch[1],
          type: 'html-image',
        });
      }
    });

    return links;
  }

  async validateLink(link, filePath) {
    const { url } = link;

    // Skip empty links or anchors
    if (!url || url === '#' || url === '') {
      this.results.warnings.push({
        file: filePath,
        link: url,
        issue: 'Empty or placeholder link',
      });
      return;
    }

    // Skip mailto and tel links
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      this.results.validLinks++;
      return;
    }

    // Skip anchor links for now (would need DOM parsing)
    if (url.startsWith('#')) {
      this.results.internalLinks++;
      this.results.validLinks++;
      return;
    }

    if (this.isExternalLink(url)) {
      await this.validateExternalLink(url, filePath);
    } else {
      await this.validateInternalLink(url, filePath);
    }
  }

  isExternalLink(url) {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
  }

  async validateInternalLink(url, filePath) {
    this.results.internalLinks++;

    // Remove query parameters and anchors
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Convert relative URL to file path
    let targetPath;
    if (cleanUrl.startsWith('/')) {
      // Absolute path from root
      targetPath = path.join(projectRoot, cleanUrl);
    } else {
      // Relative path from current file
      targetPath = path.resolve(path.dirname(filePath), cleanUrl);
    }

    // Check if it's a directory (should have index.html)
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    }

    // For Jekyll, also check for .md files
    if (!fs.existsSync(targetPath)) {
      const mdPath = targetPath.replace(/\.html?$/, '.md');
      if (fs.existsSync(mdPath)) {
        targetPath = mdPath;
      } else {
        // Check for Jekyll page files (e.g., /datenschutz -> datenschutz.md)
        const pagePath = path.join(projectRoot, cleanUrl.substring(1) + '.md');
        if (fs.existsSync(pagePath)) {
          targetPath = pagePath;
        }
      }
    }

    if (fs.existsSync(targetPath)) {
      this.results.validLinks++;
      this.log(`  ✅ ${url}`, 'green');
    } else {
      this.results.brokenLinks++;
      this.results.errors.push({
        file: filePath,
        link: url,
        issue: `Internal link not found: ${targetPath}`,
      });
      this.log(`  ❌ ${url} (not found)`, 'red');
    }
  }

  async validateExternalLink(url, filePath) {
    this.results.externalLinks++;

    // For external links, we'll do a basic validation
    // In a real scenario, you might want to make HTTP requests
    // but that can be slow and hit rate limits

    try {
      new URL(url);
      this.results.validLinks++;
      this.log(`  ✅ ${url} (external)`, 'green');
    } catch (error) {
      this.results.brokenLinks++;
      this.results.errors.push({
        file: filePath,
        link: url,
        issue: `Invalid URL format: ${error.message}`,
      });
      this.log(`  ❌ ${url} (invalid format)`, 'red');
    }
  }

  async validateDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        if (!config.excludeDirs.includes(entry.name)) {
          await this.validateDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (config.fileExtensions.includes(ext)) {
          await this.validateFile(fullPath);
        }
      }
    }
  }

  async run() {
    this.log('🔗 Starting Link Validation', 'cyan');
    this.log('============================', 'cyan');

    await this.validateDirectory(projectRoot);

    this.printSummary();

    return this.results.brokenLinks === 0;
  }

  printSummary() {
    this.log('\n📊 Link Validation Summary', 'cyan');
    this.log('==========================', 'cyan');
    this.log(`Files processed: ${this.results.totalFiles}`);
    this.log(`Total links: ${this.results.totalLinks}`);
    this.log(`Internal links: ${this.results.internalLinks}`);
    this.log(`External links: ${this.results.externalLinks}`);
    this.log(`Valid links: ${this.results.validLinks}`, 'green');
    this.log(
      `Broken links: ${this.results.brokenLinks}`,
      this.results.brokenLinks > 0 ? 'red' : 'green'
    );
    this.log(
      `Warnings: ${this.results.warnings.length}`,
      this.results.warnings.length > 0 ? 'yellow' : 'green'
    );

    if (this.results.errors.length > 0) {
      this.log('\n❌ Errors:', 'red');
      this.results.errors.forEach(error => {
        this.log(`  ${path.relative(projectRoot, error.file)}: ${error.issue}`, 'red');
      });
    }

    if (this.results.warnings.length > 0) {
      this.log('\n⚠️  Warnings:', 'yellow');
      this.results.warnings.forEach(warning => {
        this.log(`  ${path.relative(projectRoot, warning.file)}: ${warning.issue}`, 'yellow');
      });
    }

    if (this.results.brokenLinks === 0) {
      this.log('\n✅ All links are valid!', 'green');
    } else {
      this.log(`\n❌ Found ${this.results.brokenLinks} broken links`, 'red');
    }
  }
}

// Main execution
async function main() {
  const validator = new LinkValidator();
  const success = await validator.run();

  process.exit(success ? 0 : 1);
}

main().catch(console.error);
