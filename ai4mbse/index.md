---
layout: default
title: AI4MBSE Plugin — KI für Model-Based Systems Engineering
description:
  KI-Plugin für Cameo Systems Modeler und Magic Systems of Systems Architect.
  Automatische Zuordnung von Systemanforderungen zu Subsystemen mit Large
  Language Models und SysML v2.
keywords:
  AI, MBSE, Cameo Systems Modeler, Plugin, Systems Engineering, SysML, LLM
---

<style>
  .logo-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  
  .project-logo {
    height: 80px;
    max-width: 150px;
    object-fit: contain;
    filter: brightness(1) contrast(1);
  }
  
  .logo-credits {
    margin-top: 0.5rem;
    font-size: 0.8em;
    color: #94a3b8;
    text-align: center;
  }
</style>

<main role="main" id="ai4mbse-content">
  <article class="plugin-documentation">
    <!-- Hero Section -->
    <header class="hero glass-morphism ai4mbse-banner-hero" role="banner">
      <div class="hero-content animate-fade-in">
        <h1 class="ai4mbse-banner-title">AI4MBSE Plugin</h1>
        <p class="ai4mbse-banner-subtitle">
          KI-Integration für Magic Systems of Systems Architect<br>
          <span class="ai4mbse-banner-claim text-gradient">Automatisierung. Intelligenz. Effizienz.</span>
        </p>

        <!-- Navigation Menu -->
        <nav class="hero-navigation" style="margin-top: 2rem;">
          <div class="nav-links">
            <a href="#project-title" class="nav-link">Projekt</a>
            <a href="#features-title" class="nav-link">Funktionen</a>
            <a href="#requirements-title" class="nav-link">Systemanforderungen</a>
            <a href="#download-title" class="nav-link">Download</a>
            <a href="#install-title" class="nav-link">Installation</a>
            <a href="#quickstart-title" class="nav-link">Quick Start</a>
            <a href="#troubleshooting-title" class="nav-link">FAQ</a>
            <a href="#demo-title" class="nav-link">Demo</a>
          </div>
        </nav>
      </div>
    </header>


    <section class="section project-section glass-morphism" aria-labelledby="project-title">
    <div class="container">
        <h2 id="project-title" class="section-title">
        <ai4mbse-icon name="project"></ai4mbse-icon> Projekt
        </h2>
        <div class="content-wrapper">
        <!-- Äußere Flexbox: ganz links die Logos, rechts davon der Text -->
        <div class="project-guide">
            <!-- Kleiner Untercontainer nur für die beiden Logos -->
            <div class="logo-group">
            <img src="hm_logo.svg" alt="HM-Logo" class="project-logo">
            <img src="ecse_logo.jpg"
                alt="ECSE-Logo" class="project-logo">
            <img src="ai4mbse_logo.png" alt="AI4MBSE-Logo" class="project-logo">
            </div>

            <div class="logo-credits">
                Logos der Hochschule München und des Experience Centers Systems Engineering verwendet mit freundlicher Genehmigung
            </div>
            <!-- Text bleibt als zweites Flex-Kind -->
            <p class="about-text">
            Das Plugin AI4MBSE wurde im Rahmen des Kurses Systems Engineering Projekt
            im Masterstudiengang Systems Engineering der Fakultät 4 an der Hochschule München
            entwickelt. Die Idee und Aufgabenstellung stammt von Prof. Dr. Claudio Zuccaro
            und verfolgt das Ziel, die automatische Erstellung von Verknüpfungen in einem
            SysML-Systemmodell durch den Einsatz künstlicher Intelligenz zu unterstützen.
            Realisiert wurde das Projekt mit freundlicher Unterstützung des Experience Centers
            Systems Engineering.
            </p>
        </div>
        </div>
    </div>
    </section>

    <!-- Features Section -->
    <section class="section features-section glass-morphism" aria-labelledby="features-title">
    <div class="container">
        <h2 id="features-title" class="section-title">
        <ai4mbse-icon name="features"></ai4mbse-icon> Funktionen
        </h2>
        <div class="content-wrapper">
        <div class="features-grid">
            <div class="feature-card">
                <h3 class="feature-title">🤖 KI-gestützte Anforderungsallokation</h3>
                <p class="feature-description">
                    Automatische Zuordnung von Systemanforderungen zu passenden Subsystemen
                    durch Google Gemini AI mit Konfidenzwerten und Begründungen.
                </p>
            </div>

            <div class="feature-card">
                <h3 class="feature-title">⚡ Asynchrone Verarbeitung</h3>
                <p class="feature-description">
                    Keine UI-Blockierung während der AI-Analyse. Echtzeitfortschritt
                    und Abbruchmöglichkeit für große Projektdaten.
                </p>
            </div>

            <div class="feature-card">
                <h3 class="feature-title">🔄 Automatische Modellintegration</h3>
                <p class="feature-description">
                    Erstellt automatisch SysML Satisfy-Abhängigkeiten zwischen
                    Anforderungen und Subsystemen nach Bestätigung.
                </p>
            </div>

            <div class="feature-card">
                <h3 class="feature-title">📁 Interaktive Ordnerauswahl</h3>
                <p class="feature-description">
                    Dynamische Navigation durch Projektstrukturen. Unterstützung
                    für große Projekte mit 1000+ Anforderungen.
                </p>
            </div>

            <div class="feature-card">
                <h3 class="feature-title">🔑 Einfache API-Verwaltung</h3>
                <p class="feature-description">
                    Direkte Eingabe des Google Gemini API-Schlüssels im Plugin.
                    Keine komplizierte Umgebungsvariablen-Konfiguration.
                </p>
            </div>

            <div class="feature-card">
                <h3 class="feature-title">📊 Intelligente Bewertung</h3>
                <p class="feature-description">
                    AI liefert Konfidenzwerte und detaillierte Begründungen
                    für jede Allokationsempfehlung.
                </p>
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- System Requirements Section -->
    <section class="section requirements-section glass-morphism" aria-labelledby="requirements-title">
    <div class="container">
        <h2 id="requirements-title" class="section-title">
        <ai4mbse-icon name="system"></ai4mbse-icon> Systemanforderungen
        </h2>
        <div class="content-wrapper">
        <div class="requirements-grid">
            <div class="requirement-category">
                <h3 class="category-title">Software</h3>
                <ul class="requirement-list">
                    <li><strong>Magic Systems of Systems Architect:</strong> 2024x oder neuer</li>
                    <li><strong>Cameo Systems Modeler:</strong> 2024x oder neuer</li>
                    <li><strong>Java:</strong> Version 17 oder höher</li>
                    <li><strong>Google Gemini API:</strong> Aktiver API-Schlüssel erforderlich</li>
                </ul>
            </div>

            <div class="requirement-category">
                <h3 class="category-title">Betriebssystem</h3>
                <ul class="requirement-list">
                    <li><strong>Windows:</strong> 10 oder 11 (getestet)</li>
                    <li><strong>macOS:</strong> 10.15+ (theoretisch unterstützt)</li>
                    <li><strong>Linux:</strong> Ubuntu 20.04+ (theoretisch unterstützt)</li>
                </ul>
            </div>

            <div class="requirement-category">
                <h3 class="category-title">Hardware</h3>
                <ul class="requirement-list">
                    <li><strong>RAM:</strong> Mindestens 4 GB, 8 GB empfohlen</li>
                    <li><strong>Speicher:</strong> 50 MB für Plugin-Installation</li>
                    <li><strong>Internetverbindung:</strong> Für Google Gemini API erforderlich</li>
                </ul>
            </div>
        </div>
        </div>
    </div>
    </section>

    <section class="section download-section glass-morphism ai4mbse-download" aria-labelledby="download-title">
    <div class="container">
        <h2 id="download-title" class="section-title">
        <ai4mbse-icon name="download"></ai4mbse-icon> Download
        </h2>
        <div class="content-wrapper">
            <div class="setup-guide">
                <div class="download-card">
                    <div class="download-header">
                        <h3>AI4MBSE Plugin v1.7</h3>
                        <span class="download-size">~2.5 MB</span>
                    </div>

                    <div class="download-button-container">
                        <a href="AI4MBSE_Plugin.zip" class="cta-button enhanced-download">
                            <span class="download-icon">⬇️</span>
                            Plugin herunterladen
                        </a>
                    </div>

                    <div class="download-note">
                        <small>💡 Vollständiges ZIP-Paket mit allen Installationsdateien</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>



    <!-- Installation Section -->
    <section class="section installation-section glass-morphism" aria-labelledby="install-title">
    <div class="container">
        <h2 id="install-title" class="section-title">
        <ai4mbse-icon name="install"></ai4mbse-icon> Installation
        </h2>

        <div class="content-wrapper">
        <div class="setup-guide">
            <div class="callout callout-info" style="margin-bottom: 2rem;">
                <strong>Hinweis:</strong> Das Plugin wurde ausschließlich unter <b>Windows</b> getestet. Die Anleitung und Installationsschritte beziehen sich nur auf Windows-Systeme.
            </div>

            <div class="callout callout-warning" style="margin-bottom: 2rem;">
                <strong>API-Schlüssel erforderlich:</strong> Das Plugin benötigt einen kostenlosen Google Gemini API-Schlüssel.
                <a href="https://ai.google.dev/gemini-api/docs/api-key?hl=de" target="_blank" rel="noopener" class="link-primary">Hier können Sie einen API-Schlüssel erstellen</a>.
                Das Plugin fragt beim ersten Start nach dem Schlüssel.
            </div>

            <div class="guide-step">
            <h3 class="step-title">1. ZIP-Paket herunterladen</h3>
            <p>
                Klicken Sie auf den Download-Button und speichern Sie die AI4MBSE_Plugin.zip-Datei lokal auf Ihrem Computer.
            </p>
            </div>

            <div class="guide-step">
            <h3 class="step-title">2. ZIP-Paket entpacken</h3>
            <p>Entpacken Sie das ZIP-Paket direkt in das folgende Verzeichnis:</p>
            <pre class="code-block">
    <code>
    C:\Users\YOUR_USERNAME\AppData\Local\.magic.systems.of.systems.architect\2024x\plugins
    </code>
            </pre>
            <p>
                Im Plugins-Ordner sollte anschließend ein AI4MBSE-Ordner mit allen relevanten Dateien enthalten sein.
            </p>
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- GitHub Repository Section -->
    <section class="section github-section glass-morphism" aria-labelledby="github-title">
    <div class="container">
        <h2 id="github-title" class="section-title">
        <ai4mbse-icon name="github"></ai4mbse-icon> GitHub Repository
        </h2>
        <div class="content-wrapper">
        <div class="setup-guide">
            <div class="github-card">
                <div class="github-header">
                    <div class="repo-icon">📂</div>
                    <div class="repo-info">
                        <h3>kingsepp/AI4MBSE</h3>
                        <p>KI-gestütztes Plugin für Magic Systems of Systems Architect</p>
                    </div>
                    <div class="license-badge">MIT</div>
                </div>

                <div class="repo-stats">
                    <div class="stat-item">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-label">Open Source</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">📄</span>
                        <span class="stat-label">MIT Lizenz</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">🔧</span>
                        <span class="stat-label">Java Plugin</span>
                    </div>
                </div>

                <div class="github-actions">
                    <a href="https://github.com/kingsepp/ai4mbse-plugin" target="_blank" rel="noopener" class="cta-button github-link">
                        <span class="github-icon">🔗</span>
                        Repository ansehen
                    </a>
                    <p class="github-note">
                        <small>Vollständiger Quellcode, Dokumentation und Entwicklungshistorie</small>
                    </p>
                </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- Quick Start Section -->
    <section class="section quickstart-section glass-morphism" aria-labelledby="quickstart-title">
    <div class="container">
        <h2 id="quickstart-title" class="section-title">
        <ai4mbse-icon name="quickstart"></ai4mbse-icon> Quick Start
        </h2>
        <div class="content-wrapper">
        <div class="quickstart-guide">
            <p class="quickstart-intro">
                Nach der Installation können Sie sofort mit der KI-gestützten Anforderungsallokation beginnen:
            </p>

            <div class="quickstart-steps">
                <div class="quickstart-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4 class="step-title">Plugin starten</h4>
                        <p class="step-description">
                            Öffnen Sie Magic Draw/Cameo und navigieren Sie zu <strong>Tools → Find Subsystem for Requirement (AI4MBSE)</strong>
                        </p>
                    </div>
                </div>

                <div class="quickstart-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4 class="step-title">API-Schlüssel eingeben</h4>
                        <p class="step-description">
                            Beim ersten Start werden Sie nach Ihrem Google Gemini API-Schlüssel gefragt.
                            <a href="https://ai.google.dev/gemini-api/docs/api-key?hl=de" target="_blank" rel="noopener">Hier erstellen</a>
                        </p>
                    </div>
                </div>

                <div class="quickstart-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4 class="step-title">Anforderungsordner auswählen</h4>
                        <p class="step-description">
                            Wählen Sie das Package mit Ihren Systemanforderungen aus der Projektstruktur
                        </p>
                    </div>
                </div>

                <div class="quickstart-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4 class="step-title">Spezifische Anforderung wählen</h4>
                        <p class="step-description">
                            Selektieren Sie die konkrete Anforderung, die Sie einem Subsystem zuordnen möchten
                        </p>
                    </div>
                </div>

                <div class="quickstart-step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h4 class="step-title">Subsystem-Ordner auswählen</h4>
                        <p class="step-description">
                            Wählen Sie das Package mit Ihren verfügbaren Subsystemen
                        </p>
                    </div>
                </div>

                <div class="quickstart-step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h4 class="step-title">KI-Empfehlungen prüfen</h4>
                        <p class="step-description">
                            Überprüfen Sie die AI-Vorschläge mit Konfidenzwerten und Begründungen, dann bestätigen Sie die gewünschten Allokationen
                        </p>
                    </div>
                </div>
            </div>

            <div class="quickstart-tip">
                <strong>💡 Tipp:</strong> Das Plugin funktioniert am besten mit gut strukturierten SysML-Modellen und klaren Anforderungsbeschreibungen.
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- Troubleshooting Section -->
    <section class="section troubleshooting-section glass-morphism" aria-labelledby="troubleshooting-title">
    <div class="container">
        <h2 id="troubleshooting-title" class="section-title">
        <ai4mbse-icon name="help"></ai4mbse-icon> Häufige Probleme & Lösungen
        </h2>
        <div class="content-wrapper">
        <div class="faq-container">
            <div class="faq-item">
                <h3 class="faq-question">Plugin erscheint nicht im Tools-Menü</h3>
                <div class="faq-answer">
                    <p><strong>Lösung:</strong></p>
                    <ul>
                        <li>Überprüfen Sie, ob das Plugin korrekt im Plugins-Ordner entpackt wurde</li>
                        <li>Starten Sie Magic Draw/Cameo neu</li>
                        <li>Prüfen Sie die Konsole auf Fehlermeldungen: <em>Help → System Info → Log</em></li>
                    </ul>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-question">API-Authentifizierungsfehler</h3>
                <div class="faq-answer">
                    <p><strong>Lösung:</strong></p>
                    <ul>
                        <li>Überprüfen Sie Ihren Google Gemini API-Schlüssel</li>
                        <li>Stellen Sie sicher, dass der API-Schlüssel aktiv und nicht abgelaufen ist</li>
                        <li>Prüfen Sie Ihre Internetverbindung</li>
                        <li>Geben Sie den API-Schlüssel erneut im Plugin-Dialog ein</li>
                    </ul>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-question">Plugin reagiert nicht/hängt</h3>
                <div class="faq-answer">
                    <p><strong>Lösung:</strong></p>
                    <ul>
                        <li>Nutzen Sie die Abbruch-Funktion im Plugin-Dialog</li>
                        <li>Bei sehr großen Modellen: Verarbeiten Sie kleinere Anforderungsgruppen</li>
                        <li>Überprüfen Sie die verfügbare RAM (mindestens 4 GB empfohlen)</li>
                    </ul>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-question">Keine Subsysteme gefunden</h3>
                <div class="faq-answer">
                    <p><strong>Lösung:</strong></p>
                    <ul>
                        <li>Stellen Sie sicher, dass Ihr Subsystem-Package korrekte SysML-Blöcke enthält</li>
                        <li>Überprüfen Sie die Package-Struktur in Ihrem Modell</li>
                        <li>Verwenden Sie die interaktive Ordnerauswahl zur Navigation</li>
                    </ul>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-question">KI-Vorschläge sind ungenau</h3>
                <div class="faq-answer">
                    <p><strong>Lösung:</strong></p>
                    <ul>
                        <li>Verbessern Sie die Beschreibungen Ihrer Anforderungen</li>
                        <li>Verwenden Sie präzise, technische Sprache</li>
                        <li>Achten Sie auf die Konfidenzwerte der KI-Empfehlungen</li>
                        <li>Nutzen Sie die Begründungen der KI zur Nachvollziehbarkeit</li>
                    </ul>
                </div>
            </div>
        </div>

        </div>
    </div>
    </section>

    <!-- Demo Section -->
    <section class="section demo-section glass-morphism" aria-labelledby="demo-title">
      <div class="container">
        <h2 id="demo-title" class="section-title">
          <ai4mbse-icon name="video"></ai4mbse-icon> Live Demo
        </h2>

        <div class="content-wrapper">
          <div class="demo-guide">
            <p class="demo-intro">Schauen Sie sich die folgende Demo an, um zu sehen, wie das AI4MBSE-Plugin funktioniert:</p>

            <div class="video-wrapper" role="complementary">
            <video width="640" height="360" controls>
                <source src="demo.mp4" type="video/mp4">
                Ihr Browser unterstützt das Video-Tag nicht.
            </video>
            </div>
          </div>
        </div>
      </div>
    </section>

  </article>
</main>

<!-- Back to Top Button -->
<button id="backToTop" class="back-to-top" onclick="scrollToTop()" style="display: none;">
  ↑ Nach oben
</button>

<!-- Scripts for fancy hero animation -->
<script src="/assets/js/ai4mbse-hero-animate.js"></script>

<!-- Back to Top Functionality -->
<script>
// Back to Top functionality
window.onscroll = function() {
    var backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
</script>
