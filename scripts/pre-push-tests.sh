#!/bin/bash

# Pre-Push Tests Script
# Quick tests to run before pushing to avoid CI failures

set -e  # Exit on any error

echo "🧪 Running Pre-Push Tests..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Step 1: Run Jest tests
print_status "Running Jest unit tests..."
if npm test; then
    print_success "Jest tests passed!"
else
    print_error "Jest tests failed!"
    exit 1
fi

# Step 2: Check code formatting
print_status "Checking code formatting..."
if npm run format:check 2>/dev/null || npx prettier --check .; then
    print_success "Code formatting is correct!"
else
    print_error "Code formatting issues found!"
    print_warning "Run 'npx prettier --write .' to fix formatting"
    exit 1
fi

# Step 3: Run ESLint
print_status "Running ESLint..."
if npm run lint 2>/dev/null || npx eslint . --ext .js; then
    print_success "ESLint checks passed!"
else
    print_error "ESLint issues found!"
    print_warning "Run 'npm run lint:fix' to auto-fix issues"
    exit 1
fi

# Step 4: Build Jekyll site
print_status "Building Jekyll site..."
if bundle exec jekyll build; then
    print_success "Jekyll build successful!"
else
    print_error "Jekyll build failed!"
    exit 1
fi

# Step 5: Check for common issues
print_status "Checking for common issues..."

# Check favicon exists
if [ -f "_site/assets/favicon.svg" ] || [ -f "_site/favicon.ico" ]; then
    print_success "Favicon found!"
else
    print_warning "No favicon found - browsers will show 404 errors"
fi

# Check for basic page structure
if [ -f "_site/index.html" ]; then
    if grep -q "Referenzen" "_site/index.html"; then
        print_success "Homepage content looks correct!"
    else
        print_warning "Homepage content might be missing"
    fi
else
    print_error "Homepage not generated!"
    exit 1
fi

# Check consulting page
if [ -f "_site/consulting/index.html" ]; then
    if grep -q "Cloud Consulting" "_site/consulting/index.html"; then
        print_success "Consulting page content looks correct!"
    else
        print_warning "Consulting page content might be missing"
    fi
else
    print_error "Consulting page not generated!"
    exit 1
fi

echo ""
echo "=================================="
print_success "🎉 Pre-push tests completed successfully!"
print_success "✅ Your code should be safe to push"
echo ""
print_status "To push your changes:"
echo "  git push origin <your-branch>"
echo ""
print_status "Note: Full cross-browser tests will run in GitHub Actions"
print_status "If you want to run them locally, ensure Playwright is properly installed:"
echo "  npx playwright install --with-deps"
echo "  npm run test:cross-browser"