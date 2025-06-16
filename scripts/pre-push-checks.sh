#!/bin/bash

# Pre-push checks script
# Run this before pushing to ensure code quality

set -e

echo "🚀 Running pre-push checks..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Run this script from the project root."
    exit 1
fi

# 1. Lint JavaScript files
echo "🔍 Running ESLint..."
if npm run lint; then
    print_status "ESLint passed"
else
    print_error "ESLint failed. Fix linting errors before pushing."
    exit 1
fi

# 2. Check code formatting
echo "💅 Checking code formatting..."
if npm run format:check; then
    print_status "Code formatting is correct"
else
    print_warning "Code formatting issues found. Run 'npm run format' to fix."
    echo "Do you want to auto-fix formatting? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        npm run format
        print_status "Code formatted"
    else
        print_error "Please fix formatting issues before pushing."
        exit 1
    fi
fi

# 3. Run tests
echo "🧪 Running tests..."
if npm test; then
    print_status "All tests passed"
else
    print_error "Tests failed. Fix failing tests before pushing."
    exit 1
fi

# 4. Check test coverage
echo "📊 Checking test coverage..."
npm run test:coverage > /dev/null 2>&1
if [ -f "coverage/lcov-report/index.html" ]; then
    coverage_line=$(grep -o '[0-9]*\.[0-9]*%' coverage/lcov-report/index.html | head -1)
    coverage_num=$(echo "$coverage_line" | sed 's/%//')
    if (( $(echo "$coverage_num >= 80" | bc -l) )); then
        print_status "Test coverage: $coverage_line"
    else
        print_warning "Test coverage is below 80%: $coverage_line"
    fi
fi

# 5. Try building Jekyll site
echo "🏗️ Testing Jekyll build..."
if bundle exec jekyll build --destination _site_test; then
    print_status "Jekyll build successful"
    rm -rf _site_test
else
    print_error "Jekyll build failed. Fix build errors before pushing."
    exit 1
fi

# 6. Check for security issues
echo "🔒 Running security checks..."
if npm audit --audit-level high; then
    print_status "No high-severity security vulnerabilities found"
else
    print_warning "Security vulnerabilities found. Consider fixing them."
fi

# 7. Check for large files
echo "📦 Checking for large files..."
large_files=$(find . -type f -size +5M -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./_site/*" 2>/dev/null)
if [ -n "$large_files" ]; then
    print_warning "Large files found (>5MB):"
    echo "$large_files"
    echo "Consider using Git LFS for large files."
fi

# 8. Check commit message (if provided)
if [ $# -eq 1 ]; then
    commit_msg="$1"
    if [[ ${#commit_msg} -lt 10 ]]; then
        print_warning "Commit message is quite short. Consider adding more detail."
    fi
    
    if [[ $commit_msg =~ ^(feat|fix|docs|style|refactor|test|chore): ]]; then
        print_status "Commit message follows conventional format"
    else
        print_warning "Consider using conventional commit format: type: description"
    fi
fi

print_status "All pre-push checks completed successfully! 🎉"
echo ""
echo "Ready to push! 🚀"