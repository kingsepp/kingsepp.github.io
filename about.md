---
layout: default
title: About
description: About kingsepp.dev - Cloud Developer & Project Manager
---

<div id="about-turnstile-protection" style="display: none; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 2rem;">
  <h2 style="color: var(--accent-color, #00BCD4); margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace; font-weight: 700;">$ Verifizierung erforderlich</h2>
  <p style="color: #111111; margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace;">Bestätigen Sie, dass Sie ein Mensch sind, um mehr zu erfahren.</p>
  <div class="cf-turnstile" 
       data-sitekey="0x4AAAAAABhCvPtIE3gog0lZ" 
       data-callback="onAboutTurnstileSuccess" 
       data-error-callback="onAboutTurnstileError"
       data-theme="light"
       data-size="normal">
  </div>
</div>

<div id="about-content" style="display: none;">

<div class="content-section">
  <h2>whoami</h2>
  
  <p>
    Cloud Developer und Project Manager mit Fokus auf cloud-native Systeme, 
    DevOps-Automation und moderne Entwicklungsprozesse.
  </p>
  
  <p>
    Technologien: Java • Go • TypeScript • Kubernetes • AWS • Azure • Terraform
  </p>
</div>

<div class="content-section">
  <h2>skills</h2>
  
  <div class="features">
    <h3>cloud-architecture</h3>
    <p>Design und Implementierung skalierbarer Cloud-Infrastrukturen</p>
    
    <h3>devops-automation</h3>
    <p>CI/CD Pipelines, Infrastructure as Code, Container-Orchestrierung</p>
    
    <h3>project-management</h3>
    <p>Agile Methoden, Team-Führung, Stakeholder-Management</p>
  </div>
</div>

<div class="content-section">
  <h2>links</h2>
  
  <a href="https://github.com/kingsepp" class="terminal-link" target="_blank">github</a>
  <a href="{{ '/impressum' | relative_url }}" class="terminal-link">impressum</a>
  <a href="{{ '/datenschutz' | relative_url }}" class="terminal-link">datenschutz</a>
</div>

</div>
