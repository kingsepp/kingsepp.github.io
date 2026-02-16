---
layout: default
title: AI4MBSE
description: KI-gestütztes Plugin für Model-Based Systems Engineering
---

<div id="ai4mbse-turnstile-protection" style="display: none; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 2rem;">
  <h2 style="color: var(--accent-color, #00BCD4); margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace; font-weight: 700;">$ Verifizierung erforderlich</h2>
  <p style="color: #111111; margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace;">Bestätigen Sie, dass Sie ein Mensch sind, um auf die AI4MBSE-Dokumentation zuzugreifen.</p>
  <div class="cf-turnstile" 
       data-sitekey="0x4AAAAAABhCvPtIE3gog0lZ" 
       data-callback="onAI4MBSETurnstileSuccess" 
       data-error-callback="onAI4MBSETurnstileError"
       data-theme="light"
       data-size="normal">
  </div>
</div>

<div id="ai4mbse-content" style="display: none;">

<div class="content-section">
  <h2>README</h2>

  <p>
    KI-gestütztes Plugin für Model-Based Systems Engineering. 
    Automatische Zuordnung von Systemanforderungen zu Subsystemen via Google Gemini AI.
  </p>
  
  <p>
    Entwickelt im Rahmen des Masterstudiengangs Systems Engineering der Hochschule München.
  </p>
</div>

<div class="features">
  <h3>features</h3>
  
  <ul>
    <li>Asynchrone Verarbeitung ohne UI-Blockierung</li>
    <li>Automatische SysML Satisfy-Abhängigkeiten</li>
    <li>Support für 1000+ Anforderungen</li>
    <li>Intelligente Konfidenzwerte und Begründungen</li>
    <li>Interaktive Ordnerauswahl durch Projektstrukturen</li>
  </ul>
</div>

<div class="features">
  <h3>requirements</h3>
  
  <ul>
    <li>Magic Systems of Systems Architect / Cameo Systems Modeler 2024x+</li>
    <li>Java 17+</li>
    <li>Google Gemini API Key</li>
    <li>4-8 GB RAM, 50 MB Speicher</li>
  </ul>
</div>

<div class="features">
  <h3>installation</h3>
  
  <p>
    Plugin als ZIP-Download (v1.7, ~2.5 MB) verfügbar. 
    Installation in: <code>C:\Users\YOUR_USERNAME\AppData\Local\.magic.systems.of.systems.architect\2024x\plugins</code>
  </p>
  
  <p>
    Zugriff über: Tools → Find Subsystem for Requirement (AI4MBSE)
  </p>
</div>

<div style="margin-top: 60px;">
  <a href="#" class="terminal-link">download v1.7</a>
  <a href="https://github.com/kingsepp/ai4mbse-plugin" class="terminal-link" target="_blank">view source</a>
  <a href="#" class="terminal-link">watch demo</a>
</div>

<div style="margin-top: 60px; padding: 20px; border: 1px solid #E5E5E5;">
  <p style="font-size: 13px; opacity: 0.7; margin: 0;">
    $ echo "Disclaimer: Dieses Projekt dient ausschließlich privaten, nicht-kommerziellen Informationszwecken. 
    Es werden keine Dienstleistungen oder Produkte angeboten."
  </p>
</div>

</div>
