const puppeteer = require('puppeteer');

async function testAnalyticsConsent() {
  console.log('🧪 Starting Google Analytics Consent Test...\n');

  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode for WSL compatibility
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();

  // Monitor network requests
  const analyticsRequests = [];
  page.on('request', request => {
    const url = request.url();
    if (
      url.includes('google-analytics') ||
      url.includes('googletagmanager') ||
      url.includes('collect') ||
      url.includes('gtag')
    ) {
      analyticsRequests.push({
        url: url,
        timestamp: new Date().toISOString(),
      });
    }
  });

  try {
    // Step 1: Load page without consent
    console.log('📄 Loading page...');
    await page.goto('http://localhost:4000', { waitUntil: 'networkidle2' });

    // Wait a bit for any delayed analytics
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check initial state
    console.log('\n🔍 BEFORE Consent:');
    console.log(`   Analytics Requests: ${analyticsRequests.length}`);

    const initialCookies = await page.cookies();
    const gaCookiesBefore = initialCookies.filter(c => c.name.startsWith('_ga'));
    console.log(`   GA Cookies: ${gaCookiesBefore.length}`);

    if (analyticsRequests.length === 0 && gaCookiesBefore.length === 0) {
      console.log('   ✅ GOOD: No analytics loaded before consent');
    } else {
      console.log('   ❌ BAD: Analytics detected before consent!');
      analyticsRequests.forEach(req => console.log(`     - ${req.url}`));
    }

    // Step 2: Accept cookies
    console.log('\n🍪 Accepting cookies...');

    // Wait for cookie banner and click accept (new system)
    await page.waitForSelector('#cookie-notice-accept', { timeout: 5000 });
    await page.click('#cookie-notice-accept');

    // Wait for analytics to load
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check after consent
    console.log('\n🔍 AFTER Consent:');
    console.log(`   Analytics Requests: ${analyticsRequests.length}`);

    const finalCookies = await page.cookies();
    const gaCookiesAfter = finalCookies.filter(c => c.name.startsWith('_ga'));
    console.log(`   GA Cookies: ${gaCookiesAfter.length}`);

    if (analyticsRequests.length > 0 && gaCookiesAfter.length > 0) {
      console.log('   ✅ GOOD: Analytics loaded after consent');
      analyticsRequests.forEach(req => console.log(`     - ${req.url}`));
      gaCookiesAfter.forEach(cookie =>
        console.log(`     - ${cookie.name}=${cookie.value.substring(0, 20)}...`)
      );
    } else {
      console.log('   ❌ BAD: Analytics not loading after consent!');
    }

    // Step 3: Test opt-out (simplified for new system)
    console.log('\n🚫 Testing opt-out...');

    // Clear cookies and reload page
    await page.evaluate(() => {
      // Clear all cookies
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
    });

    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if banner appears again and no analytics
    const bannerVisible = await page.$('#cookie-notice');
    const finalCookies = await page.cookies();
    const gaFinalCookies = finalCookies.filter(c => c.name.startsWith('_ga'));

    if (bannerVisible && gaFinalCookies.length === 0) {
      console.log('   ✅ GOOD: Banner reappears and analytics cookies cleared');
    } else {
      console.log('   ⚠️  WARNING: Opt-out behavior needs review');
    }

    console.log('\n📊 Test Summary:');
    console.log(`   Total Analytics Requests: ${analyticsRequests.length}`);
    console.log(`   Final Cookie Count: ${gaFinalCookies.length}`);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testAnalyticsConsent().catch(console.error);
