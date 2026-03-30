#!/bin/bash

# Simplified Pipeline Test
set -e

echo "🚀 SIMPLE LOCAL CI/CD PIPELINE TEST"
echo "===================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

STEP=0
ERRORS=0

run_step() {
    STEP=$((STEP + 1))
    echo -e "\n${YELLOW}Step $STEP: $1${NC}"
    echo "------------------------------------"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    ERRORS=$((ERRORS + 1))
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Dependencies
run_step "Check Dependencies"
if [ -f "package.json" ]; then
    success "package.json found"
    if [ -d "node_modules" ]; then
        success "node_modules exists"
    else
        echo "Installing npm dependencies..."
        npm install --silent
    fi
else
    error "package.json not found"
fi

# Step 2: Linting
run_step "Code Linting"
if npm run lint; then
    success "ESLint passed"
else
    error "ESLint failed"
fi

# Step 3: Formatting
run_step "Code Formatting"
if npm run format:check; then
    success "Code formatting OK"
else
    echo "Auto-fixing formatting..."
    npm run format
    success "Code formatted"
fi

# Step 4: Tests
run_step "Unit Tests"
if npm test; then
    success "All tests passed"
else
    error "Tests failed"
fi

# Step 5: Integration Tests
run_step "Integration Tests"
if npm run test:integration; then
    success "Integration tests passed"
else
    error "Integration tests failed"
fi

# Step 6: Cookie Tests
run_step "Cookie Consent Tests"
if npm run test:cookie-new; then
    success "Cookie tests passed"
else
    error "Cookie tests failed"
fi

# Step 7: Link Validation
run_step "Link Validation"
if npm run validate:links; then
    success "All links valid"
else
    error "Broken links found"
fi

# Summary
echo -e "\n🎯 PIPELINE SUMMARY"
echo "==================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ SUCCESS: All checks passed!${NC}"
    echo -e "${GREEN}🚀 Ready for GitHub Actions${NC}"
else
    echo -e "${RED}❌ FAILED: $ERRORS errors found${NC}"
    echo -e "${RED}Fix issues before proceeding${NC}"
fi

echo -e "\n⏱️  Pipeline completed in $(($(date +%s) - $(date +%s))) seconds"
exit $ERRORS