---
layout: default
title: AI4MBSE Plugin – Download & Installation
description: Advanced AI plugin for Cameo Systems Modeler enhancing MBSE workflows
keywords: AI, MBSE, Cameo Systems Modeler, Plugin, Systems Engineering
---


<main role="main">
  <article class="plugin-documentation">
    <!-- Hero Section -->
    <header class="hero glass-morphism" role="banner">
      <div class="hero-content animate-fade-in">
        <h1>AI4MBSE Plugin</h1>
        <p>
          Next-Gen KI-Integration für <strong>Cameo Systems Modeler</strong>.<br>
          <span class="text-gradient">Automatisierung. Intelligenz. Effizienz.</span>
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
          <ai4mbse-icon name="key"></ai4mbse-icon> API Konfiguration
        </h2>
        
        <div class="content-wrapper">
          <div class="setup-guide">
            <div class="guide-step">
              <h3 class="guide-title">1. Google Gemini API Key beantragen</h3>
              <ol class="setup-steps">
                <li>
                  Gehe auf die Google AI Developer Platform:<br>
                  <a href="https://aistudio.google.com/app/apikey" class="link-primary" target="_blank">aistudio.google.com/app/apikey</a>
                </li>
                <li>Melde dich mit deinem Google-Konto an</li>
                <li>Klicke auf <strong>„Create API Key“</strong></li>
                <li>Gib optional einen Namen für den Key ein</li>
                <li>Kopiere den API Key und speichere ihn sicher</li>
              </ol>
            </div>

            <div class="guide-step">
              <h3 class="guide-title">2. API Key als Umgebungsvariable setzen</h3>
              <ol class="setup-steps">
                <li>Öffne die <strong>Windows-Systemsteuerung</strong></li>
                <li>Suche nach <strong>„Umgebungsvariablen“</strong></li>
                <li>Klicke auf <strong>„Umgebungsvariablen...“</strong></li>
                <li>
                  Unter <strong>„Benutzervariablen“</strong>:
                  <ul class="setup-substeps">
                    <li>Klicke <strong>„Neu...“</strong></li>
                    <li>Name: <code>GEMINI_API_KEY</code></li>
                    <li>Wert: <em>Dein API Key</em></li>
                  </ul>
                </li>
              </ol>
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
/* ...existing code... */

/* Improve link contrast for dark backgrounds */
a,
a:visited,
.link-primary {
  color: #ffd700 !important; /* Gold/yellow for high contrast */
  text-decoration: underline;
  transition: color 0.2s;
}
a:hover,
.link-primary:hover {
  color: #fff200 !important;
  text-decoration: underline;
}

/* Hide navigation menu for this page */
nav,
.nav-container,
.nav-links,
.hamburger,
.nav-links-mobile {
  display: none !important;
}

/* ...existing code... */
</style>

<!-- Scripts for fancy hero animation -->
<script src="/assets/js/ai4mbse-hero-animate.js"></script>
