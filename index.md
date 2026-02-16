---
layout: default
title: Home
typing_effect: true
description: Cloud Developer & Project Manager building cloud-native systems and automating workflows
---

<div id="main-turnstile-protection" style="display: none; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 2rem;">
  <h2 style="color: var(--accent-color, #00BCD4); margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace; font-weight: 700;">$ Verifizierung erforderlich</h2>
  <p style="color: #111111; margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace;">Bestätigen Sie, dass Sie ein Mensch sind, um die Website zu nutzen.</p>
  <div class="cf-turnstile" 
       data-sitekey="0x4AAAAAABhCvPtIE3gog0lZ" 
       data-callback="onMainPageTurnstileSuccess" 
       data-error-callback="onMainPageTurnstileError"
       data-theme="light"
       data-size="normal">
  </div>
</div>

<div id="main-content" style="display: none;">

<div class="hero">
  <div class="prompt">kingsepp.dev</div>
  <div class="role">Cloud Developer + Project Manager</div>
  <div class="description">Building <span class="highlight">cloud-native</span> systems // <span class="highlight">Automating</span> workflows // <span class="highlight">Leading</span> projects</div>
</div>

<div class="projects">
  <h2 class="projects-header">Meine Projekte</h2>
  
  <div class="project-card">
    <a href="{{ '/ai4mbse' | relative_url }}">
      <div class="project-title">ai4mbse</div>
      <div class="project-description">
        KI-gestütztes Plugin für Model-Based Systems Engineering. 
        Automatische Zuordnung von Systemanforderungen zu Subsystemen via Google Gemini AI.
      </div>
    </a>
  </div>
  
  <div class="project-card">
    <a href="{{ '/cloud-migration' | relative_url }}">
      <div class="project-title">cloud-migration</div>
      <div class="project-description">
        Strategien und Best Practices für die Migration von Legacy-Systemen 
        zu modernen Cloud-Native Architekturen mit Kubernetes und Terraform.
      </div>
    </a>
  </div>
  
  <div class="project-card">
    <a href="{{ '/devops-automation' | relative_url }}">
      <div class="project-title">devops-automation</div>
      <div class="project-description">
        CI/CD Pipelines, Infrastructure as Code und GitOps Workflows 
        für schnellere Deployments und höhere Code-Qualität.
      </div>
    </a>
  </div>
</div>

</div>