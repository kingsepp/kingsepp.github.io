<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Kingsepp - Cloud Consulting & IT-Expertise</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <div class="logo">Kingsepp</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Über mich</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Kontakt</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background"></div>
        <div class="hero-content">
            <h1>Cloud Consulting & IT-Expertise für Ihr Unternehmen</h1>
            <p>Ihr Partner für moderne Cloud-Lösungen, sichere IT-Architekturen und zukunftsorientierte Digitalisierung.</p>
            <a href="#contact" class="cta-button">Jetzt Kontakt aufnehmen</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-block alt-bg">
        <div class="container">
            <h2 class="section-title">Über mich</h2>
            <div class="grid-2">
                <!-- Linke Spalte: Text-Card -->
                <div class="card">
                    <h3>Hi, ich bin Kingsepp</h3>
                    <p>Als erfahrener Softwareentwickler und Cloud-Consultant helfe ich Unternehmen dabei, ihre IT-Infrastruktur zu modernisieren und für die digitale Zukunft zu rüsten.</p>
                    <p>Mit tiefgreifender Expertise in Cloud-Technologien, DevOps und modernen Entwicklungspraktiken bringe ich Ihre Projekte erfolgreich voran.</p>
                    <p>
                        <strong>GitHub:</strong>
                        <a href="https://github.com/Kingsepp" target="_blank">github.com/Kingsepp</a>
                    </p>
                </div>
                <!-- Rechte Spalte: Statistikliste -->
                <div class="card">
                    <ul class="list-check">
                        <li><strong>5+</strong> Jahre Erfahrung</li>
                        <li><strong>10+</strong> abgeschlossene Projekte</li>
                        <li><strong>AWS</strong> Zertifiziert</li>
                        <li><strong>Devops</strong> CI/CD</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-block">
      <div class="container">
        <h2 class="section-title">Meine Kernkompetenzen</h2>
        <div class="grid-2">
          <div class="card">
            <h3>Cloud-Architekturen</h3>
            <p>
              Beratung und Planung von skalierbaren Cloud-Lösungen auf AWS und
              Azure. Von der Konzeption bis zur Implementierung.
            </p>
          </div>
          <div class="card">
            <h3>Migration &amp; Modernisierung</h3>
            <p>
              Sichere Migration bestehender Systeme in die Cloud und
              Modernisierung veralteter IT-Infrastrukturen.
            </p>
          </div>
          <div class="card">
            <h3>DevOps-Optimierung</h3>
            <p>
              Implementierung agiler Entwicklungsprozesse, CI/CD-Pipelines und
              automatisierter Deployment-Strategien.
            </p>
          </div>
          <div class="card">
            <h3>IT-Sicherheit</h3>
            <p>
              Umfassende Sicherheitskonzepte und Compliance-Lösungen nach höchsten
              industriellen Standards.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-block alt-bg">
      <div class="container">
        <h2 class="section-title">Kontakt</h2>
        <div class="card">
          <p style="text-align: center; margin-bottom: 2rem; color: var(--color-text);">
            Bereit für Ihr nächstes Cloud-Projekt? Lassen Sie uns sprechen!
          </p>
          <form action="https://formspree.io/f/DEINE_FORM_ID" method="POST">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ihr Name"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                type="email"
                id="email"
                name="_replyto"
                placeholder="Ihre E-Mail-Adresse"
                required
              />
            </div>
            <div class="form-group">
              <label for="company">Unternehmen (optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Firmenname"
              />
            </div>
            <div class="form-group">
              <label for="message">Projektbeschreibung</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Erzählen Sie mir von Ihrem Projekt..."
                required
              ></textarea>
            </div>
            <button type="submit" class="btn-submit">Nachricht senden</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
        <div>
            <p>© 2025 Kingsepp – Cloud Consulting & IT-Expertise</p>
        </div>
    </footer>

    <script src="/assets/js/main.js"></script>
</body>
</html>
