#!/bin/bash

# Local Cross-Browser Tests Script
# Runs the same tests as GitHub Actions locally before pushing

set -e  # Exit on any error

echo "🧪 Starting Local Cross-Browser Tests..."
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "_config.yml" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Step 1: Install/Update dependencies
print_status "Installing dependencies..."
npm ci
bundle install

# Step 2: Install Playwright browsers if needed
print_status "Installing Playwright browsers..."
npx playwright install

# Step 3: Run standard Jest tests first
print_status "Running Jest unit tests..."
npm test

# Step 4: Build Jekyll site
print_status "Building Jekyll site..."
bundle exec jekyll build

# Step 5: Run Cross-Browser Tests for each browser
browsers=("chromium" "firefox" "webkit")

for browser in "${browsers[@]}"; do
    print_status "Running cross-browser tests on $browser..."
    
    if npx playwright test --project="$browser" --reporter=list; then
        print_success "$browser tests passed!"
    else
        print_error "$browser tests failed!"
        echo ""
        print_warning "You can debug with: npx playwright test --project=$browser --debug"
        echo ""
        exit 1
    fi
done

# Step 6: Run mobile tests
print_status "Running mobile browser tests..."
if npx playwright test --project="Mobile Chrome" --project="Mobile Safari" --reporter=list; then
    print_success "Mobile tests passed!"
else
    print_error "Mobile tests failed!"
    exit 1
fi

# Step 7: Check for favicon (fix the error you mentioned)
print_status "Checking for favicon..."
if [ ! -f "_site/favicon.ico" ] && [ ! -f "assets/favicon.ico" ]; then
    print_warning "No favicon.ico found - this will cause 404 errors"
    print_warning "Consider adding a favicon to improve user experience"
fi

# Step 8: Run additional quality checks
print_status "Running code quality checks..."

# ESLint
if npx eslint . --ext .js; then
    print_success "ESLint checks passed!"
else
    print_error "ESLint checks failed!"
    exit 1
fi

# Prettier
if npx prettier --check .; then
    print_success "Prettier formatting checks passed!"
else
    print_error "Code formatting issues found!"
    print_warning "Run 'npx prettier --write .' to fix formatting"
    exit 1
fi

echo ""
echo "============================================"
print_success "🎉 All local cross-browser tests passed!"
print_success "✅ Your code is ready to push to GitHub"
echo ""
print_status "To push your changes:"
echo "  git push origin <your-branch>"
echo ""
print_status "To run specific browser tests:"
echo "  npx playwright test --project=chromium"
echo "  npx playwright test --project=firefox" 
echo "  npx playwright test --project=webkit"
echo ""
print_status "To run tests in headed mode (see browser):"
echo "  npx playwright test --headed"
echo ""
print_status "To debug a specific test:"
echo "  npx playwright test --debug <test-name>"