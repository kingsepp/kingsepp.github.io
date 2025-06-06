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
            <img src="https://mediapool.hm.edu/media/fk04/fk04_lokal/labore_3/ecse/Logo_ECSE_landscape_m.jpg" 
                alt="ECSE-Logo" class="project-logo">
            </div>
            <!-- Text bleibt als zweites Flex-Kind -->
            <p class="about-text">
            Das Plug-in AI4MBSE wurde im Rahmen des Kurses „Systems Engineering Projekt“ 
            im Masterstudiengang Systems Engineering der Fakultät 4 an der Hochschule München 
            entwickelt. Die Idee und Aufgabenstellung stammt von Prof. Dr. Claudio Zuccaro 
            und verfolgt das Ziel, die automatische Erstellung von Verknüpfungen in einem 
            SysML-Systemmodell durch den Einsatz künstlicher Intelligenz zu unterstützen. 
            Realisiert wurde das Projekt mit freundlicher Unterstützung des Experience Center 
            Systems Engineering.
            </p>
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
            <p class="about-text" style="text-align: center;">
            Laden Sie einfach das folgende ZIP-Paket herunter. Es enthält alle notwendigen Dateien (JAR, XML, API-Key-Anleitung etc.):
            </p>

            <!-- Flex-Container nur für diese Download-Section -->
            <div class="button-group">
            <a href="AI4MBSE_Plugin.zip" class="cta-button">
                AI4MBSE_Plugin.zip herunterladen
            </a>
            <a href="APIKEY.pdf" class="cta-button secondary-button">
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

<!-- Scripts for fancy hero animation -->
<script src="/assets/js/ai4mbse-hero-animate.js"></script>
