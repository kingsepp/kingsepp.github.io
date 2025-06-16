#!/bin/bash

# Local CI/CD Pipeline Script
# Comprehensive testing and validation before GitHub Actions

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Unicode symbols
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="ℹ️"
ROCKET="🚀"
GEAR="⚙️"
TEST="🧪"
SECURITY="🔒"
BUILD="🏗️"
DEPLOY="📦"

# Counters
TOTAL_STEPS=12
CURRENT_STEP=0
ERRORS=0
WARNINGS=0

# Functions
print_header() {
    echo -e "\n${CYAN}╭─────────────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}│                    LOCAL CI/CD PIPELINE                    │${NC}"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────────────╯${NC}\n"
    echo -e "${BLUE}${ROCKET} Starting comprehensive local validation...${NC}\n"
}

print_step() {
    ((CURRENT_STEP++))
    echo -e "\n${BLUE}${GEAR} Step ${CURRENT_STEP}/${TOTAL_STEPS}: $1${NC}"
    echo "─────────────────────────────────────────────"
}

print_success() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    ((ERRORS++))
    echo -e "${RED}${CROSS} $1${NC}"
}

print_warning() {
    ((WARNINGS++))
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

run_command() {
    local cmd="$1"
    local success_msg="$2"
    local error_msg="$3"
    local auto_fix="$4"
    
    echo "Running: $cmd"
    
    if eval "$cmd" 2>&1; then
        print_success "$success_msg"
        return 0
    else
        if [ "$auto_fix" = "true" ]; then
            print_warning "$error_msg - Attempting auto-fix..."
            return 1
        else
            print_error "$error_msg"
            return 1
        fi
    fi
}

check_dependencies() {
    print_step "Checking Dependencies & Environment"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Run from project root."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    print_info "Node.js version: $NODE_VERSION"
    
    # Check npm dependencies
    if [ ! -d "node_modules" ]; then
        print_info "Installing npm dependencies..."
        npm install --silent
    fi
    
    # Check Ruby/Jekyll dependencies
    if command -v bundle &> /dev/null; then
        RUBY_VERSION=$(ruby --version)
        print_info "Ruby version: $RUBY_VERSION"
        
        if [ ! -d "vendor" ]; then
            print_info "Installing Jekyll dependencies..."
            bundle install --quiet
        fi
    else
        print_warning "Bundle not available - Jekyll builds may fail"
    fi
    
    print_success "Dependencies checked"
}

lint_and_format() {
    print_step "Code Linting & Formatting"
    
    # Check Prettier formatting first
    if ! run_command "npm run format:check" "Code formatting is correct" "Code formatting issues found" "true"; then
        print_info "Auto-fixing formatting issues..."
        npm run format
        print_success "Code formatted automatically"
    fi
    
    # Run ESLint
    if ! run_command "npm run lint" "ESLint passed" "ESLint issues found" "true"; then
        print_info "Attempting to auto-fix ESLint issues..."
        if npm run lint:fix; then
            print_success "ESLint issues auto-fixed"
            # Check again after auto-fix
            if ! npm run lint; then
                print_error "Some ESLint issues require manual intervention"
                return 1
            fi
        else
            print_error "ESLint auto-fix failed - manual intervention required"
            return 1
        fi
    fi
}

run_unit_tests() {
    print_step "Unit Tests Execution"
    
    # Run Jest tests
    run_command "npm test" "All unit tests passed" "Unit tests failed"
    
    # Generate coverage report
    print_info "Generating test coverage report..."
    npm run test:coverage > /dev/null 2>&1
    
    if [ -f "coverage/lcov-report/index.html" ]; then
        # Extract coverage percentage
        coverage_line=$(grep -o '[0-9]*\.[0-9]*%' coverage/lcov-report/index.html | head -1)
        coverage_num=$(echo "$coverage_line" | sed 's/%//')
        
        if (( $(echo "$coverage_num >= 80" | bc -l 2>/dev/null || python3 -c "print(1 if $coverage_num >= 80 else 0)" 2>/dev/null || echo "0") )); then
            print_success "Test coverage: $coverage_line"
        else
            print_warning "Test coverage below 80%: $coverage_line"
        fi
    fi
}

validate_markdown() {
    print_step "Markdown Validation"
    
    # Check if markdownlint is available
    if command -v markdownlint &> /dev/null; then
        run_command "markdownlint *.md ai4mbse/*.md" "Markdown files are valid" "Markdown validation issues found"
    else
        print_info "Installing markdownlint..."
        npm install -g markdownlint-cli || print_warning "Could not install markdownlint"
        if command -v markdownlint &> /dev/null; then
            run_command "markdownlint *.md ai4mbse/*.md" "Markdown files are valid" "Markdown validation issues found"
        else
            print_warning "Markdownlint not available - skipping markdown validation"
        fi
    fi
}

security_scan() {
    print_step "Security Scanning"
    
    # npm audit
    print_info "Running npm security audit..."
    if npm audit --audit-level moderate; then
        print_success "No moderate+ security vulnerabilities found"
    else
        print_warning "Security vulnerabilities detected - review npm audit output"
    fi
    
    # Check for sensitive files
    print_info "Scanning for sensitive files..."
    if find . -name "*.key" -o -name "*.pem" -o -name "*.env" | grep -v node_modules | grep -q .; then
        print_error "Sensitive files found!"
        find . -name "*.key" -o -name "*.pem" -o -name "*.env" | grep -v node_modules
        return 1
    else
        print_success "No sensitive files found"
    fi
    
    # Check for hardcoded secrets (basic patterns)
    print_info "Scanning for hardcoded secrets..."
    if grep -r -E "(password|secret|token|api_key)\s*[:=]\s*['\"][^'\"]{8,}" . \
        --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=_site \
        | grep -v "example" | grep -v "placeholder" | grep -q .; then
        print_error "Potential hardcoded secrets found!"
        grep -r -E "(password|secret|token|api_key)\s*[:=]\s*['\"][^'\"]{8,}" . \
            --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=_site
        return 1
    else
        print_success "No hardcoded secrets detected"
    fi
    
    # Check for Cloudflare Turnstile sitekeys (these are public, but flag them for review)
    print_info "Checking for Cloudflare Turnstile sitekeys..."
    if grep -r "data-sitekey" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=_site | grep -q .; then
        print_warning "Cloudflare Turnstile sitekeys found (public keys - OK for client-side)"
        grep -r "data-sitekey" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=_site | head -3
    fi
}

jekyll_build_test() {
    print_step "Jekyll Build Validation"
    
    if command -v bundle &> /dev/null; then
        # Test Jekyll build
        print_info "Testing Jekyll build..."
        if bundle exec jekyll build --destination _site_test; then
            print_success "Jekyll build successful"
            
            # Check build output
            if [ -d "_site_test" ]; then
                SITE_SIZE=$(du -sh _site_test | cut -f1)
                print_info "Built site size: $SITE_SIZE"
                
                # Check for essential files
                essential_files=("index.html" "datenschutz/index.html" "impressum/index.html")
                for file in "${essential_files[@]}"; do
                    if [ -f "_site_test/$file" ]; then
                        print_success "Essential file present: $file"
                    else
                        print_error "Missing essential file: $file"
                    fi
                done
                
                # Cleanup
                rm -rf _site_test
            else
                print_error "Jekyll build directory not created"
                return 1
            fi
        else
            print_error "Jekyll build failed"
            return 1
        fi
    else
        print_warning "Jekyll not available - skipping build test"
    fi
}

cookie_consent_validation() {
    print_step "Cookie Consent System Validation"
    
    # Check required files exist
    required_files=(
        "_includes/cookie-consent.html"
        "_includes/ga.js"
        "_layouts/default.html"
    )
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            print_success "Required file present: $file"
        else
            print_error "Missing required file: $file"
            return 1
        fi
    done
    
    # Check cookie consent implementation (updated pattern)
    if grep -q "readCookie.*==.*true" _includes/cookie-consent.html && grep -q "include ga.js" _includes/cookie-consent.html; then
        print_success "Conditional analytics loading implemented"
    else
        print_error "Conditional analytics loading not found"
        print_info "Checking actual implementation..."
        grep -n "readCookie\|include ga.js" _includes/cookie-consent.html || true
        return 1
    fi
    
    # Check Jekyll integration
    if grep -q "cookie-consent.html" _layouts/default.html; then
        print_success "Cookie consent integrated in layout"
    else
        print_error "Cookie consent not integrated in layout"
        return 1
    fi
    
    # Run specific cookie tests
    print_info "Running cookie consent tests..."
    run_command "npm run test:cookie-new" "Cookie consent tests passed" "Cookie consent tests failed"
}

privacy_compliance_check() {
    print_step "Privacy Compliance Validation"
    
    # Check DSGVO compliance in privacy policy
    privacy_checks=("Google Analytics" "Cookie" "Opt-Out" "Art. 6")
    
    for check in "${privacy_checks[@]}"; do
        if grep -q "$check" datenschutz.md; then
            print_success "Privacy policy contains: $check"
        else
            print_error "Privacy policy missing: $check"
        fi
    done
    
    # Check Impressum completeness
    if grep -q "Thomas Schuster" impressum.md && grep -q "Schachenmeierstraße" impressum.md; then
        print_success "Impressum is complete"
    else
        print_error "Impressum is incomplete"
    fi
}

performance_check() {
    print_step "Performance & Optimization Check"
    
    # Check bundle sizes
    print_info "Checking file sizes..."
    
    # CSS size check
    if [ -f "assets/css/style.css" ]; then
        CSS_SIZE=$(stat -c%s "assets/css/style.css" 2>/dev/null || stat -f%z "assets/css/style.css")
        CSS_SIZE_KB=$((CSS_SIZE / 1024))
        if [ $CSS_SIZE -gt 100000 ]; then
            print_warning "CSS file is large: ${CSS_SIZE_KB}KB"
        else
            print_success "CSS file size OK: ${CSS_SIZE_KB}KB"
        fi
    fi
    
    # Check for unoptimized images
    print_info "Checking for large images..."
    large_images=$(find . -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \
        | grep -v node_modules | grep -v _site \
        | xargs ls -la 2>/dev/null | awk '$5 > 1048576 {print $9, int($5/1024/1024)"MB"}' || true)
    
    if [ -n "$large_images" ]; then
        print_warning "Large images found (>1MB):"
        echo "$large_images"
    else
        print_success "No large images found"
    fi
}

link_validation() {
    print_step "Link Validation"
    
    # Basic internal link check
    print_info "Checking internal links..."
    
    # Check for common broken link patterns
    broken_patterns=("href=\"#\"" "src=\"#\"" "href=\"\"" "src=\"\"")
    
    for pattern in "${broken_patterns[@]}"; do
        if grep -r "$pattern" . --include="*.html" --include="*.md" \
            --exclude-dir=node_modules --exclude-dir=_site | grep -q .; then
            print_warning "Found potentially broken links with pattern: $pattern"
        fi
    done
    
    print_success "Link validation completed"
}

git_status_check() {
    print_step "Git Status & Commit Readiness"
    
    # Check git status
    if git diff --quiet && git diff --staged --quiet; then
        print_success "Working directory clean"
    else
        print_info "Uncommitted changes detected:"
        git status --short
        
        echo -e "\n${YELLOW}Do you want to stage and commit all changes? (y/n)${NC}"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            git add .
            echo -e "${YELLOW}Enter commit message:${NC}"
            read -r commit_msg
            if [ -n "$commit_msg" ]; then
                git commit -m "$commit_msg"
                print_success "Changes committed"
            else
                print_warning "Empty commit message - changes staged but not committed"
            fi
        else
            print_info "Changes not committed"
        fi
    fi
    
    # Check branch
    current_branch=$(git branch --show-current)
    print_info "Current branch: $current_branch"
    
    if [ "$current_branch" = "main" ]; then
        print_warning "You're on main branch - consider using feature branches"
    fi
}

final_summary() {
    print_step "Pipeline Summary & Results"
    
    echo -e "\n${CYAN}╭─────────────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}│                    PIPELINE RESULTS                        │${NC}"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────────────╯${NC}\n"
    
    if [ $ERRORS -eq 0 ]; then
        echo -e "${GREEN}${CHECK} SUCCESS: All pipeline steps completed successfully!${NC}"
        echo -e "${GREEN}${ROCKET} Ready for GitHub Actions deployment${NC}\n"
        
        if [ $WARNINGS -gt 0 ]; then
            echo -e "${YELLOW}${WARNING} $WARNINGS warnings found - review recommended${NC}"
        fi
        
        echo -e "${BLUE}Next steps:${NC}"
        echo -e "${BLUE}1. Push changes: git push${NC}"
        echo -e "${BLUE}2. Monitor GitHub Actions: https://github.com/kingsepp/kingsepp.github.io/actions${NC}"
        echo -e "${BLUE}3. Review deployment status${NC}"
        
        return 0
    else
        echo -e "${RED}${CROSS} FAILURE: $ERRORS errors found${NC}"
        echo -e "${RED}Fix the issues above before proceeding${NC}\n"
        
        if [ $WARNINGS -gt 0 ]; then
            echo -e "${YELLOW}${WARNING} $WARNINGS warnings also need attention${NC}"
        fi
        
        return 1
    fi
}

# Main pipeline execution
main() {
    print_header
    
    # Record start time
    start_time=$(date +%s)
    
    # Execute pipeline steps
    check_dependencies
    lint_and_format
    run_unit_tests
    validate_markdown
    security_scan
    jekyll_build_test
    cookie_consent_validation
    privacy_compliance_check
    performance_check
    link_validation
    git_status_check
    
    # Calculate execution time
    end_time=$(date +%s)
    execution_time=$((end_time - start_time))
    
    echo -e "\n${CYAN}Pipeline execution time: ${execution_time}s${NC}"
    
    # Final summary and exit with appropriate code
    if final_summary; then
        exit 0
    else
        exit 1
    fi
}

# Run the pipeline
main "$@"