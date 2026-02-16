#!/bin/bash

echo "🐳 Simulating GitHub Actions Docker environment..."
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not available in this environment"
    echo "📋 In a Docker environment, the workflow would:"
    echo "   1. Use mcr.microsoft.com/playwright:v1.40.0-focal container"
    echo "   2. Skip browser installation (pre-installed)"
    echo "   3. Run tests directly with: npx playwright test --project=chromium"
    echo ""
    echo "🔧 Running local equivalent tests instead..."
    
    # Build Jekyll site first
    echo "🏗️ Building Jekyll site..."
    bundle exec jekyll build
    
    # Run a simplified test
    echo "🧪 Running basic functionality test..."
    npm run test
    
    echo ""
    echo "✅ Local tests completed!"
    echo "🚀 The Docker version in GitHub Actions will be much faster!"
    exit 0
fi

# If Docker is available, run the actual container
echo "🚀 Running actual Docker test..."
docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/playwright:v1.40.0-focal \
  bash -c "npm ci && bundle install && bundle exec jekyll build && npx playwright test --project=chromium"