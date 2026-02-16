// Fancy animated hero for AI4MBSE Plugin (2026 style)
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  if (!hero) {
    return;
  }

  // 1. Animated gradient text for headline
  const h1 = hero.querySelector('h1');
  if (h1) {
    h1.style.background = 'linear-gradient(90deg, #00eaff, #8b5cf6, #00eaff)';
    h1.style.backgroundSize = '200% auto';
    h1.style.webkitBackgroundClip = 'text';
    h1.style.webkitTextFillColor = 'transparent';
    h1.style.backgroundClip = 'text';
    h1.style.textFillColor = 'transparent';
    h1.style.animation = 'ai4mbse-gradient-move 3s linear infinite';
  }

  // 2. Typewriter effect for subtitle
  const subtitle = hero.querySelector('.hero-subtitle');
  if (subtitle) {
    const text = subtitle.innerHTML;
    subtitle.innerHTML = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.innerHTML += text.charAt(i) === '<' ? '' : text.charAt(i);
        if (text.charAt(i) === '<') {
          // Skip HTML tags
          while (i < text.length && text.charAt(i) !== '>') {
            i++;
          }
        }
        i++;
        setTimeout(typeWriter, 22);
      } else {
        subtitle.innerHTML = text; // Restore original with HTML
      }
    }
    setTimeout(typeWriter, 400);
  }

  // 3. Floating AI particles
  const particleColors = ['#00eaff', '#8b5cf6', '#38bdf8', '#f472b6'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'ai4mbse-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 60 + 10 + 'vh';
    p.style.width = p.style.height = Math.random() * 18 + 12 + 'px';
    p.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
    p.style.opacity = 0.18 + Math.random() * 0.22;
    p.style.animationDuration = 8 + Math.random() * 8 + 's';
    p.style.animationDelay = Math.random() * 4 + 's';
    hero.appendChild(p);
  }
});

// Add keyframes for gradient and particles
const style = document.createElement('style');
style.innerHTML = `
@keyframes ai4mbse-gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.ai4mbse-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  filter: blur(1.5px);
  animation: ai4mbse-float 12s linear infinite alternate;
}
@keyframes ai4mbse-float {
  0% { transform: translateY(0) scale(1);}
  100% { transform: translateY(-60px) scale(1.15);}
}
.hero-content {
  position: relative;
  overflow: visible;
}
`;
document.head.appendChild(style);
