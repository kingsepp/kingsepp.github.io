document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('nav');
  // let lastScrollY = window.scrollY; // Currently unused

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(15, 23, 42, 0.98)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'rgba(15, 23, 42, 0.95)';
      nav.style.boxShadow = 'none';
    }

    // lastScrollY = window.scrollY; // Currently unused
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and sections for animations
  const animatedElements = document.querySelectorAll('.glass-card, .service-card, .stat-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Create floating particles
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = particle.style.height = Math.random() * 8 + 3 + 'px';
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 25000);
  }

  // Create particles periodically
  setInterval(createParticle, 3000);

  // Create initial particles
  for (let i = 0; i < 5; i++) {
    setTimeout(createParticle, i * 1000);
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll('.glass-card, .service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Turnstile callback functions for contact form
  window.onTurnstileSuccess = function (token) {
    console.log('Turnstile verification successful:', token);
    const form = document.querySelector('form.contact-form');
    if (form) {
      // Enable submit button when verification is successful
      const submitButton = form.querySelector('.submit-button');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
      }
    }
  };

  window.onTurnstileError = function (error) {
    console.error('Turnstile verification failed:', error);
    const form = document.querySelector('form.contact-form');
    if (form) {
      const submitButton = form.querySelector('.submit-button');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
      }
    }
  };

  window.onTurnstileExpired = function () {
    console.log('Turnstile token expired');
    const form = document.querySelector('form.contact-form');
    if (form) {
      const submitButton = form.querySelector('.submit-button');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
      }
    }
  };

  // Turnstile callback functions for page-level protection
  window.onImpressumTurnstileSuccess = function (token) {
    console.log('Impressum Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('turnstile-protection');
    const contentDiv = document.getElementById('impressum-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';

      // Optional: Store verification status in sessionStorage
      sessionStorage.setItem('impressum-verified', 'true');
    }
  };

  window.onImpressumTurnstileError = function (error) {
    console.error('Impressum Turnstile verification failed:', error);
    const protectionDiv = document.getElementById('turnstile-protection');
    if (protectionDiv) {
      const errorMsg = protectionDiv.querySelector('.error-message') || document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.style.color = '#ef4444';
      errorMsg.style.marginTop = '1rem';
      errorMsg.textContent = 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      if (!protectionDiv.querySelector('.error-message')) {
        protectionDiv.appendChild(errorMsg);
      }
    }
  };

  window.onAI4MBSETurnstileSuccess = function (token) {
    console.log('AI4MBSE Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('turnstile-protection');
    const contentDiv = document.getElementById('ai4mbse-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';

      // Optional: Store verification status in sessionStorage
      sessionStorage.setItem('ai4mbse-verified', 'true');
    }
  };

  window.onAI4MBSETurnstileError = function (error) {
    console.error('AI4MBSE Turnstile verification failed:', error);
    const protectionDiv = document.getElementById('turnstile-protection');
    if (protectionDiv) {
      const errorMsg = protectionDiv.querySelector('.error-message') || document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.style.color = '#ef4444';
      errorMsg.style.marginTop = '1rem';
      errorMsg.textContent = 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      if (!protectionDiv.querySelector('.error-message')) {
        protectionDiv.appendChild(errorMsg);
      }
    }
  };

  // Additional callback functions for new protected pages
  window.onMainPageTurnstileSuccess = function (token) {
    console.log('Main Page Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('turnstile-protection');
    const contentDiv = document.getElementById('main-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';

      // Store verification status in sessionStorage
      sessionStorage.setItem('main-page-verified', 'true');
    }
  };

  window.onMainPageTurnstileError = function (error) {
    console.error('Main Page Turnstile verification failed:', error);
    const protectionDiv = document.getElementById('turnstile-protection');
    if (protectionDiv) {
      const errorMsg = protectionDiv.querySelector('.error-message') || document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.style.color = '#ef4444';
      errorMsg.style.marginTop = '1rem';
      errorMsg.textContent = 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      if (!protectionDiv.querySelector('.error-message')) {
        protectionDiv.appendChild(errorMsg);
      }
    }
  };

  window.onDatenschutzTurnstileSuccess = function (token) {
    console.log('Datenschutz Turnstile verification successful:', token);
    const protectionDiv = document.getElementById('turnstile-protection');
    const contentDiv = document.getElementById('datenschutz-content');

    if (protectionDiv && contentDiv) {
      protectionDiv.style.display = 'none';
      contentDiv.style.display = 'block';

      // Store verification status in sessionStorage
      sessionStorage.setItem('datenschutz-verified', 'true');
    }
  };

  window.onDatenschutzTurnstileError = function (error) {
    console.error('Datenschutz Turnstile verification failed:', error);
    const protectionDiv = document.getElementById('turnstile-protection');
    if (protectionDiv) {
      const errorMsg = protectionDiv.querySelector('.error-message') || document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.style.color = '#ef4444';
      errorMsg.style.marginTop = '1rem';
      errorMsg.textContent = 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      if (!protectionDiv.querySelector('.error-message')) {
        protectionDiv.appendChild(errorMsg);
      }
    }
  };

  // Check if user has already been verified in this session
  function checkExistingVerification() {
    // Check for Main page
    if (
      document.getElementById('main-content') &&
      sessionStorage.getItem('main-page-verified') === 'true'
    ) {
      const protectionDiv = document.getElementById('turnstile-protection');
      const contentDiv = document.getElementById('main-content');
      if (protectionDiv && contentDiv) {
        protectionDiv.style.display = 'none';
        contentDiv.style.display = 'block';
      }
    }

    // Check for Impressum page
    if (
      document.getElementById('impressum-content') &&
      sessionStorage.getItem('impressum-verified') === 'true'
    ) {
      const protectionDiv = document.getElementById('turnstile-protection');
      const contentDiv = document.getElementById('impressum-content');
      if (protectionDiv && contentDiv) {
        protectionDiv.style.display = 'none';
        contentDiv.style.display = 'block';
      }
    }

    // Check for AI4MBSE page
    if (
      document.getElementById('ai4mbse-content') &&
      sessionStorage.getItem('ai4mbse-verified') === 'true'
    ) {
      const protectionDiv = document.getElementById('turnstile-protection');
      const contentDiv = document.getElementById('ai4mbse-content');
      if (protectionDiv && contentDiv) {
        protectionDiv.style.display = 'none';
        contentDiv.style.display = 'block';
      }
    }

    // Check for Datenschutz page
    if (
      document.getElementById('datenschutz-content') &&
      sessionStorage.getItem('datenschutz-verified') === 'true'
    ) {
      const protectionDiv = document.getElementById('turnstile-protection');
      const contentDiv = document.getElementById('datenschutz-content');
      if (protectionDiv && contentDiv) {
        protectionDiv.style.display = 'none';
        contentDiv.style.display = 'block';
      }
    }
  }

  // Call the verification check
  checkExistingVerification();

  // Form submission enhancement
  const form = document.querySelector('form.contact-form');
  if (form) {
    // Initially disable submit button until Turnstile verification
    const submitButton = form.querySelector('.submit-button');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = '0.5';
    }

    form.addEventListener('submit', function (e) {
      // Check if Turnstile token exists
      const turnstileResponse = form.querySelector('input[name="cf-turnstile-response"]');
      if (!turnstileResponse || !turnstileResponse.value) {
        e.preventDefault();
        alert('Bitte bestätigen Sie, dass Sie kein Roboter sind.');
        return;
      }

      if (submitButton) {
        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;

        // Re-enable button after 3 seconds (in case of form errors)
        setTimeout(() => {
          submitButton.textContent = 'Nachricht senden';
          submitButton.disabled = false;
        }, 3000);
      }
    });
  }

  // Add typing effect to hero title (optional enhancement)
  const heroTitle = document.querySelector('.hero-main h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Dynamic background gradient based on scroll
  window.addEventListener('scroll', () => {
    const scrollPercentage =
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = 220 + scrollPercentage * 40; // Shift from blue to purple
    document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 8%) 0%, hsl(${hue + 20}, 60%, 12%) 25%, hsl(${hue + 10}, 50%, 18%) 50%, hsl(${hue}, 60%, 10%) 100%)`;
  });

  // Mobile navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-links-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }
});

// Add performance optimization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/assets/css/style.css';
    link.as = 'style';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.defer = true;
    document.body.appendChild(script);
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/assets/css/style.css';
    link.as = 'style';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.defer = true;
    document.body.appendChild(script);
  }, 2000);
}
