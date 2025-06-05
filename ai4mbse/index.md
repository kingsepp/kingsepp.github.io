---
layout: default
title: AI4MBSE Plugin – Download & Installation
description: Advanced AI plugin for Magic Systems of Systems Architect
keywords: AI, MBSE, Cameo Systems Modeler, Plugin, Systems Engineering
robots: noindex, nofollow
---

<main role="main">
  <article class="plugin-documentation">
    <!-- Hero Section -->
    <header class="hero glass-morphism ai4mbse-banner-hero" role="banner">
      <div class="hero-content animate-fade-in">
        <h1 class="ai4mbse-banner-title">AI4MBSE Plugin</h1>
        <p class="ai4mbse-banner-subtitle">
          KI-Integration für Magic Systems of Systems Architect<br>
          <span class="ai4mbse-banner-claim text-gradient">Automatisierung. Intelligenz. Effizienz.</span>
        </p>
      </div>
    </header>

    <!-- Download Section -->
    <section class="section download-section glass-morphism" aria-labelledby="download-title">
      <div class="container">
        <h2 id="download-title" class="section-title">
          <ai4mbse-icon name="download"></ai4mbse-icon> Download
        </h2>
        <div class="content-wrapper">
          <div class="setup-guide">
            <p class="about-text" style="text-align: center;">
              Laden Sie einfach das folgende ZIP-Paket herunter. Es enthält alle notwendigen Dateien (JAR, XML, API-Key-Anleitung etc.):
            </p>
            <div style="text-align: center;">
              <a href="AI4MBSE_Plugin.zip" class="cta-button">
                <span style="font-size: 1.2em;">📦</span>
                AI4MBSE_Plugin.zip herunterladen
              </a>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
              <a href="APIKEY.pdf" class="cta-button" style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);">
                <span style="font-size: 1.2em;">📄</span>
                API-Key Anleitung (PDF mit Bildern)
              </a>
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
            <div class="guide-step">
              <h3 class="step-title">1. ZIP-Paket herunterladen</h3>
              <p>Klicken Sie auf <a href="AI4MBSE_Plugin.zip" class="link-primary">AI4MBSE_Plugin.zip</a> und speichern Sie die Datei lokal auf Ihrem Computer.</p>
            </div>
            
            <div class="guide-step">
              <h3 class="step-title">2. ZIP entpacken</h3>
              <p>Entpacken Sie das ZIP-Paket direkt in folgendes Verzeichnis:</p>
              <pre class="code-block"><code>C:\Users\YOUR_USERNAME\AppData\Local\.magic.systems.of.systems.architect\2024x\plugins</code></pre>
              <p>Im Plugin-Ordner sollte dann ein AI4MBSE-Ordner mit allen relevanten Dateien enthalten sein.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API Configuration Section -->
<section class="section api-section glass-morphism" aria-labelledby="api-title">
  <div class="container">
    <h2 id="api-title" class="section-title">
    API Konfiguration
    </h2>

    <div class="content-wrapper">
      <div class="setup-guide">

        <!-- Step 1 -->
        <div class="guide-step">
          <h3 class="step-title">
            <span style="font-size:1.1em;">1.</span> Google Gemini API Key beantragen
          </h3>
          <ul class="setup-steps ai4mbse-bullet-numbers">
            <li>
              <strong>Öffne:</strong> 
              <a href="https://aistudio.google.com/app/apikey" class="link-primary" target="_blank" rel="noopener">aistudio.google.com/app/apikey</a>
            </li>
            <li>Melde dich mit deinem Google-Konto an</li>
            <li>Klicke auf <strong>„Create API Key“</strong></li>
            <li>(Optional) Vergib einen Namen für den Key</li>
            <li><strong>Kopiere</strong> den angezeigten API Key und speichere ihn sicher ab</li>
          </ul>
        </div>

        <!-- Step 2 -->
        <div class="guide-step">
          <h3 class="step-title">
            <span style="font-size:1.1em;">2.</span> API Key als Umgebungsvariable setzen
          </h3>
          <ul class="setup-steps ai4mbse-bullet-numbers">
            <li>Öffne die <strong>Windows-Systemsteuerung</strong></li>
            <li>Suche nach <strong>„Umgebungsvariablen“</strong> und klicke auf <strong>„Umgebungsvariablen...“</strong></li>
            <li>
              Im Abschnitt <strong>„Benutzervariablen“</strong>:
              <ul class="setup-substeps">
                <li>Klicke <strong>„Neu...“</strong></li>
                <li><strong>Name:</strong> <code>GEMINI_API_KEY</code></li>
                <li><strong>Wert:</strong> <em>Dein API Key</em></li>
                <li>Speichern mit „OK“</li>
              </ul>
            </li>
            <li>Schließe alle Fenster mit OK</li>
            <li>Starte ein neues CMD/PowerShell Fenster, damit die Variable erkannt wird</li>
            <li>
              <code>echo %GEMINI_API_KEY%</code>
              <p class="about-text" style="margin-bottom: 0;">
                Damit kannst du testen, ob der Key korrekt gesetzt wurde.
              </p>
            </li>
          </ul>
        </div>

        <div class="callout callout-warning" style="margin-top:2rem;">
          <strong>Sicherheitshinweis:</strong> Teile deinen API Key niemals öffentlich!
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
            <p class="demo-intro">Schauen Sie sich die folgende Demo an, um zu sehen, wie das AI4MBSE Plugin funktioniert:</p>
            
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

<style>
/* Farbpalette */
:root {
  --ai4mbse-blue: #38bdf8;
  --ai4mbse-purple: #8b5cf6;
  --ai4mbse-dark: #0f1629;
  --ai4mbse-gold: #e6c97a;
  --ai4mbse-gold-hover: #f3e7b0;
  --ai4mbse-link: #e6c97a;
  --ai4mbse-link-hover: #f3e7b0;
}

/* Animierter Hintergrund für die gesamte Seite */
body {
  background: linear-gradient(120deg, var(--ai4mbse-dark) 60%, #1e3a8a 100%);
  animation: ai4mbse-bg-move 16s ease-in-out infinite alternate;
  background-size: 200% 200%;
}
@keyframes ai4mbse-bg-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* Banner: jetzt transparent, damit animierter Body-Hintergrund sichtbar ist */
.ai4mbse-banner-hero {
  min-height: 38vh !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none;
  border-radius: 0 0 32px 32px;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai4mbse-banner-title {
  font-size: 4.2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  margin-bottom: 1.2rem;
  background: linear-gradient(90deg, var(--ai4mbse-blue) 20%, var(--ai4mbse-purple) 60%, var(--ai4mbse-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
  line-height: 1.08;
}

.ai4mbse-banner-subtitle {
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--ai4mbse-blue);
  text-align: center;
  margin-bottom: 0;
  line-height: 1.25;
}

.ai4mbse-banner-claim {
  display: block;
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: var(--ai4mbse-purple);
  letter-spacing: 0.01em;
}
@media (max-width: 900px) {
  .ai4mbse-banner-title {
    font-size: 2.7rem;
  }
  .ai4mbse-banner-subtitle {
    font-size: 1.2rem;
  }
  .ai4mbse-banner-claim {
    font-size: 0.95rem;
  }
  .ai4mbse-banner-hero {
    min-height: 22vh !important;
    border-radius: 0 0 18px 18px;
  }
}

/* Dezente Linkfarben */
a,
a:visited,
.link-primary {
  color: var(--ai4mbse-link) !important;
  text-decoration: underline;
  transition: color 0.2s;
}
a:hover,
.link-primary:hover {
  color: var(--ai4mbse-link-hover) !important;
  text-decoration: underline;
}

/* Buttons (z.B. .cta-button) */
.cta-button {
  background: linear-gradient(135deg, var(--ai4mbse-blue), var(--ai4mbse-purple));
  color: #fff;
  /* ...existing button styles... */
}
.cta-button:hover {
  background: linear-gradient(135deg, var(--ai4mbse-purple), var(--ai4mbse-blue));
  color: #fff;
}

/* Passwort-Overlay (falls verwendet) */
#ai4mbse_pw_input,
.ai4mbse-password-overlay label {
  color: var(--ai4mbse-link);
}
.ai4mbse-password-overlay button {
  background: linear-gradient(90deg, var(--ai4mbse-gold), var(--ai4mbse-gold-hover));
  color: #222c3a;
}

/* Hide navigation menu for this page */
nav,
.nav-container,
.nav-links,
.hamburger,
.nav-links-mobile {
  display: none !important;
}

.ai4mbse-bullet-numbers {
  list-style-type: decimal-leading-zero;
  padding-left: 1.5em;
}
.ai4mbse-bullet-numbers > li {
  font-variant-numeric: tabular-nums;
  font-size: 1.07em;
  margin-bottom: 0.5em;
}
.ai4mbse-bullet-numbers ul {
  list-style-type: disc;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1.5em;
  font-size: 0.98em;
}
</style>

<!-- Scripts for fancy hero animation -->
<script src="/assets/js/ai4mbse-hero-animate.js"></script>
